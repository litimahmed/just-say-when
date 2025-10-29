import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  HelpCircle,
  Users,
  BookOpen,
  Building,
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help from our support team",
      contact: "support@learnspace.com",
      availability: "24/7",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Instant help when you need it",
      contact: "Available on platform",
      availability: "Mon-Fri, 9AM-11PM EST",
    },
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 500",
      phone: "+1 (555) 123-4567",
      email: "sf@learnspace.com",
    },
    {
      city: "New York",
      address: "456 Business Avenue, Floor 12",
      phone: "+1 (555) 234-5678",
      email: "ny@learnspace.com",
    },
    {
      city: "London",
      address: "789 Education Lane, Suite 300",
      phone: "+44 20 7123 4567",
      email: "london@learnspace.com",
    },
  ];

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "Simply browse our course catalog, select the course you're interested in, and click 'Enroll Now'. You'll be guided through the payment process and gain immediate access.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your course, contact our support team for a full refund.",
    },
    {
      question: "Do you offer certificates upon completion?",
      answer: "Absolutely! All our courses include industry-recognized certificates upon successful completion. These can be downloaded and shared on professional networks.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Yes, our platform is fully responsive and optimized for mobile learning. You can access your courses anytime, anywhere on any device.",
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6">Get in Touch</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              We're Here to
              <span className="text-primary"> Help You Succeed</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Have questions about our courses, need technical support, or want to explore 
              partnership opportunities? Our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="mb-4">Contact Options</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Choose Your Preferred Way to Connect
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 mx-auto">
                  {method.icon}
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">
                  {method.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {method.description}
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-primary">{method.contact}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {method.availability}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Send Us a Message</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="courses">Course Information</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="media">Media & Press</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                  />
                </div>

                <Button size="lg" className="w-full font-semibold">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Offices</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Visit Us Worldwide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have offices around the globe to better serve our international community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold">
                    {office.city}
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{office.email}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions about our platform and courses.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <HelpCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-semibold mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Didn't find what you're looking for?
              </p>
              <Button variant="outline">
                View All FAQs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Explore More Options
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Whether you're a prospective student, current learner, or potential partner, 
              we have resources for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-heading font-semibold mb-3">
                For Students
              </h3>
              <p className="text-sm opacity-80 mb-4">
                Browse courses, track progress, and connect with peers in our learning community.
              </p>
              <Button variant="secondary" size="sm">
                Student Portal
              </Button>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-heading font-semibold mb-3">
                For Instructors
              </h3>
              <p className="text-sm opacity-80 mb-4">
                Join our team of expert instructors and share your knowledge with learners worldwide.
              </p>
              <Button variant="secondary" size="sm">
                Teach With Us
              </Button>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-6 text-center">
              <Building className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-heading font-semibold mb-3">
                For Business
              </h3>
              <p className="text-sm opacity-80 mb-4">
                Upskill your team with enterprise solutions and custom training programs.
              </p>
              <Button variant="secondary" size="sm">
                Enterprise Solutions
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;