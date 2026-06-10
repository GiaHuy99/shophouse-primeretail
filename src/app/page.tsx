import HeroContactFloatSticky from "@/app/components/floating/HeroContactFloatSticky";
import ShophouseGallery from "@/app/components/gallery/ShophouseGallery";
import HeroSection from "@/app/components/hero/HeroSection";
import Footer from "@/app/components/layout/Footer";
import NavBar from "@/app/components/layout/NavBar";
import CangioHighlightSection from "@/app/components/sections/CangioHighlightSection";
import LeadForm from "@/app/components/sections/LeadForm";
import MarketData from "@/app/components/sections/MarketData";
import ROISimulator from "@/app/components/sections/ROISimulator";
import ZoningSection from "@/app/components/sections/ZoningSection";
import WelcomeLeadPopup from "@/app/components/shared/WelcomeLeadPopup";

export default function Home() {
  return (
    <main className="bg-navy text-white overflow-x-hidden max-md:pb-[max(5.5rem,calc(env(safe-area-inset-bottom,0px)+4.25rem))] max-md:[overflow-x:clip]">
      <NavBar />
      <WelcomeLeadPopup />
      <HeroSection />
      <HeroContactFloatSticky />
      <CangioHighlightSection />
      <ShophouseGallery />
      <MarketData />
      <ROISimulator />
      <ZoningSection />
      <LeadForm />
      <Footer />
    </main>
  );
}
