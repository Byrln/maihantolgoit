import { login } from "@/app/admin/actions";
import { SubmitButton } from "@/components/cms/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    password?: string;
    username?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params?.error;
  const username = params?.username || "";
  const password = params?.password || "";

  return (
    <main className="cms-admin flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.14),_transparent_28%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] p-6">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle>Майхан Толгой веб удирдлага</CardTitle>
          <CardDescription>Имэйл эсвэл нэвтрэх нэрээрээ орно уу.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Имэйл эсвэл нэр</Label>
              <Input id="identifier" name="identifier" placeholder="bold эсвэл name@example.com" required defaultValue={username} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Нууц үг</Label>
              <Input id="password" name="password" type="password" required defaultValue={password} />
            </div>
            {error ? <p className="text-sm text-destructive">Нэвтрэх мэдээлэл буруу байна.</p> : null}
            <SubmitButton pendingLabel="Нэвтэрч байна...">Нэвтрэх</SubmitButton>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
