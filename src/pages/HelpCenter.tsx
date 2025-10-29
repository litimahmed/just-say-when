import { useState, useEffect } from "react";
import { Search, ChevronDown, Mail, Phone, MessageCircle, Book, Users, Shield, CreditCard, Settings, HelpCircle, FileText, Star, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import helpCenterHero from "@/assets/help-center-hero.jpg";
import articleCreateCourse from "@/assets/article-create-course.jpg";
import articlePaymentMethods from "@/assets/article-payment-methods.jpg";
import articleVideoTroubleshooting from "@/assets/article-video-troubleshooting.jpg";
import articleAccountSecurity from "@/assets/article-account-security.jpg";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      articles: 12,
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Account & Profile",
      description: "Manage your account settings and profile",
      articles: 8,
      color: "bg-green-500",
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Questions about pricing, billing, and payments",
      articles: 15,
      color: "bg-purple-500",
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Troubleshooting and technical issues",
      articles: 20,
      color: "bg-orange-500",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Data protection and security information",
      articles: 6,
      color: "bg-red-500",
    },
    {
      icon: FileText,
      title: "Policies & Terms",
      description: "Legal information and platform policies",
      articles: 4,
      color: "bg-indigo-500",
    },
  ];

  const popularArticles = [
    {
      title: "How to create your first course",
      category: "Getting Started",
      views: 2500,
      helpful: 95,
      image: articleCreateCourse,
      description: "A comprehensive guide to building your first online course from start to finish.",
      readTime: "8 min read"
    },
    {
      title: "Setting up your payment methods",
      category: "Billing & Payments",
      views: 1800,
      helpful: 92,
      image: articlePaymentMethods,
      description: "Learn how to securely configure and manage your payment options.",
      readTime: "5 min read"
    },
    {
      title: "Troubleshooting video playback issues",
      category: "Technical Support",
      views: 1200,
      helpful: 88,
      image: articleVideoTroubleshooting,
      description: "Resolve common video streaming problems and optimize your viewing experience.",
      readTime: "6 min read"
    },
    {
      title: "Managing your account security",
      category: "Privacy & Security",
      views: 980,
      helpful: 94,
      image: articleAccountSecurity,
      description: "Essential security practices to protect your account and personal data.",
      readTime: "7 min read"
    },
  ];

  const faqItems = [
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, simply browse our course catalog, select the course you want, and click the 'Enroll Now' button. You'll need to create an account and complete the payment process."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund."
    },
    {
      question: "Are certificates provided upon course completion?",
      answer: "Yes, you'll receive a certificate of completion for each course you finish. Certificates can be downloaded from your dashboard and shared on professional networks."
    },
    {
      question: "How long do I have access to a course?",
      answer: "Once you enroll in a course, you have lifetime access to the content. You can revisit the materials anytime and learn at your own pace."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Absolutely! Our platform is fully responsive and works on all devices. You can also download our mobile app for the best learning experience on smartphones and tablets."
    },
    {
      question: "How do I become an instructor?",
      answer: "To become an instructor, click on 'Become a Teacher' in the header, fill out the application form, and submit your course proposal. Our team will review your application and get back to you."
    },
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@Formacad.com",
      response: "Response within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7",
      response: "Instant response",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our experts",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri, 9AM-6PM EST",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        {/* Professional Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${helpCenterHero})`
          }}
        />
        
        {/* Enhanced Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/45 via-primary/35 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-primary/5" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(hsl(var(--primary-foreground)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary-foreground)/0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center text-primary-foreground">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/15 backdrop-blur-sm rounded-full border border-primary-foreground/25 mb-6">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Help Center</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground drop-shadow-lg">
            How can we help you?
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Find answers to your questions, get support, and learn how to make the most of our platform
          </p>
          
          {/* Enhanced Search Bar with Better Contrast */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6 z-10" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, and more..."
                className="pl-16 pr-6 py-6 text-lg bg-background/98 backdrop-blur-md text-foreground border-0 shadow-2xl rounded-2xl focus:ring-2 focus:ring-primary-foreground/60 transition-all duration-300 group-hover:shadow-xl group-hover:bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-background/10 rounded-2xl blur-xl -z-10 opacity-50" />
            </div>
          </div>
          
          {/* Enhanced Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant="secondary" className="bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border-primary-foreground/25 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              Popular Articles
            </Button>
            <Button variant="secondary" className="bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border-primary-foreground/25 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              Video Tutorials
            </Button>
            <Button variant="secondary" className="bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border-primary-foreground/25 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Help Topics Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent/8 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
              <Book className="h-4 w-4" />
              <span className="text-sm font-medium">Help Topics</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Browse Help Topics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find exactly what you're looking for in our comprehensive knowledge base
            </p>
          </div>

          {/* Enhanced Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-2xl ${category.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                            {category.title}
                          </CardTitle>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                          {category.articles} articles
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative pt-0">
                    <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Can't find what you're looking for?</p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Our Support Team
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Popular Articles Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden">
        {/* Floating Background Decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-br from-accent/6 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Most Popular</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Popular Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the most helpful resources our community relies on
            </p>
          </div>

          {/* Professional Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {popularArticles.map((article, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-card/60 backdrop-blur-sm hover:bg-card/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 shadow-lg">
                      {article.category}
                    </Badge>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="secondary" className="bg-background/80 text-foreground backdrop-blur-sm">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {article.helpful}%
                    </Badge>
                  </div>
                </div>

                {/* Content Container */}
                <CardContent className="p-8 relative">
                  {/* Floating Card Accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative space-y-4">
                    {/* Title */}
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {article.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {article.views.toLocaleString()} views
                        </span>
                      </div>
                      
                      {/* Read More Arrow */}
                      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm">Read More</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Articles CTA */}
          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6">
              <Book className="h-5 w-5 mr-2" />
              View All Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Still need help?</h2>
          <p className="text-center text-muted-foreground mb-12">
            Our support team is here to help you succeed
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-primary rounded-full">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <CardTitle>{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{option.description}</p>
                    <p className="font-semibold mb-2">{option.contact}</p>
                    <p className="text-sm text-muted-foreground">{option.response}</p>
                    <Button className="mt-4 w-full">
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                  </div>
                  <Input placeholder="Subject" />
                  <textarea
                    className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe your issue or question..."
                  />
                  <Button className="w-full">Send Message</Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Book className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive guides and tutorials
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Community Forum</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with other learners
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-muted-foreground text-sm">
                  Step-by-step video guides
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;