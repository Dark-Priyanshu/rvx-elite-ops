import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RosterSection from "@/components/RosterSection";
import CommandSection from "@/components/CommandSection";
import OperationsSection from "@/components/OperationsSection";
import AchievementsSection from "@/components/AchievementsSection";
import MediaSection from "@/components/MediaSection";
import RecruitmentSection from "@/components/RecruitmentSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>RVX ESPORTS - Elite Free Fire Strike Squad | Official Team Website</title>
        <meta 
          name="description" 
          content="RVX ESPORTS is an elite Free Fire competitive esports team. Join the strike squad, view our roster, achievements, and tournament victories." 
        />
        <meta name="keywords" content="RVX ESPORTS, Free Fire, esports, gaming team, competitive gaming, battle royale" />
        <link rel="canonical" href="https://rvxesports.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="RVX ESPORTS - Elite Free Fire Strike Squad" />
        <meta property="og:description" content="Official website of RVX ESPORTS, a professional Free Fire competitive team." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RVX ESPORTS - Elite Free Fire Strike Squad" />
        <meta name="twitter:description" content="Official website of RVX ESPORTS, a professional Free Fire competitive team." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <RosterSection />
          <CommandSection />
          <OperationsSection />
          <AchievementsSection />
          <MediaSection />
          <RecruitmentSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
