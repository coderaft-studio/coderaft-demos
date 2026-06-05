import Navbar from "@/components/klinik/Navbar";
import Hero from "@/components/klinik/Hero";
import Layanan from "@/components/klinik/Layanan";
import Dokter from "@/components/klinik/Dokter";
import Booking from "@/components/klinik/Booking";
import Testimoni from "@/components/klinik/Testimoni";
import Footer from "@/components/klinik/Footer";

export default function KlinikPage() {
  return <main><Navbar /><Hero /><Layanan /><Dokter /><Booking /><Testimoni /><Footer /></main>;
}
