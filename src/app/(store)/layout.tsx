import Navbar from "@/components/Navbar"; // Adjust import path if needed
import Footer from "@/components/Footer"; // Adjust import path if needed

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}