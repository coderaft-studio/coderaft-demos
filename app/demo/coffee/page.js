import CafeNav from "@/components/coffee/CafeNav";
import CafeHero from "@/components/coffee/CafeHero";
import CafeMenu from "@/components/coffee/CafeMenu";
import CafeAbout from "@/components/coffee/CafeAbout";
import CafeAmbiance from "@/components/coffee/CafeAmbiance";
import CafeTestimoni from "@/components/coffee/CafeTestimoni";
import CafeContact from "@/components/coffee/CafeContact";
import CafeFooter from "@/components/coffee/CafeFooter";

export default function CoffeePage() {
  return (
    <main>
      <CafeNav />
      <CafeHero />
      <CafeMenu />
      <CafeAbout />
      <CafeAmbiance />
      <CafeTestimoni />
      <CafeContact />
      <CafeFooter />
    </main>
  );
}
