import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import formacadMobileMockup from "@/assets/mobile-app-hero.png";

const AppMobileSkeleton = () => (
  <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content Side Skeleton */}
        <div className="space-y-8 animate-fade-in">
          <div>
            <Skeleton className="h-6 w-28 mb-4 bg-primary/30" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full bg-gradient-to-r from-muted/70 to-muted/50" />
              <Skeleton className="h-12 w-4/5 bg-gradient-to-r from-muted/60 to-muted/40" />
            </div>
            <div className="space-y-2 mt-6">
              <Skeleton className="h-5 w-full bg-muted/60" />
              <Skeleton className="h-5 w-5/6 bg-muted/50" />
              <Skeleton className="h-5 w-4/5 bg-muted/40" />
            </div>
          </div>

          {/* Features Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-2 h-2 rounded-full bg-primary/50" />
                <Skeleton className="h-4 w-28 bg-muted/60" />
              </div>
            ))}
          </div>

          {/* Download Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="w-[200px] h-[56px] rounded-xl bg-primary/40" />
            <Skeleton className="w-[200px] h-[56px] rounded-xl bg-secondary/40" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2 bg-primary/40" />
                <Skeleton className="h-4 w-20 bg-muted/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Image Side Skeleton */}
        <div className="relative animate-fade-in">
          <Skeleton className="w-full h-[500px] rounded-2xl bg-gradient-to-br from-muted/60 to-muted/40" />
        </div>
      </div>
    </div>
  </section>
);

interface AppMobileProps {
  loading?: boolean;
}

const AppMobile = ({ loading = false }: AppMobileProps) => {
  if (loading) {
    return <AppMobileSkeleton />;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider border border-primary px-3 py-1 inline-block rounded-md">
                Mobile App
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Learn on the <span className="text-primary">go</span> with our
                mobile app
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Take your learning experience anywhere. Download our mobile app
                for iOS and Android to access courses, track progress, and
                continue learning even when you're offline.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">
                  Offline Learning
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">
                  Progress Sync
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">
                  Push Notifications
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">
                  Mobile Optimized
                </span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* App Store Button - Primary Theme */}
              <a
                href="#"
                className="flex items-center w-[200px] h-[56px] px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <img
                  src="/app-store-icons/apple-store.svg"
                  alt="App Store"
                  className="w-8 h-8 mr-4"
                />
                <div className="text-left leading-none">
                  <p className="text-xs font-medium text-primary-foreground/70">
                    Download on the
                  </p>
                  <p className="text-base font-semibold text-primary-foreground">
                    App Store
                  </p>
                </div>
              </a>

              {/* Google Play Button - Secondary Theme */}
              <a
                href="#"
                className="flex items-center w-[200px] h-[56px] px-4 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <img
                  src="/app-store-icons/google-play.svg"
                  alt="Google Play"
                  className="w-8 h-8 mr-4"
                />
                <div className="text-left leading-none">
                  <p className="text-xs font-medium text-secondary-foreground/70">
                    GET IT ON
                  </p>
                  <p className="text-base font-semibold text-secondary-foreground">
                    Google Play
                  </p>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">
                  App Store Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100K+</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src={formacadMobileMockup}
                alt="Formacad mobile app mockup showing iOS and Android devices with course dashboard, lesson details, and student profile"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppMobile;
