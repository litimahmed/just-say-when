import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/SearchBar";
import { MegaMenu } from "@/components/ui/MegaMenu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import UserProfileDropdown from "@/components/ui/UserProfileDropdown";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import formacadLogoLight from "@/assets/light_logo.svg";
import formacadLogoDark from "@/assets/dark_logo.svg";

interface NewHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  loading?: boolean;
}

export default function NewHeader({ isDark, toggleTheme, loading: externalLoading }: NewHeaderProps) {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Listen for custom event to open login modal
  React.useEffect(() => {
    const handleOpenLoginModal = () => {
      openModal();
    };

    window.addEventListener("openLoginModal", handleOpenLoginModal);

    return () => {
      window.removeEventListener("openLoginModal", handleOpenLoginModal);
    };
  }, []);


  // Skeleton Components
  const TopHeaderSkeleton = () => (
    <div className="w-full bg-primary px-4 lg:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
        {/* Left - Language Selector Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="h-8 w-16 bg-primary-foreground/10 rounded-md" />
        </div>

        {/* Center - Text Content Skeleton */}
        <div className="flex-1 text-center px-4">
          <Skeleton className="h-4 w-64 bg-primary-foreground/10 mx-auto" />
        </div>

        {/* Right - Help Center & Theme Toggle Skeleton */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Skeleton className="h-8 w-24 bg-primary-foreground/10 rounded-md" />
          <Skeleton className="h-8 w-8 bg-primary-foreground/10 rounded-md" />
        </div>
      </div>
    </div>
  );

  const MainNavSkeleton = () => (
    <div className="w-full bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo Skeleton */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <Skeleton className="h-12 w-12 rounded-xl bg-muted/80" />
              <Skeleton className="h-7 w-28 rounded-sm bg-muted/80" />
            </div>
          </div>

          {/* Center - Explore Menu & Search Skeleton */}
          <div className="flex items-center gap-6 flex-1 max-w-2xl mx-6">
            <Skeleton className="h-9 w-20 rounded-md bg-muted/80" />
            <div className="flex-1 max-w-md">
              <Skeleton className="h-9 w-full rounded-lg bg-muted/60" />
            </div>
          </div>

          {/* Right - Navigation Links & Login Skeleton */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="h-4 w-18 rounded-sm bg-muted/70" />
              <Skeleton className="h-4 w-14 rounded-sm bg-muted/70" />
            </div>
            <Skeleton className="h-9 w-14 rounded-md bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );

  const isLoading = authLoading || externalLoading;

  return (
    <div className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border supports-[backdrop-filter]:bg-background/60">
      {isLoading ? (
        <>
          <TopHeaderSkeleton />
          <MainNavSkeleton />
        </>
      ) : (
        <>
          {/* Top Header Bar */}
          <div className="w-full bg-primary px-4 lg:px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
              {/* Left - Language Selector */}
              <div className="flex-shrink-0">
                <LanguageSwitcher />
              </div>

              {/* Center - Text Content */}
              <div className="flex-1 text-center px-4">
                <span className="text-primary-foreground text-sm font-medium hidden sm:inline">
                  We build a strong platform that tailor to have different things to
                  function
                </span>
              </div>

              {/* Right - Help Center & Theme Toggle */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link to="/help">
                  <Button
                    variant="ghost"
                    className="text-primary-foreground border border-primary-foreground/20 hover:bg-background hover:text-primary text-sm px-4 py-1 h-auto"
                  >
                    Help Center
                  </Button>
                </Link>
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              </div>
            </div>
          </div>

          {/* Main Navigation Bar */}
          <div className="w-full bg-background border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
              <div className="flex items-center justify-between h-16">
                {/* Left - Logo */}
                <div className="flex items-center flex-shrink-0">
                  <Link to="/" className="flex items-center">
                    <img
                      src={isDark ? formacadLogoDark : formacadLogoLight}
                      alt="Formacad Logo"
                      style={{ width: 60, height: 60 }}
                      className="object-contain"
                      loading="eager"
                    />
                    <span className="text-3xl relative -left-2 font-brand font-bold bg-gradient-to-r from-primary via-primary to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:via-primary hover:to-primary transition-all duration-300 tracking-tight">
                      Formacad
                    </span>
                  </Link>
                </div>

                {/* Center - Explore Menu & Search */}
                <div className="flex items-center gap-6 flex-1 max-w-2xl mx-6">
                  <MegaMenu width="full" padding="lg">
                    <MegaMenu.Column title="Explore Roles">
                      <MegaMenu.Item
                        label="Data Analyst"
                        href="/courses/data-analyst"
                      />
                      <MegaMenu.Item
                        label="Project Manager"
                        href="/courses/project-manager"
                      />
                      <MegaMenu.Item
                        label="Cyber Security Analyst"
                        href="/courses/cybersecurity"
                      />
                      <MegaMenu.Item
                        label="Data Scientist"
                        href="/courses/data-scientist"
                      />
                      <MegaMenu.Item
                        label="Business Intelligence Analyst"
                        href="/courses/business-intelligence"
                      />
                      <MegaMenu.Item
                        label="Digital Marketing Specialist"
                        href="/courses/digital-marketing"
                      />
                      <MegaMenu.Item
                        label="UI / UX Designer"
                        href="/courses/ui-ux"
                      />
                      <MegaMenu.Item
                        label="Machine Learning Engineer"
                        href="/courses/machine-learning"
                      />
                      <MegaMenu.Item
                        label="Social Media Specialist"
                        href="/courses/social-media"
                      />
                      <MegaMenu.Item
                        label="Computer Support Specialist"
                        href="/courses/computer-support"
                      />
                      <MegaMenu.Item label="View all" href="/courses" highlight />
                    </MegaMenu.Column>

                    <MegaMenu.Column title="Popular Subjects">
                      <MegaMenu.Item
                        label="Programming"
                        href="/courses/programming"
                      />
                      <MegaMenu.Item
                        label="Data Science"
                        href="/courses/data-science"
                      />
                      <MegaMenu.Item
                        label="Web Development"
                        href="/courses/web-development"
                      />
                      <MegaMenu.Item label="View all" href="/courses" highlight />
                    </MegaMenu.Column>

                    <MegaMenu.Column title="Skill Levels">
                      <MegaMenu.Item
                        label="Beginner"
                        href="/courses?level=beginner"
                      />
                      <MegaMenu.Item
                        label="Intermediate"
                        href="/courses?level=intermediate"
                      />
                      <MegaMenu.Item
                        label="Advanced"
                        href="/courses?level=advanced"
                      />
                      <MegaMenu.Item label="View all" href="/courses" highlight />
                    </MegaMenu.Column>

                    <MegaMenu.CTA
                      image="/lovable-uploads/1f6a2417-0f18-43a3-b0f3-6a65ecad2be2.png"
                      title="Master Data Science"
                      description="Enroll in our top-rated course and become a data expert."
                      buttonText="Get Started"
                      buttonLink="/courses/data-science"
                    />
                  </MegaMenu>

                  <div className="flex-1 max-w-md">
                    <SearchBar />
                  </div>
                </div>

                {/* Right - Navigation Links & Login */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  {user ? (
                    <div className="flex items-center gap-6">
                      <Link
                        to="/my-courses"
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        My Courses
                      </Link>
                      <Link
                        to="/dashboard"
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        Dashboard
                      </Link>
                      <UserProfileDropdown />
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                      <Link
                        to={location.pathname === "/business" ? "/" : "/business"}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden md:block"
                      >
                        {location.pathname === "/business"
                          ? "For Individuals"
                          : "For Business"}
                      </Link>
                      <Link
                        to="/careers"
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden md:block"
                      >
                        Careers
                      </Link>
                      <Dialog
                        open={isModalOpen}
                        onOpenChange={(open) => {
                          if (open) openModal();
                          else closeModal();
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Login
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="fixed left-1/2 top-1/2 z-50 max-h-screen w-[95vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl p-0 shadow-xl" aria-describedby={undefined}>
                          <AuthDialog onClose={closeModal} isDark={isDark} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
