import { Role } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export const CMS_SESSION_COOKIE = "maikhan_cms_user";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(CMS_SESSION_COOKIE)?.value;

  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      return user;
    }
  }

  return null;
}

export async function ensureBootstrapAdmin() {
  const email = process.env.CMS_USER_EMAIL;

  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return user;
    }
  }

  const admin = await prisma.user.findFirst({
    where: { role: Role.ADMIN },
    orderBy: { createdAt: "asc" },
  });

  if (admin) {
    return admin;
  }

  return prisma.user.upsert({
    where: { email: email || "admin@maikhan-tolgoi.mn" },
    create: {
      email: email || "admin@maikhan-tolgoi.mn",
      name: "Админ",
      username: "admin",
      passwordHash: hashPassword(process.env.CMS_ADMIN_PASSWORD || "admin12345"),
      role: Role.ADMIN,
    },
    update: {
      role: Role.ADMIN,
    },
  });
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  return user?.role === Role.ADMIN ? user : null;
}

export async function requireAdminOrRedirect() {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/login");
  }

  return admin;
}

export async function setUserSession(userId: string) {
  const cookieStore = await cookies();

  cookieStore.set(CMS_SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearUserSession() {
  const cookieStore = await cookies();

  cookieStore.delete(CMS_SESSION_COOKIE);
}
