import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 1500; // 1.5 seconds for luxury smooth scroll

    // Easing function for ultra-smooth acceleration/deceleration
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Apply easing for professional smooth motion
      const easedProgress = easeInOutCubic(progress);
      const currentPosition = startPosition * (1 - easedProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-background/80 backdrop-blur-md border border-border/50 text-foreground rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-200"
          whileHover={{
            scale: 1.1,
            y: -2,
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: "0 10px 30px hsla(var(--primary) / 0.3)",
          }}
          whileTap={{
            scale: 0.9,
          }}
          aria-label="Scroll to top"
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10 blur-md"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Icon */}
          <motion.div
            className="relative z-10 flex items-center justify-center w-full h-full"
            whileHover={{
              y: -1,
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp 
              size={20} 
              className="drop-shadow-sm" 
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;