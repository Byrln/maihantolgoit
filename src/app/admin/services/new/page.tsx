import Link from "next/link";

import { ServiceForm } from "@/components/cms/service-form";
import { Button } from "@/components/ui/button";

export default function NewServicePage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Шинэ үйлчилгээ</h1>
          <p className="text-sm text-muted-foreground">CMS одоогийн үйлчилгээний дараа автоматаар байрлуулна.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/services">Буцах</Link>
        </Button>
      </div>
      <ServiceForm />
    </main>
  );
}
