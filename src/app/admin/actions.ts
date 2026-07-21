"use server";

import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseEditorContent, parsePageSections, slugify } from "@/lib/cms";
import { clearUserSession, ensureBootstrapAdmin, getCurrentUser, requireAdmin, requireAdminOrRedirect, setUserSession } from "@/lib/auth";
import { generatePassword, hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { saveMediaFile } from "@/lib/uploads";

async function uniqueSlug(model: "post" | "page" | "service", title: string, currentId?: string) {
  const baseSlug = slugify(title);
  let nextSlug = baseSlug;
  let suffix = 2;

  while (true) {
    const existing =
      model === "post"
        ? await prisma.post.findUnique({ where: { slug: nextSlug }, select: { id: true } })
        : model === "service"
          ? await prisma.service.findUnique({ where: { slug: nextSlug }, select: { id: true } })
          : await prisma.page.findUnique({ where: { slug: nextSlug }, select: { id: true } });

    if (!existing || existing.id === currentId) {
      return nextSlug;
    }

    nextSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

async function uniqueUsername(value: string, currentId?: string) {
  const baseUsername = slugify(value).replace(/-/g, ".") || "user";
  let nextUsername = baseUsername;
  let suffix = 2;

  while (true) {
    const existing = await prisma.user.findUnique({ where: { username: nextUsername }, select: { id: true } });

    if (!existing || existing.id === currentId) {
      return nextUsername;
    }

    nextUsername = `${baseUsername}.${suffix}`;
    suffix += 1;
  }
}

export async function savePost(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const publishedAt = String(formData.get("publishedAt") || "");
  const body = parseEditorContent(formData.get("body"));
  const selectedCoverImageId = String(formData.get("coverImageId") || "").trim();
  const removeCoverImage = formData.get("removeCoverImage") === "1";
  const upload = await saveMediaFile(formData.get("coverImage") as File | null, title);

  if (!title || !excerpt) {
    throw new Error("Гарчиг болон товч тайлбар шаардлагатай.");
  }

  const slug = await uniqueSlug("post", title, id || undefined);
  const data = {
    title,
    slug,
    category: category || null,
    excerpt,
    body,
    publishedAt: publishedAt ? new Date(publishedAt) : null,
    ...(upload
      ? { coverImageId: upload.id }
      : removeCoverImage
        ? { coverImageId: null }
        : selectedCoverImageId
          ? { coverImageId: selectedCoverImageId }
          : {}),
  };

  if (id) {
    await prisma.post.update({ where: { id }, data });
  } else {
    await prisma.post.create({ data });
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.post.delete({ where: { id } });
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function saveService(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const publishedAt = String(formData.get("publishedAt") || "");
  const body = parseEditorContent(formData.get("body"));
  const selectedImageId = String(formData.get("imageId") || "").trim();
  const removeImage = formData.get("removeImage") === "1";
  const upload = await saveMediaFile(formData.get("image") as File | null, title);

  if (!title) {
    throw new Error("Гарчиг шаардлагатай.");
  }

  const slug = await uniqueSlug("service", title, id || undefined);
  const nextOrder = await prisma.service.count();
  const data = {
    title,
    slug,
    excerpt: excerpt || null,
    body,
    publishedAt: publishedAt ? new Date(publishedAt) : null,
    ...(id ? {} : { sortOrder: nextOrder + 1 }),
    ...(upload
      ? { imageId: upload.id }
      : removeImage
        ? { imageId: null }
        : selectedImageId
          ? { imageId: selectedImageId }
          : {}),
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({
      data: {
        ...data,
      },
    });
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.service.delete({ where: { id } });
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function saveAccommodation(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const details = String(formData.get("details") || "")
    .split(/\r?\n/)
    .map((detail) => detail.trim())
    .filter(Boolean);
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const selectedImageId = String(formData.get("imageId") || "").trim();
  const removeImage = formData.get("removeImage") === "1";
  const upload = await saveMediaFile(formData.get("image") as File | null, title);

  if (!title || !summary) {
    throw new Error("Гарчиг болон товч тайлбар шаардлагатай.");
  }

  const data = {
    title,
    summary,
    details,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    ...(upload
      ? { imageId: upload.id }
      : removeImage
        ? { imageId: null }
        : selectedImageId
          ? { imageId: selectedImageId }
          : {}),
  };

  if (id) {
    await prisma.accommodation.update({ where: { id }, data });
  } else {
    await prisma.accommodation.create({ data });
  }

  revalidatePath("/admin/accommodations");
  revalidatePath("/accommodation");
  redirect("/admin/accommodations");
}

export async function deleteAccommodation(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.accommodation.delete({ where: { id } });
  }

  revalidatePath("/admin/accommodations");
  revalidatePath("/accommodation");
  redirect("/admin/accommodations");
}

export async function savePage(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const requestedSlug = String(formData.get("slug") || title).trim();
  const summary = String(formData.get("summary") || "").trim();
  const body = parseEditorContent(formData.get("body"));
  const sections = parsePageSections(formData.get("sections"));
  const selectedHeroImageId = String(formData.get("heroImageId") || "").trim();
  const upload = await saveMediaFile(formData.get("heroImage") as File | null, title);

  if (!title || !requestedSlug) {
    throw new Error("Гарчиг болон URL нэр шаардлагатай.");
  }

  const slug = await uniqueSlug("page", requestedSlug, id || undefined);
  const data = {
    title,
    slug,
    summary: summary || null,
    body,
    sections,
    ...(upload
      ? { heroImageId: upload.id }
      : selectedHeroImageId
        ? { heroImageId: selectedHeroImageId }
        : {}),
  };

  if (id) {
    await prisma.page.update({ where: { id }, data });
  } else {
    await prisma.page.create({ data });
  }

  revalidatePath("/admin/pages");
  revalidatePath("/");
  revalidatePath(`/${slug}`);
  redirect("/admin/pages");
}

export async function deletePage(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.page.delete({ where: { id } });
  }

  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function saveNavLink(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");
  const label = String(formData.get("label") || "").trim();
  const href = String(formData.get("href") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const isActive = formData.get("isActive") === "on";

  if (!label || !href) {
    throw new Error("Цэсийн нэр болон холбоос шаардлагатай.");
  }

  const data = {
    label,
    href,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    isActive,
  };

  if (id) {
    await prisma.navLink.update({ where: { id }, data });
  } else {
    await prisma.navLink.create({ data });
  }

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  redirect("/admin/navigation");
}

export async function deleteNavLink(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.navLink.delete({ where: { id } });
  }

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  redirect("/admin/navigation");
}

export async function saveUser(formData: FormData) {
  const admin = await requireAdmin();

  if (!admin) {
    throw new Error("Зөвхөн админ хэрэглэгч засварлах боломжтой.");
  }

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const requestedUsername = String(formData.get("username") || name || email.split("@")[0]).trim().toLowerCase();
  const role = String(formData.get("role") || "USER") === "ADMIN" ? Role.ADMIN : Role.USER;
  const password = String(formData.get("password") || "");
  const passwordConfirm = String(formData.get("passwordConfirm") || "");

  if (!email) {
    throw new Error("Имэйл шаардлагатай.");
  }

  if (password || passwordConfirm) {
    if (password.length < 8) {
      throw new Error("Нууц үг хамгийн багадаа 8 тэмдэгт байна.");
    }

    if (password !== passwordConfirm) {
      throw new Error("Нууц үг давталт таарахгүй байна.");
    }
  }

  const username = await uniqueUsername(requestedUsername || email, id || undefined);

  if (id) {
    const existing = await prisma.user.findUnique({ where: { id } });
    const adminCount = await prisma.user.count({ where: { role: Role.ADMIN } });

    if (existing?.role === Role.ADMIN && role !== Role.ADMIN && adminCount <= 1) {
      throw new Error("Сүүлийн админы эрхийг хэрэглэгч болгож болохгүй.");
    }

    await prisma.user.update({
      where: { id },
      data: {
        email,
        username,
        name: name || null,
        role,
        ...(password ? { passwordHash: hashPassword(password) } : {}),
      },
    });
  } else {
    const nextPassword = password || generatePassword();
    const user = await prisma.user.create({
      data: { email, username, passwordHash: hashPassword(nextPassword), name: name || null, role },
    });

    revalidatePath("/admin/users");
    redirect(`/admin/users?created=1&login=${encodeURIComponent(username)}&password=${encodeURIComponent(nextPassword)}&user=${encodeURIComponent(user.name || user.email)}`);
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function saveProfile(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const name = String(formData.get("name") || "").trim();
  const currentPassword = String(formData.get("currentPassword") || "");
  const password = String(formData.get("password") || "");
  const passwordConfirm = String(formData.get("passwordConfirm") || "");

  if (password || passwordConfirm || currentPassword) {
    if (!verifyPassword(currentPassword, currentUser.passwordHash)) {
      throw new Error("Одоогийн нууц үг буруу байна.");
    }

    if (password.length < 8) {
      throw new Error("Шинэ нууц үг хамгийн багадаа 8 тэмдэгт байна.");
    }

    if (password !== passwordConfirm) {
      throw new Error("Нууц үг давталт таарахгүй байна.");
    }
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name: name || null,
      ...(password ? { passwordHash: hashPassword(password) } : {}),
    },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function uploadMedia(formData: FormData) {
  await requireAdminOrRedirect();

  const file = formData.get("file") as File | null;
  const alt = String(formData.get("alt") || "").trim();
  const media = await saveMediaFile(file, alt);

  if (!media) {
    throw new Error("Медиа файл сонгоно уу.");
  }

  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export async function login(formData: FormData) {
  await ensureBootstrapAdmin();

  const identifier = String(formData.get("identifier") || "").trim();
  const password = String(formData.get("password") || "");

  if (!identifier || !password) {
    redirect("/login?error=missing");
  }

  const normalized = identifier.toLowerCase();
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: normalized }, { username: normalized }, { name: identifier }],
    },
  });

  if (!user?.passwordHash || user.role !== Role.ADMIN || !verifyPassword(password, user.passwordHash)) {
    redirect("/login?error=invalid");
  }

  await setUserSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await clearUserSession();
  redirect("/login");
}

export async function deleteUser(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id") || "");

  if (!admin || !id || id === admin.id) {
    redirect("/admin/users");
  }

  const user = await prisma.user.findUnique({ where: { id } });
  const adminCount = await prisma.user.count({ where: { role: Role.ADMIN } });

  if (user?.role === Role.ADMIN && adminCount <= 1) {
    throw new Error("Сүүлийн админыг устгаж болохгүй.");
  }

  await prisma.user.delete({ where: { id } });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}
