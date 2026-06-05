import GymNav from "@/components/gym/GymNav";
import GymHero from "@/components/gym/GymHero";
import GymProgram from "@/components/gym/GymProgram";
import GymTrainer from "@/components/gym/GymTrainer";
import GymPricing from "@/components/gym/GymPricing";
import GymTestimoni from "@/components/gym/GymTestimoni";
import GymContact from "@/components/gym/GymContact";
import GymFooter from "@/components/gym/GymFooter";

export default function GymPage() {
  return (
    <main>
      <GymNav />
      <GymHero />
      <GymProgram />
      <GymTrainer />
      <GymPricing />
      <GymTestimoni />
      <GymContact />
      <GymFooter />
    </main>
  );
}
