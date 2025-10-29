import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Fingerprint,
  CheckCircle,
  Linkedin,
  Github,
  Plus,
  X,
  Download,
  Award,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Dialog Component Wrapping StudentProfile
interface StudentProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StudentProfileDialog({
  open,
  onOpenChange,
}: StudentProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full max-h-[85vh] p-0 overflow-hidden border-0 focus:outline-none focus-visible:outline-none shadow-2xl" aria-describedby={undefined}>
        <div className="overflow-y-auto h-full max-h-[85vh] modern-scrollbar">
          <StudentProfileContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function StudentProfileContent() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [currentProfilePicture, setCurrentProfilePicture] = React.useState<string | null>(null);
  const [imageLoading, setImageLoading] = React.useState(true);
  const [showFullNIN, setShowFullNIN] = React.useState(false);
  const [selectedCertificate, setSelectedCertificate] = React.useState<string | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = React.useState<number | null>(null);
  const [isShareOpen, setIsShareOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const shareRef = React.useRef<HTMLDivElement>(null);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Close share options on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock user data (in real app, this would come from your backend)
  const profilePicture = currentProfilePicture || "/lovable-uploads/1f6a2417-0f18-43a3-b0f3-6a65ecad2be2.png";
  const firstName = user?.user_metadata?.first_name || "Student";
  const lastName = user?.user_metadata?.last_name || "User";
  const address = "Es Senia, Oran, Algeria";
  const username = user?.email?.split('@')[0] || "student123";
  const email = user?.email || "Not provided";
  const phoneNumber = user?.user_metadata?.phone || "Not provided";
  const birthDate = user?.user_metadata?.birth_date || "Not provided";
  const birthPlace = user?.user_metadata?.birth_place || "Not provided";
  const nin = "123XXXX567";
  const biography = "Passionate student focused on learning and growth in technology.";

  // Blue gradient for cover
  const coverGradient = "linear-gradient(135deg, #2994ff 0%, #1a73e8 100%)";
  console.log("coverGradient defined:", coverGradient);

  // Mock data
  const recentActivities = [
    { activity: "Completed Course: React Basics", date: "April 28, 2025" },
    { activity: "Earned Badge: Quick Thinker", date: "April 27, 2025" },
    { activity: "Submitted Assignment: Django Project", date: "April 25, 2025" },
  ];

  const socialLinks = {
    linkedin: "https://linkedin.com/in/student",
    github: "https://github.com/student",
    behance: "https://behance.net/student",
  };

  const certificates = [
    { id: 1, src: "/lovable-uploads/33036365-2096-4b71-813a-f70b9459d29d.png", alt: "Certificate 1" },
    { id: 2, src: "/lovable-uploads/7b9d2247-6c4d-49a9-8e4b-1372bd527f76.png", alt: "Certificate 2" },
    { id: 3, src: "/lovable-uploads/9947613a-4950-4fe7-bac0-7d4e750181b7.png", alt: "Certificate 3" },
  ];

  const skills = ["React", "TypeScript", "JavaScript", "CSS", "Node.js"];

  const badges = [
    { title: "First Course", src: "/lovable-uploads/e2c99c4f-bee4-439a-89e3-3638d630f898.png" },
    { title: "Speed Demon", src: "/lovable-uploads/3354630d-3810-4433-8499-88e92ea2f937.png" },
    { title: "Community Helper", src: "/lovable-uploads/4995e3a2-aecc-4084-85eb-c8396be50dbc.png" },
    { title: "Perfect Score", src: "/lovable-uploads/fa7569ef-8a35-4410-b641-3b86010dea13.png" },
    { title: "Night Owl", src: "/lovable-uploads/260dc261-d9c0-4332-a3e4-351393d85a75.png" },
    { title: "Streak Master", src: "/lovable-uploads/6d1b0d65-4163-405d-8cc6-ff0d00f74c2f.png" },
    { title: "Course Completionist", src: "/lovable-uploads/a952f826-2ff7-432b-af9d-1b3fc1385c45.png" },
  ];

  // Helper functions
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const fullName = firstName || lastName ? `${capitalize(firstName)} ${capitalize(lastName)}`.trim() : "User";

  const handleUsernameClick = () => {
    navigator.clipboard.writeText(username).then(() => {
      toast({ title: "Copied to clipboard", description: "Username copied successfully" });
    });
  };

  const handleNINClick = () => {
    setShowFullNIN(!showFullNIN);
  };

  const displayNIN = showFullNIN ? nin : nin.length >= 3 ? `${nin.slice(0, 3)}XXXX` : "Not provided";

  const handleThumbnailClick = (id: number) => {
    setSelectedThumbnail(selectedThumbnail === id ? null : id);
  };

  const handleViewCertificate = (src: string) => {
    setSelectedCertificate(src);
    setSelectedThumbnail(null);
  };

  const handleDownloadCertificate = (alt: string) => {
    toast({ title: "Download started", description: `Downloading ${alt}...` });
    setSelectedThumbnail(null);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (loading) {
    return (
      <div className="w-full bg-background text-foreground overflow-hidden">
        <div className="h-40 bg-muted animate-pulse"></div>
        <div className="relative -mt-16 ml-6">
          <div className="w-32 h-32 bg-muted rounded-full border-4 border-background animate-pulse"></div>
        </div>
        <div className="pt-20 pb-8 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="w-2/3 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-4 rounded-lg" />
              <Skeleton className="w-full h-4 rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-3/4 h-4 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full bg-background text-foreground overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full p-4">
            <img
              src={selectedCertificate}
              alt="Certificate Full View"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <Button
              onClick={closeCertificateModal}
              className="absolute -top-2 -right-2 w-10 h-10 p-0 bg-background/90 hover:bg-background border border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-foreground" />
            </Button>
          </div>
        </div>
      )}

      {/* Cover Image */}
      <div
        className="h-40 bg-cover bg-center relative"
        style={{ background: coverGradient }}
      >
        {/* Profile Image */}
        <motion.div
          className="absolute -bottom-16 left-6"
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative group">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src={profilePicture}
                alt="Profile"
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  e.currentTarget.src = "/lovable-uploads/1f6a2417-0f18-43a3-b0f3-6a65ecad2be2.png";
                  setImageLoading(false);
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* More Options */}
        <div className="absolute -bottom-14 right-5">
          <MoreVertical className="w-5 h-5 text-foreground cursor-pointer" />
        </div>
      </div>

      {/* Profile Info - Two Column Layout */}
      <div className="pt-20 pb-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="mt-2">
            <motion.div variants={childVariants} className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">{fullName}</h2>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-normal text-muted-foreground">{address}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="relative group">
                  <span
                    className="text-sm font-medium text-primary cursor-pointer"
                    onClick={handleUsernameClick}
                  >
                    @{username}
                  </span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-lg shadow-md">
                      Copy to Clipboard
                    </div>
                  </div>
                </div>
                <span className="text-muted-foreground"> • </span>
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                  <span className="text-sm font-normal text-muted-foreground">Student</span>
                </div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div className="flex gap-3 mt-4 relative" variants={childVariants}>
              <Button variant="outline" className="border-border">
                Message
              </Button>

              <div className="relative">
                <Button
                  onClick={() => setIsShareOpen((prev) => !prev)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Share profile
                </Button>

                {/* Share Options */}
                {isShareOpen && (
                  <div
                    ref={shareRef}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card border border-border rounded-lg p-3 w-56 z-50 shadow-lg"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 w-full px-2 py-2 hover:bg-primary/10 rounded-md cursor-pointer">
                        <Linkedin className="w-5 h-5 text-primary" />
                        <span className="text-sm text-card-foreground">Share on LinkedIn</span>
                      </div>
                      <div className="flex items-center gap-3 w-full px-2 py-2 hover:bg-muted rounded-md cursor-pointer">
                        <Github className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-card-foreground">Share on GitHub</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Short Bio */}
            <motion.div variants={childVariants} className="mt-4">
              <h3 className="text-lg font-bold text-foreground">Short Bio</h3>
              <p className="text-sm font-normal text-muted-foreground leading-relaxed mt-1">
                {biography}
              </p>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={childVariants} className="mt-4">
              <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
              <div className="space-y-2 mt-1">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <div>
                      <p className="text-sm font-normal text-muted-foreground">{activity.activity}</p>
                      <p className="text-xs font-normal text-muted-foreground/70">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={childVariants} className="mt-4">
              <h3 className="text-lg font-bold text-foreground">Social Links</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-normal text-muted-foreground">LinkedIn</p>
                  <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-normal text-muted-foreground">GitHub</p>
                  <Github className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div variants={childVariants} className="mt-6">
              <h3 className="text-lg font-bold text-foreground">Certificates</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {certificates.map((certificate) => (
                  <motion.div
                    key={certificate.id}
                    variants={childVariants}
                    whileHover={{ scale: 1.05 }}
                    className="relative cursor-pointer"
                    onClick={() => handleThumbnailClick(certificate.id)}
                  >
                    <img
                      src={certificate.src}
                      alt={certificate.alt}
                      className="w-16 h-16 rounded-md object-cover border border-border shadow-sm"
                    />
                    {selectedThumbnail === certificate.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-card rounded-lg shadow-md p-2 z-10">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDownloadCertificate(certificate.alt)}
                            className="flex items-center gap-1 px-3 py-1 text-sm"
                            variant="outline"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                          <Button
                            onClick={() => handleViewCertificate(certificate.src)}
                            className="flex items-center gap-1 px-3 py-1 text-sm"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="mt-2">
            {/* Skills */}
            <motion.div variants={childVariants}>
            <h3 className="text-lg font-bold text-foreground">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div variants={childVariants} className="mt-6">
              <h3 className="text-lg font-bold text-foreground">Badges</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {badges.map((badge, index) => (
                    <motion.div
                      key={badge.title}
                      whileHover={{ scale: 1.1 }}
                      className="relative group"
                    >
                      <img
                        src={badge.src}
                        alt={badge.title}
                        className="w-12 h-12 object-contain"
                      />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-foreground text-background text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                          {badge.title}
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={childVariants}
              className="mt-6 border border-border rounded-lg p-5 shadow-sm bg-card"
            >
              <h3 className="text-xl font-bold text-card-foreground border-b border-border pb-2 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact Email</p>
                    <p className="text-base font-normal text-card-foreground">{email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-base font-normal text-card-foreground">{phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Birth Date</p>
                    <p className="text-base font-normal text-card-foreground">{birthDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Birth Place</p>
                    <p className="text-base font-normal text-card-foreground">{birthPlace}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-5 h-5 text-muted-foreground" />
                  <div className="relative group">
                    <p className="text-sm font-medium text-muted-foreground">NIN</p>
                    <p
                      className="text-base font-normal text-card-foreground cursor-pointer"
                      onClick={handleNINClick}
                    >
                      {displayNIN}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={childVariants} className="mt-6">
              <h3 className="text-lg font-bold text-foreground">Achievements</h3>
              <div className="space-y-2 mt-2">
                {[
                  { title: "Completed Full-Stack Development Program", date: "April 2025" },
                  { title: "30-Day Study Streak Achieved", date: "March 2025" },
                  { title: "Top Student of the Month", date: "April 2025" },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-warning" />
                    <div>
                      <p className="text-sm font-normal text-muted-foreground">{achievement.title}</p>
                      <p className="text-xs font-normal text-muted-foreground/70">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}