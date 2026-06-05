import Navbar from "@/components/wedding/Navbar";
import Hero from "@/components/wedding/Hero";
import Layanan from "@/components/wedding/Layanan";
import Galeri from "@/components/wedding/Galeri";
import Paket from "@/components/wedding/Paket";
import Testimoni from "@/components/wedding/Testimoni";
import Kontak from "@/components/wedding/Kontak";
import Footer from "@/components/wedding/Footer";

export default function WeddingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Layanan />
      <Galeri />
      <Paket />
      <Testimoni />
      <Kontak />
      <Footer />
    </main>
  );
}
