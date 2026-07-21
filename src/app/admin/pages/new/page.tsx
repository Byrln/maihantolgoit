import { PageForm } from "@/components/cms/page-form";

export default function NewPagePage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col gap-4 p-3 sm:p-5 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Шинэ хуудас</h1>
        <p className="text-sm text-muted-foreground">Бэлэн хэсгүүдээр хуудсаа бүтээж, хажуугийн харагдацаар шалгана.</p>
      </div>
      <PageForm />
    </main>
  );
}
