import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-2xl w-full mx-auto flex flex-col">
      <div className="w-full min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
