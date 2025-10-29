import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import ImpactStats from "@/components/about/ImpactStats";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import AboutCTA from "@/components/about/AboutCTA";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Formacad | Transforming Education for the Digital Age</title>
        <meta name="description" content="Learn about Formacad's mission to democratize quality education worldwide. Discover our values, leadership team, and impact on 100,000+ learners across 50+ countries." />
        <meta name="keywords" content="about Formacad, online education, EdTech company, digital learning platform, education technology, global learning" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <AboutHero />
        
        {/* Mission & Vision */}
        <MissionVision />
        
        {/* Core Values */}
        <CoreValues />
        
        {/* Impact Stats */}
        <ImpactStats />
        
        {/* Leadership Team */}
        <LeadershipTeam />
        
        {/* Company Timeline */}
        <CompanyTimeline />
        
        {/* Call to Action */}
        <AboutCTA />
      </div>
    </>
  );
};
export default About;