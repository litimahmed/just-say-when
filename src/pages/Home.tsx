import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Objectifs from "@/components/Objectifs";
import SmartSearchFilter from "@/components/SmartSearchFilter";
import Testimonials from "@/components/Testimonials";
import AppMobile from "@/components/AppMobile";
import NewsLetter from "@/components/NewsLetter";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sectionsLoading, setSectionsLoading] = useState(true);

  useEffect(() => {
    const shouldOpenLogin = searchParams.get('login') === 'true';
    if (shouldOpenLogin) {
      // Dispatch a custom event to trigger login modal
      window.dispatchEvent(new CustomEvent('openLoginModal'));
      // Remove the login parameter from URL
      setSearchParams(new URLSearchParams());
    }
  }, [searchParams, setSearchParams]);

  // Simulate loading for all sections
  useEffect(() => {
    const timer = setTimeout(() => {
      setSectionsLoading(false);
    }, 2000); // Show skeleton for 2 seconds

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero loading={sectionsLoading} />
      
      {/* Brands Section */}
      <Brands loading={sectionsLoading} />
      
      {/* Objectifs Section */}
      <Objectifs loading={sectionsLoading} />
      
      {/* Smart Search Filter Section */}
      <SmartSearchFilter loading={sectionsLoading} />
      
      {/* Testimonials Section */}
      <Testimonials loading={sectionsLoading} />
      
      {/* App Mobile Section */}
      <AppMobile loading={sectionsLoading} />
      
      {/* Newsletter Section */}
      <NewsLetter loading={sectionsLoading} />
    </div>
  );
};

export default Home;