import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpenIcon, Circle, Home, Navigation, NavigationIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Simple FlipCard component to replace the missing one
const FlipCard = ({
  frontHeader,
  frontParagraph,
  frontIcon,
  frontIconColor,
  backHeader,
  backButtonText,
  backButtonLink
}: {
  frontHeader: string;
  frontParagraph: string;
  frontIcon: React.ReactNode;
  frontIconColor: string;
  backHeader: string;
  backButtonText: string;
  backButtonLink: string;
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  return <div className="relative w-full h-64 cursor-pointer" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <div className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <Card className="absolute inset-0 w-full h-full p-4 flex flex-col items-center text-center backface-hidden">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-4" style={{
          backgroundColor: frontIconColor
        }}>
            {frontIcon}
          </div>
          <h3 className="text-lg font-bold mb-2">{frontHeader}</h3>
          <p className="text-sm text-muted-foreground">{frontParagraph}</p>
        </Card>
        
        {/* Back */}
        <Card className="absolute inset-0 w-full h-full p-4 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180">
          <h3 className="text-lg font-bold mb-4">{backHeader}</h3>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => window.location.href = backButtonLink}>
            {backButtonText}
          </Button>
        </Card>
      </div>
    </div>;
};
// Professional Hero Skeleton Components
const HeroSkeleton = () => {
  const SkeletonSlide1 = () => (
    <div className="relative w-full mb-10 items-start overflow-hidden bg-background">
      {/* Background Image Skeleton */}
      <div className="absolute -inset-y-0 w-[45%] right-0 top-0">
        <Skeleton className="w-full h-full bg-gradient-to-r from-muted/60 to-muted/40" />
      </div>
      <div className="flex flex-col gap-6 w-[50%]">
        {/* Title Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-14 w-full bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80" />
          <Skeleton className="h-14 w-4/5 bg-gradient-to-r from-muted/60 via-muted/40 to-muted/60" />
        </div>
        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full bg-muted/60" />
          <Skeleton className="h-6 w-5/6 bg-muted/50" />
          <Skeleton className="h-6 w-4/5 bg-muted/40" />
        </div>
        {/* Buttons Skeleton */}
        <div className="flex w-full gap-4">
          <Skeleton className="h-12 flex-2 bg-gradient-to-r from-primary/30 to-primary/20" />
          <Skeleton className="h-12 flex-1 bg-muted/50" />
        </div>
      </div>
    </div>
  );

  const SkeletonSlide2 = () => (
    <div className="relative w-full">
      {/* Background Image Skeleton */}
      <div className="absolute -inset-y-4 w-[50%] right-0">
        <Skeleton className="w-full h-full bg-gradient-to-l from-muted/50 to-muted/30" />
      </div>
      <div className="flex flex-col gap-4 w-[50%]">
        {/* Title Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-12 w-full bg-gradient-to-r from-muted/80 to-muted/60" />
          <Skeleton className="h-12 w-3/4 bg-gradient-to-r from-muted/70 to-muted/50" />
        </div>
        {/* Separator Skeleton */}
        <Skeleton className="h-1 w-[40%] bg-primary/40" />
        {/* Feature Lists Skeleton */}
        <div className="space-y-6">
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-3 h-3 rounded-full bg-primary/50" />
              <Skeleton className="h-6 w-48 bg-muted/70" />
            </div>
            <div className="ml-6 space-y-2">
              <Skeleton className="h-4 w-full bg-muted/50" />
              <Skeleton className="h-4 w-4/5 bg-muted/40" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-3 h-3 rounded-full bg-primary/50" />
              <Skeleton className="h-6 w-40 bg-muted/70" />
            </div>
            <div className="ml-6 space-y-2">
              <Skeleton className="h-4 w-full bg-muted/50" />
              <Skeleton className="h-4 w-3/4 bg-muted/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonSlide3 = () => (
    <div className="relative w-full flex flex-row-reverse items-center overflow-hidden">
      <div className="flex flex-col gap-4 w-[60%] z-10">
        {/* Title Skeleton */}
        <div className="ml-24 space-y-3">
          <Skeleton className="h-10 w-full bg-gradient-to-r from-muted/80 to-muted/60" />
          <Skeleton className="h-10 w-3/4 bg-gradient-to-r from-muted/70 to-muted/50" />
        </div>
        {/* Separator Skeleton */}
        <Skeleton className="ml-24 h-1 w-[40%] bg-primary/40" />
        {/* Description Skeleton */}
        <div className="ml-24 space-y-2">
          <Skeleton className="h-4 w-full bg-muted/60" />
          <Skeleton className="h-4 w-5/6 bg-muted/50" />
        </div>
        {/* Cards Skeleton */}
        <div className="flex gap-4">
          <div className="flex-1 relative p-0">
            <Card className="w-full h-64 p-4 flex flex-col items-center text-center space-y-4">
              <Skeleton className="w-12 h-12 rounded-full bg-primary/30" />
              <Skeleton className="h-6 w-32 bg-muted/70" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-3 w-full bg-muted/50" />
                <Skeleton className="h-3 w-5/6 bg-muted/40" />
                <Skeleton className="h-3 w-4/5 bg-muted/30" />
              </div>
            </Card>
          </div>
          <div className="flex-1 relative p-0">
            <Card className="w-full h-64 p-4 flex flex-col items-center text-center space-y-4">
              <Skeleton className="w-12 h-12 rounded-full bg-primary/30" />
              <Skeleton className="h-6 w-28 bg-muted/70" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-3 w-full bg-muted/50" />
                <Skeleton className="h-3 w-4/5 bg-muted/40" />
                <Skeleton className="h-3 w-5/6 bg-muted/30" />
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Background Image Skeleton */}
      <div className="absolute w-[120%] max-w-none right-[-15%] top-1/2 -translate-y-1/2 overflow-hidden">
        <Skeleton className="w-[900px] h-[600px] bg-gradient-to-l from-muted/40 to-muted/20" />
      </div>
    </div>
  );

  const SkeletonSlide4 = () => (
    <div className="relative w-full">
      {/* Background Image Skeleton */}
      <div className="absolute -inset-y-3 w-[55%] right-0">
        <Skeleton className="w-full h-full bg-gradient-to-l from-muted/50 to-muted/30" />
      </div>
      <div className="flex flex-col gap-4 w-[75%]">
        {/* Title Skeleton */}
        <div className="w-[60%] space-y-3">
          <Skeleton className="h-12 w-full bg-gradient-to-r from-muted/80 to-muted/60" />
          <Skeleton className="h-12 w-3/4 bg-gradient-to-r from-muted/70 to-muted/50" />
        </div>
        {/* Separator Skeleton */}
        <Skeleton className="h-1 w-[40%] bg-primary/40" />
        {/* Description Skeleton */}
        <div className="w-[60%] space-y-2">
          <Skeleton className="h-4 w-full bg-muted/60" />
          <Skeleton className="h-4 w-5/6 bg-muted/50" />
        </div>
        {/* Cards Grid Skeleton */}
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex-1 relative p-6 flex flex-col items-center text-center space-y-4">
              <Skeleton className="w-10 h-10 rounded-full bg-primary/30" />
              <Skeleton className="h-5 w-24 bg-muted/70" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-3 w-full bg-muted/50" />
                <Skeleton className="h-3 w-5/6 bg-muted/40" />
                <Skeleton className="h-3 w-4/5 bg-muted/30" />
                <Skeleton className="h-3 w-3/4 bg-muted/25" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const skeletonSlides = [SkeletonSlide1, SkeletonSlide2, SkeletonSlide3, SkeletonSlide4];

  return (
    <section className="pb-16 md:pb-24 bg-background">
      <div className="container-custom">
        <div className="relative w-full max-w-5xl mx-auto bg-background overflow-hidden rounded-lg">
          {/* Skeleton Carousel Content */}
          <div className="flex items-center justify-center p-8 bg-background min-h-[500px]">
            <div className="w-full animate-fade-in">
              {React.createElement(skeletonSlides[0])}
            </div>
          </div>
          
          {/* Navigation Arrows Skeleton */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Skeleton className="w-10 h-10 rounded-full bg-muted/40" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Skeleton className="w-10 h-10 rounded-full bg-muted/40" />
          </div>
        </div>
        
        {/* Pagination Dots Skeleton */}
        <div className="flex justify-center mt-4 gap-2">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton 
              key={index} 
              className={`h-2 rounded-full transition-all duration-300 ${
                index === 0 ? 'w-8 bg-primary/40' : 'w-2 bg-muted/40'
              }`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface HeroProps {
  loading?: boolean;
}

export default function Hero({ loading = false }: HeroProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Show skeleton when loading
  if (loading) {
    return <HeroSkeleton />;
  }
  return <section className="pb-16 md:pb-24 bg-background">
      <div className="container-custom">
        <Carousel setApi={setApi} className="relative w-full max-w-5xl mx-auto bg-background">
          <CarouselContent className="flex">
            {carouselItems.map((item, index) => <CarouselItem key={index} className="flex items-center justify-center p-8 bg-background">
                <div className="w-full">{item.layout()}</div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        {/* Professional Pagination Pills */}
        <div className="flex justify-center mt-4 gap-2 mx-0 my-0">
          {carouselItems.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`h-2 rounded-full transition-all duration-300 ease-in-out ${index === current ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} aria-label={`Go to slide ${index + 1}`} />)}
        </div>
      </div>
    </section>;
}
const cardsData = [{
  frontHeader: "Interactive Learning",
  frontParagraph: "Engage with multimedia content, quizzes, and hands-on projects designed by industry experts to enhance your learning experience.",
  frontIcon: <NavigationIcon />,
  frontIconColor: "#6954D4",
  backHeader: "Start Learning",
  backButtonText: "View Courses",
  backButtonLink: "/courses"
}, {
  frontHeader: "Expert Instructors",
  frontParagraph: "Learn from industry professionals with years of experience who are passionate about sharing their knowledge and expertise.",
  frontIcon: <NavigationIcon />,
  frontIconColor: "#6954D4",
  backHeader: "Meet Our Team",
  backButtonText: "Learn More",
  backButtonLink: "/about"
}];
const carouselItems = [{
  layout: () => <div className="relative w-full mb-10 items-start overflow-hidden bg-background">
        {/* Background Image */}
        <div className="absolute -inset-y-0 w-[45%] right-0 top-0">
          <img src="/lovable-uploads/b4d39c0d-e245-45f8-acc2-ca4ea2d4036e.png" alt="Learning Community" className="w-full h-full object-cover object-right" loading="eager" fetchPriority="high" />
        </div>
        <div className="flex flex-col gap-6 w-[50%]">
          <h2 className="text-5xl font-hero font-black leading-tight">
            Join a Thriving Community of{" "}
            <span className="text-primary">Learners!</span>
          </h2>
          <p className="text-muted-foreground text-lg font-prose font-light leading-relaxed">
            Transform your career with expert-designed courses that adapt to your learning style. 
            Connect with peers, track your progress, and earn industry-recognized certificates.
          </p>
          <div className="flex w-full gap-4">
            <Button 
              size="lg" 
              className="flex-2 cursor-pointer bg-primary hover:bg-primary/90 font-prose font-semibold"
              onClick={() => window.location.href = '/register'}
            >
              Create your free account
            </Button>
            <Button variant="outline" size="lg" className="flex-1 cursor-pointer font-prose font-semibold">
              View Courses
            </Button>
          </div>
        </div>
      </div>
}, {
  layout: () => <div className="relative w-full">
        {/* Background Image */}
        <div className="absolute -inset-y-4 w-[50%] right-0">
          <img src="/lovable-uploads/e0c039b5-96f6-4128-b88b-9ed0faf08816.png" alt="Student Learning" className="w-full h-full object-cover object-right" loading="eager" fetchPriority="high" />
        </div>

        <div className="flex flex-col gap-4 w-[50%]">
          <h2 className="text-5xl font-hero font-black leading-tight">
            Online Learning <span className="text-primary">Programs!</span>
          </h2>
          <Separator className="bg-primary h-1 w-[40%]" />

          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center">
              <Circle className="w-3 h-3 ml-2 mr-3 fill-primary text-primary" />
               <h3 className="text-xl font-prose font-semibold">
                Interactive Courses
              </h3>
            </div>
             <p className="text-muted-foreground ml-8 font-prose font-light leading-relaxed">
              Engage with multimedia content, quizzes, and hands-on projects designed by industry experts.
            </p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center">
              <Circle className="w-3 h-3 ml-2 mr-3 fill-primary text-primary" />
              <h3 className="text-xl font-prose font-semibold">
                Flexible Learning
              </h3>
            </div>
            <p className="text-muted-foreground ml-8 font-prose font-light leading-relaxed">
              Learn at your own pace with 24/7 access to courses and materials that fit your schedule.
            </p>
          </div>
        </div>
      </div>
}, {
  layout: () => <div className="relative w-full flex flex-row-reverse items-center overflow-hidden">
        <div className="flex flex-col gap-4 w-[60%] z-10">
          <h2 className="text-4xl font-hero font-black leading-tight ml-24">
            Advanced Learning{" "}
            <span className="text-primary">Methods!</span>
          </h2>
          <Separator className="bg-primary ml-24 h-1 w-[40%]" />
          <p className="text-muted-foreground ml-24 font-prose font-light leading-relaxed">
            Experience cutting-edge educational technology and proven instructional methods
            designed to maximize your learning potential.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 relative p-0">
              <FlipCard frontHeader={cardsData[0].frontHeader} frontParagraph={cardsData[0].frontParagraph} frontIcon={cardsData[0].frontIcon} frontIconColor={cardsData[0].frontIconColor} backHeader={cardsData[0].backHeader} backButtonText={cardsData[0].backButtonText} backButtonLink={cardsData[0].backButtonLink} />
            </div>
            <div className="flex-1 relative p-0">
              <FlipCard frontHeader={cardsData[1].frontHeader} frontParagraph={cardsData[1].frontParagraph} frontIcon={cardsData[1].frontIcon} frontIconColor={cardsData[1].frontIconColor} backHeader={cardsData[1].backHeader} backButtonText={cardsData[1].backButtonText} backButtonLink={cardsData[1].backButtonLink} />
            </div>
          </div>
        </div>
        {/* Background Image */}
        <div className="absolute w-[120%] max-w-none right-[-15%] top-1/2 -translate-y-1/2 overflow-hidden">
          <img src="/lovable-uploads/7b9d2247-6c4d-49a9-8e4b-1372bd527f76.png" alt="Learning Success" className="object-cover object-right scale-75 w-[900px] h-[600px]" loading="eager" fetchPriority="high" />
        </div>
      </div>
}, {
  layout: () => <div className="relative w-full">
        {/* Background Image */}
        <div className="absolute -inset-y-3 w-[55%] right-0">
          <img src="/lovable-uploads/9947613a-4950-4fe7-bac0-7d4e750181b7.png" alt="Expert Instruction" className="w-full h-full object-cover object-right" loading="eager" fetchPriority="high" />
        </div>

        <div className="flex flex-col gap-4 w-[75%]">
          <h2 className="text-5xl font-hero font-black leading-tight w-[60%]">
            Expert-Led <span className="text-primary">Education!</span>
          </h2>
          <Separator className="bg-primary h-1 w-[40%]" />
          <p className="text-sm text-muted-foreground w-[60%] font-prose font-light leading-relaxed">
            Learn from industry professionals and certified instructors who bring real-world 
            experience and expertise to every lesson.
          </p>
          <div className="flex gap-4">
            <Card className="flex-1 relative p-6 flex flex-col items-center text-center">
              <Home className="w-10 h-10 bg-primary p-2 rounded-full text-primary-foreground mb-2" />
              <div>
                <h3 className="text-md font-prose font-semibold mb-2">Structured Learning</h3>
                 <p className="text-muted-foreground text-sm font-prose font-light leading-relaxed">
                  Follow carefully designed curricula that build knowledge progressively 
                  and systematically for optimal learning outcomes.
                </p>
              </div>
            </Card>
            <Card className="flex-1 relative p-6 flex flex-col items-center text-center">
              <BookOpenIcon className="w-10 h-10 bg-primary p-2 rounded-full text-primary-foreground mb-2" />
              <div>
                <h3 className="text-md font-prose font-semibold mb-2">Rich Content</h3>
                 <p className="text-muted-foreground text-sm font-prose font-light leading-relaxed">
                  Access comprehensive materials including videos, interactive exercises, 
                  and real-world projects to enhance your understanding.
                </p>
              </div>
            </Card>
            <Card className="flex-1 relative p-6 flex flex-col items-center text-center">
              <Navigation className="w-10 h-10 bg-primary p-2 rounded-full text-primary-foreground mb-2" />
              <div>
                <h3 className="text-md font-prose font-semibold mb-2">Guided Path</h3>
                <p className="text-muted-foreground text-sm font-prose font-light leading-relaxed">
                  Navigate your learning journey with personalized recommendations 
                  and clear milestones to track your progress.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
}];