import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import CareersHero from "@/components/careers/CareersHero";
import WhyWorkWithUs from "@/components/careers/WhyWorkWithUs";
import OpenPositions from "@/components/careers/OpenPositions";
import BenefitsSection from "@/components/careers/BenefitsSection";
import CompanyCulture from "@/components/careers/CompanyCulture";
import ApplicationProcess from "@/components/careers/ApplicationProcess";

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers - Join Formacad | Shape Algeria's Digital Future</title>
        <meta name="description" content="Join Formacad's mission to transform education in Algeria. Explore career opportunities in tech, education, and business. Competitive benefits, professional growth, and social impact." />
        <meta name="keywords" content="careers Algeria, tech jobs Algeria, education jobs, Formacad careers, software engineer Algeria, digital transformation careers" />
        <link rel="canonical" href="/careers" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <CareersHero />
        
        {/* Why Work With Us */}
        <WhyWorkWithUs />
        
        {/* Open Positions */}
        <OpenPositions />
        
        {/* Benefits & Compensation */}
        <BenefitsSection />
        
        {/* Company Culture */}
        <CompanyCulture />
        
        {/* Application Process */}
        <ApplicationProcess />
      </div>
    </>
  );
};

export default Careers;