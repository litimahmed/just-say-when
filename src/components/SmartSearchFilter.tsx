import { useState, useEffect } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import courseReact from "@/assets/course-react.jpg";
import courseJavaScript from "@/assets/course-javascript.jpg";
import courseUXDesign from "@/assets/course-ux-design.jpg";

const categories = ["Technology", "Science", "Arts", "Business", "Health"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const languages = ["English", "French", "Arabic"];

const mockCourses = [
  {
    imageSrc: courseReact,
    title: "React Development Fundamentals",
    instructor: "John Smith",
    rating: 4.8,
    reviews: 1234,
    price: "$49",
    badge: "Popular"
  },
  {
    imageSrc: courseJavaScript, 
    title: "Advanced JavaScript",
    instructor: "Sarah Johnson",
    rating: 4.9,
    reviews: 987,
    price: "$79",
    badge: "New"
  },
  {
    imageSrc: courseUXDesign,
    title: "UI/UX Design Principles", 
    instructor: "Mike Davis",
    rating: 4.7,
    reviews: 756,
    price: "Free",
    badge: "Featured"
  },
  {
    imageSrc: courseReact,
    title: "Full Stack Web Development",
    instructor: "Emily Chen",
    rating: 4.9,
    reviews: 2156,
    price: "$89",
    badge: "Hot"
  },
  {
    imageSrc: courseJavaScript,
    title: "Node.js Backend Development",
    instructor: "Alex Rodriguez",
    rating: 4.6,
    reviews: 892,
    price: "$65",
    badge: "Trending"
  },
  {
    imageSrc: courseUXDesign,
    title: "Mobile App Design",
    instructor: "Lisa Wong",
    rating: 4.8,
    reviews: 1445,
    price: "$55",
    badge: "Best Seller"
  }
];

const SmartSearchFilterSkeleton = () => (
  <section className="bg-background py-10 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Skeleton className="h-6 w-20 mx-auto mb-2 bg-primary/30" />
        <div className="space-y-3 mb-12">
          <Skeleton className="h-10 w-72 mx-auto bg-gradient-to-r from-muted/70 to-muted/50" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-1/6 space-y-6">
          {[1, 2, 3].map((section) => (
            <div key={section}>
              <Skeleton className="h-4 w-20 mb-4 bg-primary/40" />
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded-full bg-muted/60" />
                    <Skeleton className="h-4 w-24 bg-muted/50" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <Skeleton className="h-4 w-28 mb-4 bg-primary/40" />
            <Skeleton className="h-2 w-full bg-muted/60" />
            <Skeleton className="h-4 w-20 mt-2 bg-muted/40" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <main className="md:w-3/4 w-full">
          {/* Search and Filters Skeleton */}
          <div className="flex flex-col gap-4 mb-8">
            <Skeleton className="h-10 w-80 bg-muted/60" />
            <div className="flex items-center gap-2 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded bg-muted/50" />
              ))}
              <Skeleton className="h-8 w-36 bg-muted/50" />
            </div>
          </div>

          {/* Course Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
                <Skeleton className="w-full h-48 bg-muted/60" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-16 rounded-full bg-primary/30" />
                  <Skeleton className="h-6 w-full bg-muted/70" />
                  <Skeleton className="h-4 w-24 bg-muted/50" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20 bg-muted/50" />
                    <Skeleton className="h-5 w-12 bg-primary/40" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Pills Skeleton */}
          <div className="flex justify-center mt-6 gap-2">
            {[0, 1, 2].map((index) => (
              <Skeleton 
                key={index} 
                className={`h-2 rounded-full transition-all ${
                  index === 0 ? 'w-8 bg-primary/40' : 'w-2 bg-muted/40'
                }`} 
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  </section>
);

interface SmartSearchFilterProps {
  loading?: boolean;
}

export default function SmartSearchFilter({ loading = false }: SmartSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sort, setSort] = useState("popularity");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showWithCertificates, setShowWithCertificates] = useState(false);
  const [showRecentlyAdded, setShowRecentlyAdded] = useState(false);
  const [showShortCourses, setshowShortCourses] = useState(false);
  
  // Carousel state
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Effect to handle carousel navigation and get slide count
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Get total slides from carousel API (actual navigable slides)
  const totalSlides = api?.scrollSnapList().length || 0;

  if (loading) {
    return <SmartSearchFilterSkeleton />;
  }

  return (
    <section className="bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider border border-primary px-3 py-1 inline-block rounded-md">
            Catalog
          </p>
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Explore <span className="text-primary">Courses</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/6 space-y-6">
            {/* Category Filter */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                CATEGORY
              </Label>
              <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <RadioGroupItem value={cat} id={cat} />
                      <Label
                        htmlFor={cat}
                        className="text-sm cursor-pointer hover:text-primary text-muted-foreground"
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Level Filter */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                LEVEL
              </Label>
              <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
                <div className="space-y-3">
                  {levels.map((lvl) => (
                    <div key={lvl} className="flex items-center space-x-2">
                      <RadioGroupItem value={lvl} id={lvl} />
                      <Label
                        htmlFor={lvl}
                        className="text-sm cursor-pointer hover:text-primary text-muted-foreground"
                      >
                        {lvl}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Language Filter */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                LANGUAGE
              </Label>
              <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <RadioGroupItem value={lang} id={lang} />
                      <Label
                        htmlFor={lang}
                        className="text-sm cursor-pointer hover:text-primary text-muted-foreground"
                      >
                        {lang}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Price Slider */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                PRICE RANGE
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <p className="text-sm mt-2 text-muted-foreground">
                ${priceRange[0]} – ${priceRange[1]}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <main className="md:w-3/4 w-full">
            {/* Upper Filters */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-start">
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant={showFreeOnly ? "default" : "outline"}
                  onClick={() => setShowFreeOnly((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Free Courses
                </Button>
                <Button
                  variant={showWithCertificates ? "default" : "outline"}
                  onClick={() => setShowWithCertificates((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Certificates
                </Button>
                <Button
                  variant={showRecentlyAdded ? "default" : "outline"}
                  onClick={() => setShowRecentlyAdded((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Recently Added
                </Button>
                <Button
                  variant={showShortCourses ? "default" : "outline"}
                  onClick={() => setshowShortCourses((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Short Courses
                </Button>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="top">Highest Rated</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Course Carousel */}
            <div className="relative">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent className="flex">
                  {mockCourses.map((course, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-3">
                      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale">
                        <img
                          src={course.imageSrc}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          {course.badge && (
                            <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full mb-2 animate-fade-in">
                              {course.badge}
                            </span>
                          )}
                          <h3 className="font-semibold text-card-foreground mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-muted-foreground">⭐ {course.rating}</span>
                              <span className="text-xs text-muted-foreground">({course.reviews})</span>
                            </div>
                            <span className="font-bold text-primary">{course.price}</span>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
              
              {/* Navigation Pills */}
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ease-in-out animate-scale-in ${
                      index === current 
                        ? 'w-8 bg-primary shadow-lg' 
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover-scale'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}