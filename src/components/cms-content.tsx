import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { PageSection } from "@/lib/cms";
import { isVideoUrl } from "@/lib/media";

export function CmsPageSections({ sections }: { sections: PageSection[] }) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="cms-page-sections">
      {sections.map((section) => {
        if (section.type === "html") {
          return (
            <section key={section.id} className="narrow-container py-14 sm:py-20">
              {section.title ? <h2 className="section-title text-left">{section.title}</h2> : null}
              {section.html ? (
                <div
                  className="cms-rich-text mt-6"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              ) : null}
            </section>
          );
        }

        if (section.type === "feature") {
          return (
            <section key={section.id} className="cms-feature-section">
              {section.imageUrl ? (
                isVideoUrl(section.imageUrl) ? (
                  <video src={section.imageUrl} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
                ) : (
                  <Image src={section.imageUrl} alt={section.imageAlt || section.title} fill sizes="100vw" className="object-cover" />
                )
              ) : null}
              <div className="absolute inset-0 bg-black/40" />
              <div className="site-container relative flex min-h-[360px] flex-col justify-end py-14 text-white sm:min-h-[430px] sm:py-20">
                <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{section.title}</h2>
                {section.body ? <p className="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">{section.body}</p> : null}
              </div>
            </section>
          );
        }

        if (section.type === "gallery") {
          return (
            <section key={section.id} className="site-container py-14 sm:py-20">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="section-title">{section.title}</h2>
                {section.body ? <p className="body-copy mt-6">{section.body}</p> : null}
              </div>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {(section.items || []).map((item) => (
                  <article key={item.id} className="min-w-0">
                    {item.imageUrl ? (
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2ee]">
                        {isVideoUrl(item.imageUrl) ? (
                          <video src={item.imageUrl} className="h-full w-full object-cover" controls muted playsInline />
                        ) : (
                          <Image
                            src={item.imageUrl}
                            alt={item.imageAlt || item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 hover:scale-[1.025]"
                          />
                        )}
                      </div>
                    ) : null}
                    <h3 className="mt-5 break-words text-lg font-semibold leading-7 text-[#333a38]">{item.title}</h3>
                    {item.subtitle ? <p className="mt-2 text-sm font-medium text-[#258542]">{item.subtitle}</p> : null}
                    {item.body ? <p className="mt-3 text-sm leading-7 text-[#686e6b]">{item.body}</p> : null}
                  </article>
                ))}
              </div>
            </section>
          );
        }

        if (section.type === "imageText") {
          const imageFirst = section.imagePosition !== "right";

          return (
            <section key={section.id} className="site-container grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
              {section.imageUrl ? (
                <div className={`relative aspect-[4/3] overflow-hidden bg-[#eef2ee] ${imageFirst ? "" : "lg:order-2"}`}>
                  {isVideoUrl(section.imageUrl) ? (
                    <video src={section.imageUrl} className="h-full w-full object-cover" controls muted playsInline />
                  ) : (
                    <Image
                      src={section.imageUrl}
                      alt={section.imageAlt || section.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
              ) : null}
              <div className="min-w-0 lg:px-4">
                <h2 className="section-title text-left">{section.title}</h2>
                {section.body ? <p className="body-copy mt-6 text-left">{section.body}</p> : null}
              </div>
            </section>
          );
        }

        return (
          <section key={section.id} className="narrow-container py-14 text-center sm:py-20">
            <h2 className="section-title">{section.title}</h2>
            {section.body ? <p className="body-copy mt-6 whitespace-pre-line">{section.body}</p> : null}
          </section>
        );
      })}
    </div>
  );
}

type RichNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type?: string; attrs?: Record<string, unknown> }[];
  content?: RichNode[];
};

export function RichTextContent({ value }: { value: unknown }) {
  const root = value as RichNode | null;

  if (!root?.content?.length) {
    return null;
  }

  return <div className="cms-rich-text">{root.content.map((node, index) => renderNode(node, `node-${index}`))}</div>;
}

function renderNode(node: RichNode, key: string): ReactNode {
  const children = node.content?.map((child, index) => renderNode(child, `${key}-${index}`));

  if (node.type === "text") {
    let content: ReactNode = node.text || "";

    for (const mark of node.marks || []) {
      if (mark.type === "bold") content = <strong>{content}</strong>;
      if (mark.type === "italic") content = <em>{content}</em>;
      if (mark.type === "underline") content = <u>{content}</u>;
      if (mark.type === "link" && typeof mark.attrs?.href === "string") {
        content = <Link href={mark.attrs.href}>{content}</Link>;
      }
    }

    return <span key={key}>{content}</span>;
  }

  if (node.type === "heading") {
    const level = Number(node.attrs?.level || 2);
    if (level === 1) return <h1 key={key}>{children}</h1>;
    if (level === 3) return <h3 key={key}>{children}</h3>;
    return <h2 key={key}>{children}</h2>;
  }

  if (node.type === "paragraph") return <p key={key}>{children}</p>;
  if (node.type === "blockquote") return <blockquote key={key}>{children}</blockquote>;
  if (node.type === "bulletList") return <ul key={key}>{children}</ul>;
  if (node.type === "orderedList") return <ol key={key}>{children}</ol>;
  if (node.type === "listItem") return <li key={key}>{children}</li>;
  if (node.type === "hardBreak") return <br key={key} />;

  if (node.type === "image" && typeof node.attrs?.src === "string") {
    return (
      <span key={key} className="relative my-8 block aspect-[16/10] overflow-hidden">
        {isVideoUrl(node.attrs.src) ? (
          <video src={node.attrs.src} className="h-full w-full object-cover" controls playsInline />
        ) : (
          <Image src={node.attrs.src} alt={String(node.attrs.alt || "Content image")} fill sizes="(max-width: 900px) 100vw, 760px" className="object-cover" />
        )}
      </span>
    );
  }

  if (node.type === "htmlBlock" && typeof node.attrs?.html === "string") {
    return <div key={key} className="cms-html-block" dangerouslySetInnerHTML={{ __html: node.attrs.html }} />;
  }

  return children ? <div key={key}>{children}</div> : null;
}
