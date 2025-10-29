import React from "react";
import { MapPin, Phone } from "lucide-react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

interface FooterProps {
  isDark?: boolean;
  loading?: boolean;
}

const paymentMethods = [
  { src: "/payment-icons/paypal.svg", label: "Paypal" },
  { src: "/payment-icons/visa.svg", label: "Visa" },
  { src: "/payment-icons/googlepay.svg", label: "GooglePay" },
  { src: "/payment-icons/applepay.svg", label: "ApplePay" },
  { src: "/payment-icons/stripe.svg", label: "Stripe" },
  { src: "/payment-icons/amazonpay.svg", label: "AmazonPay" },
];

// Professional Footer Skeleton Component
const FooterSkeleton = () => (
  <footer className="bg-muted/30 text-foreground py-16 px-6">
    <div className="max-w-7xl mx-auto">
      {/* Footer Columns Skeleton */}
      <div className="flex justify-between flex-wrap gap-8 text-sm">
        {/* Column 1 - Logo and Social */}
        <div className="max-w-[280px] text-left">
          <div className="mb-4">
            <Skeleton className="h-10 w-32 bg-gradient-to-r from-primary/20 to-primary/30 animate-pulse" />
          </div>
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full bg-muted/60" />
            <Skeleton className="h-4 w-4/5 bg-muted/50" />
            <Skeleton className="h-4 w-3/4 bg-muted/40" />
          </div>
          <div className="flex justify-start gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
            ))}
          </div>
        </div>

        {/* Column 2 - Explore Topics */}
        <div className="min-w-[200px]">
          <Skeleton className="h-6 w-32 mb-4 bg-primary/30" />
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-muted/50" style={{animationDelay: `${i * 0.05}s`}} />
            ))}
          </div>
        </div>

        {/* Column 3 - Resources */}
        <div className="min-w-[200px]">
          <Skeleton className="h-6 w-24 mb-4 bg-primary/30" />
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-muted/50" style={{animationDelay: `${i * 0.05}s`}} />
            ))}
          </div>
        </div>

        {/* Column 4 - App Download */}
        <div className="min-w-[220px]">
          <Skeleton className="h-6 w-36 mb-2 bg-primary/30" />
          <Skeleton className="h-4 w-full mb-4 bg-muted/50" />
          
          {/* Contact Info Skeleton */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Skeleton className="w-8 h-8 rounded-full bg-primary/20 mr-3" />
              <Skeleton className="h-4 w-32 bg-muted/50" />
            </div>
            <div className="flex items-center mb-4">
              <Skeleton className="w-8 h-8 rounded-full bg-primary/20 mr-3" />
              <Skeleton className="h-4 w-28 bg-muted/50" />
            </div>
          </div>
          
          {/* App Store Buttons Skeleton */}
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center w-[180px] h-[48px] px-3 py-2 rounded-lg border border-border bg-background">
                <Skeleton className="w-7 h-7 mr-3 bg-muted/60" />
                <div className="text-left leading-none flex-1">
                  <Skeleton className="h-2 w-12 mb-1 bg-muted/40" />
                  <Skeleton className="h-3 w-16 bg-muted/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods Skeleton */}
      <div className="py-10 border-t border-border mt-8">
        <Skeleton className="h-5 w-48 mb-6 bg-muted/70" />
        <div className="flex flex-wrap justify-start items-center gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton className="w-8 h-8 mb-2 rounded bg-muted/60" style={{animationDelay: `${i * 0.1}s`}} />
              <Skeleton className="h-2 w-12 bg-muted/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Skeleton */}
      <div className="text-center py-8 border-t border-border">
        <div className="flex justify-center items-center gap-2">
          <Skeleton className="h-4 w-24 bg-muted/50" />
          <Skeleton className="h-4 w-16 bg-primary/30" />
          <Skeleton className="h-4 w-32 bg-muted/50" />
          <Skeleton className="h-4 w-20 bg-primary/30" />
          <Skeleton className="h-4 w-28 bg-primary/30" />
        </div>
      </div>
    </div>
  </footer>
);

const Footer = ({ isDark, loading }: FooterProps) => {
  if (loading) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="bg-muted/30 text-foreground py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Footer Columns */}
        <div className="flex justify-between flex-wrap gap-8 text-sm">
          {/* Logo, Slogan, and Social Icons */}
          <div className="max-w-[280px] text-left">
            <h1 className="text-primary text-4xl font-extrabold tracking-tight mb-4">
              Formacad
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Join us in shaping the future of education and technology with our
              cutting-edge platform. Explore our courses and unlock your
              potential today!
            </p>

            <div className="flex justify-start gap-3">
              <a
                href="#"
                className="bg-primary rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <FaTwitter className="text-primary-foreground w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-primary rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <FaInstagram className="text-primary-foreground w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-primary rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <FaFacebookF className="text-primary-foreground w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-primary rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <FaLinkedinIn className="text-primary-foreground w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="min-w-[200px]">
            <h2 className="font-bold text-lg mb-4 text-primary">
              Explore Topics
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Latest Trends in AI
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Future of Web Development
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Cybersecurity Best Practices
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                DevOps Culture and Tools
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Ethical Implications of AI
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Building Scalable Applications
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Introduction to Cloud Computing
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Data Privacy and Security
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="min-w-[200px]">
            <h2 className="font-bold text-lg mb-4 text-primary">Resources</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Free E-books
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Webinars and Workshops
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Community Forums
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Online Coding Challenges
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Career Guidance
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Open Source Projects
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Developer Tools
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">
                Learning Roadmaps
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="min-w-[220px]">
            <h2 className="font-bold text-lg mb-2 text-primary">
              Download Our App
            </h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Get our app on Play Store and App Store.
            </p>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center text-primary mr-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-muted-foreground text-sm">
                  254 lillian blvd, holbrook
                </p>
              </div>
              <div className="flex items-center mb-4">
                <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center text-primary mr-3">
                  <Phone className="w-4 h-4" />
                </div>
                <p className="text-muted-foreground text-sm">
                  +880 1715 429 512
                </p>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="space-y-3">
              {/* Google Play Button */}
              <a
                href="#"
                className="flex items-center w-[180px] h-[48px] px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                <img
                  src="/app-store-icons/google-play.svg"
                  alt="Google Play"
                  className="w-7 h-7 mr-3"
                />
                <div className="text-left leading-none">
                  <p className="text-[10px] font-medium text-muted-foreground">
                    GET IT ON
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Google Play
                  </p>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href="#"
                className="flex items-center w-[180px] h-[48px] px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                <img
                  src="/app-store-icons/apple-store.svg"
                  alt="App Store"
                  className="w-7 h-7 mr-3"
                />
                <div className="text-left leading-none">
                  <p className="text-[10px] font-medium text-muted-foreground">
                    Download on the
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    App Store
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Payment Gateway Section */}
        <div className="py-10 border-t border-border mt-8">
          <p className="text-sm font-bold mb-6 text-foreground">
            We accept many payment methods.
          </p>
          <div className="flex flex-wrap justify-start items-center gap-8">
            {paymentMethods.map((method, i) => (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={method.src}
                  alt={method.label}
                  className="w-8 h-8 mb-2 object-contain"
                  loading="lazy"
                />
                <span className="text-[10px] text-muted-foreground">
                  {method.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm py-8 border-t border-border text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-primary">Formacad</span>. All
            rights reserved. |
            <a
              href="/privacy-policy"
              className="font-medium hover:underline text-primary ml-1"
            >
              Privacy Policy
            </a>{" "}
            |
            <a
              href="/terms-of-service"
              className="font-medium hover:underline text-primary ml-1"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
