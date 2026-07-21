import Link from "next/link";

import { AccommodationForm } from "@/components/cms/accommodation-form";
import { Button } from "@/components/ui/button";

export default function NewAccommodationPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Шинэ байр</h1>
          <p className="text-sm text-muted-foreground">Accommodation хуудасны шинэ байрны төрөл нэмнэ.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/accommodations">Буцах</Link>
        </Button>
      </div>
      <AccommodationForm />
    </main>
  );
}
