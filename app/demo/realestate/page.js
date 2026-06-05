import Navbar from "@/components/realestate/Navbar";
import Hero from "@/components/realestate/Hero";
import Listing from "@/components/realestate/Listing";
import Agen from "@/components/realestate/Agen";
import Kontak from "@/components/realestate/Kontak";
import Footer from "@/components/realestate/Footer";

export default function RealEstatePage() {
  return <main><Navbar /><Hero /><Listing /><Agen /><Kontak /><Footer /></main>;
}
