import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Play,
  CheckCircle,
  Award,
  Bookmark,
} from "lucide-react";

const Courses = () => {
  const categories = [
    "All Categories",
    "Technology",
    "Business",
    "Design",
    "Marketing",
    "Data Science",
    "Personal Development",
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Sarah Johnson",
      category: "Technology",
      level: "Beginner",
      duration: "12 weeks",
      students: 2840,
      rating: 4.9,
      price: 89,
      originalPrice: 129,
      image: "web-dev",
      description: "Master modern web development with React, Node.js, and databases.",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"],
      featured: true,
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      instructor: "Prof. Michael Chen",
      category: "Data Science",
      level: "Intermediate",
      duration: "16 weeks",
      students: 1950,
      rating: 4.8,
      price: 109,
      originalPrice: 159,
      image: "data-science",
      description: "Learn Python, statistics, and ML algorithms for data analysis.",
      skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "Statistics"],
      featured: true,
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      instructor: "Lisa Rodriguez",
      category: "Marketing",
      level: "Beginner",
      duration: "8 weeks",
      students: 3200,
      rating: 4.7,
      price: 69,
      originalPrice: 99,
      image: "digital-marketing",
      description: "Complete guide to SEO, social media, and content marketing.",
      skills: ["SEO", "Social Media", "Content Marketing", "Analytics", "PPC"],
      featured: false,
    },
    {
      id: 4,
      title: "UX/UI Design Fundamentals",
      instructor: "James Wilson",
      category: "Design",
      level: "Beginner",
      duration: "10 weeks",
      students: 1680,
      rating: 4.9,
      price: 79,
      originalPrice: 119,
      image: "ux-design",
      description: "Design user-centered interfaces with modern tools and principles.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability"],
      featured: false,
    },
    {
      id: 5,
      title: "Business Strategy & Leadership",
      instructor: "Dr. Emily Thompson",
      category: "Business",
      level: "Advanced",
      duration: "14 weeks",
      students: 890,
      rating: 4.8,
      price: 119,
      originalPrice: 179,
      image: "business-strategy",
      description: "Develop strategic thinking and leadership skills for business success.",
      skills: ["Strategic Planning", "Leadership", "Analytics", "Finance", "Operations"],
      featured: false,
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      instructor: "David Kim",
      category: "Technology",
      level: "Intermediate",
      duration: "12 weeks",
      students: 1420,
      rating: 4.6,
      price: 99,
      originalPrice: 149,
      image: "cloud-computing",
      description: "Master AWS services for scalable cloud applications.",
      skills: ["AWS", "Docker", "Kubernetes", "DevOps", "Security"],
      featured: false,
    },
  ];

  const featuredCourses = courses.filter(course => course.featured);
  const regularCourses = courses.filter(course => !course.featured);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6">Course Catalog</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Discover Your Next
              <span className="text-primary"> Learning Adventure</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Choose from over 1,200 expert-designed courses across technology, 
              business, design, and more. Start building your future today.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-card border-b">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <Badge>Featured Courses</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Most Popular This Month
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              These courses are trending among our learners and have the highest completion rates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredCourses.map((course, index) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge className="text-xs">{course.level}</Badge>
                    <Badge variant="outline" className="text-xs">
                      Featured
                    </Badge>
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${course.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${course.originalPrice}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button size="sm">Enroll Now</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              All Courses
            </h2>
            <p className="text-muted-foreground">
              Explore our complete catalog of courses designed by industry experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCourses.map((course, index) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge className="text-xs">{course.level}</Badge>
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        ${course.price}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ${course.originalPrice}
                      </span>
                    </div>
                    <Button size="sm">Enroll</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Courses
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful learners who have transformed their careers 
              with our expert-designed courses. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="font-semibold">
                Browse All Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
              >
                Contact Admissions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;