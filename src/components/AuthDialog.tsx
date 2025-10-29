import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useAuth } from "@/hooks/useAuth";
import loginBanner from "@/assets/login-banner.jpg";
import loginImage1 from "@/assets/loginimage1.webp";
import loginImage2 from "@/assets/loginimage2.webp";
import loginImage3 from "@/assets/loginimage3.webp";
import loginImage4 from "@/assets/loginimage4.webp";

interface AuthDialogProps {
  onClose: () => void;
  isDark: boolean;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const userImages = [loginImage1, loginImage2, loginImage3, loginImage4];

export default function AuthDialog({ onClose, isDark }: AuthDialogProps) {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    showPassword,
    setShowPassword,
    password,
    setPassword,
  } = useLoginForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        setError("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      const { error } = await signIn(email, password);

      if (error) {
        const msg = String(error.message || '');
        if (msg.toLowerCase().includes('invalid login credentials')) {
          setError("Incorrect email or password. If you just signed up, confirm your email or disable 'Confirm email' in Supabase Auth settings.");
        } else {
          setError(msg || "An error occurred during login.");
        }
      } else {
        onClose();
      }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollArea className="h-[570px] w-full rounded-lg">
      <div
        className={`grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-[570px] w-full overflow-hidden rounded-lg ${
          isDark ? "bg-zinc-800" : "bg-white"
        }`}
      >
        {/* Left Side - Login Form */}
        <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-background">
          <div className="w-full max-w-sm space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-2 border border-primary rounded-full">
                <span className="text-primary text-sm font-semibold uppercase tracking-wide">
                  FORMACAD
                </span>
              </div>
              <h1 className="text-2xl font-normal text-foreground">
                Login into your <span className="text-primary">Account</span>
              </h1>
            </div>

            {/* Google Login */}
            <GoogleLoginButton />

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 h-px bg-border"></div>
              <span className="px-4 text-sm text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sofia.bensalah@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background border-input placeholder:text-muted-foreground"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="text-foreground font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-background border-input placeholder:text-muted-foreground pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-destructive text-sm text-center p-3 bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  navigate("/register");
                }}
                className="text-primary hover:text-primary/80 underline font-medium"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="relative w-full h-full min-h-[570px]">
          <img
            src={loginBanner}
            alt="Login Banner"
            className={`w-full h-full object-cover ${
              isDark ? "brightness-75" : "brightness-110"
            }`}
          />
          <div
            className={`absolute inset-0 ${
              isDark ? "bg-black/50" : "bg-black/30"
            }`}
          />
          <div className="absolute inset-y-8 px-8 lg:px-10 pb-8 flex flex-col items-center justify-end">
            <motion.h1
              className="text-4xl leading-snug font-bold text-center text-gray-200 font-sans"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transforming Education for a Brighter Future
            </motion.h1>

            <motion.p
              className="text-base leading-relaxed text-center mt-3 text-gray-100 font-sans"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Join thousands of professionals using our platform to empower
              learning.
              <br />
              Sign up for free and explore all features for 30 days—no credit
              card required.
            </motion.p>

            <motion.div
              className="flex items-center gap-1 mt-8 w-full justify-start"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center">
                {userImages.map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-white rounded-full border border-gray-300 overflow-hidden shadow-lg -mb-2 -ml-3 first:ml-0"
                  >
                    <img
                      src={src}
                      alt={`User ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex pl-3 flex-col items-center text-sm font-medium text-white">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-100 -mt-2">from 200+ reviews</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
