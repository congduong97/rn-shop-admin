import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RenderMounted } from "@/components/render-mounted";
import { createClient } from "@/supabase/client";
import { redirect } from "next/navigation";

async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (authData?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !data) {
      console.log("Error fetching user data", error);
      return;
    }

    if (data.type === "admin") return redirect("/");
  }
  return (
    <RenderMounted>
      <Header />
      <main className="min-h-[calc(100vh-128px)] py-3">{children}</main>
      <Footer />
    </RenderMounted>
  );
}

export default AdminLayout;
