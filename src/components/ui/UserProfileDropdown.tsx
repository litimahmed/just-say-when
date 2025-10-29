import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  LifeBuoy,
  BookOpenText,
  CreditCard,
  BookMarked,
  ClipboardList,
  Award,
  LucideIcon,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import StudentProfileDialog from "@/components/StudentProfile";

export default function UserProfileDropdown() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Extract user information from auth
  const firstName = user?.user_metadata?.first_name || "";
  const lastName = user?.user_metadata?.last_name || "";
  const email = user?.email || "user@example.com";
  const avatar = user?.user_metadata?.avatar_url;

  // Compute fullName with fallback
  const fullName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : user?.user_metadata?.username || "User";

  // Generate initials for fallback
  const initials =
    firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
      : user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200">
            <AvatarImage
              src={avatar}
              alt={fullName}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            className="z-50 min-w-[280px] rounded-xl bg-card shadow-xl border border-border p-2 text-sm text-card-foreground"
          >
            <div className="px-3 py-3 border-b border-border">
              <p className="text-sm font-semibold leading-none text-foreground">{fullName}</p>
              <p className="text-xs text-muted-foreground mt-1">{email}</p>
            </div>
            
            <div className="py-1">
              <DropdownItem
                icon={User}
                text="View Profile"
                shortcut="⌘P"
                onSelect={() => setIsProfileOpen(true)}
              />
              <DropdownItem
                icon={BookMarked}
                text="My Courses"
                shortcut="⌘C"
                onSelect={() => navigate("/courses")}
              />
              <DropdownItem
                icon={ClipboardList}
                text="Assignments"
                shortcut="⌘A"
                onSelect={() => navigate("/assignments")}
              />
              <DropdownItem
                icon={Award}
                text="Certificates"
                shortcut="⌘T"
                onSelect={() => navigate("/certificates")}
              />
            </div>

            <DropdownMenu.Separator className="my-1 h-px bg-border" />
            
            <div className="py-1">
              <DropdownItem
                icon={Settings}
                text="Settings"
                shortcut="⌘S"
                onSelect={() => navigate("/settings")}
              />
              <DropdownItem
                icon={CreditCard}
                text="Subscription"
                shortcut="⌘B"
                onSelect={() => navigate("/subscription")}
              />
              <DropdownItem
                icon={LifeBuoy}
                text="Support"
                shortcut="⌘H"
                onSelect={() => navigate("/help-center")}
              />
              <DropdownItem
                icon={BookOpenText}
                text="Community"
                shortcut="⌘M"
                onSelect={() => navigate("/community")}
              />
            </div>

            <DropdownMenu.Separator className="my-1 h-px bg-border" />
            
            <div className="py-1">
              <DropdownItem
                icon={LogOut}
                text={isLoggingOut ? "Signing Out..." : "Sign Out"}
                shortcut="⌘Q"
                onSelect={handleLogout}
                disabled={isLoggingOut}
                variant="destructive"
              />
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Student Profile Dialog */}
      <StudentProfileDialog
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
      />
    </>
  );
}

function DropdownItem({
  icon: Icon,
  text,
  shortcut,
  onSelect,
  disabled = false,
  variant = "default",
}: {
  icon: LucideIcon;
  text: string;
  shortcut: string;
  onSelect: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenu.Item
      disabled={disabled}
      onSelect={disabled ? undefined : onSelect}
      className={cn(
        "group flex items-center justify-between w-full cursor-pointer px-3 py-2.5 rounded-lg outline-none transition-colors duration-150",
        disabled && "opacity-50 cursor-not-allowed",
        variant === "default" && 
          "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
        variant === "destructive" && 
          "hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive",
        !disabled && "data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn(
          "w-4 h-4 transition-colors duration-150",
          variant === "default" && "text-muted-foreground group-hover:text-primary",
          variant === "destructive" && "text-muted-foreground group-hover:text-destructive"
        )} />
        <span className="font-medium">{text}</span>
      </div>
      <span className={cn(
        "text-xs transition-colors duration-150",
        variant === "default" && "text-muted-foreground/70 group-hover:text-primary/70",
        variant === "destructive" && "text-muted-foreground/70 group-hover:text-destructive/70"
      )}>
        {shortcut}
      </span>
    </DropdownMenu.Item>
  );
}