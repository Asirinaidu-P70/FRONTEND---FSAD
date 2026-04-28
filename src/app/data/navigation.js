import {
  BarChart3,
  Bell,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Presentation,
  Settings,
  Shield,
  UploadCloud,
  UserRound,
  Users,
} from "lucide-react";

export const publicNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Workshops", href: "/workshops" },
  { label: "Contact", href: "/contact" },
];

export const userNavigation = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "Browse Workshops", href: "/app/workshops", icon: Presentation },
  { label: "My Workshops", href: "/app/my-workshops", icon: BookOpen },
  { label: "My Learning", href: "/app/learning", icon: ClipboardList },
  { label: "Notifications", href: "/app/notifications", icon: Bell },
  { label: "Profile", href: "/app/profile", icon: UserRound },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export const adminNavigation = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Manage Workshops", href: "/admin/workshops", icon: Presentation },
  { label: "Manage Users", href: "/admin/users", icon: Users },
  {
    label: "Registrations",
    href: "/admin/registrations",
    icon: ClipboardList,
  },
  { label: "Materials", href: "/admin/materials", icon: UploadCloud },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Shield },
];

export const quickActions = [
  {
    title: "Create workshop",
    description: "Launch a new premium cohort flow",
    href: "/admin/workshops/new",
  },
  {
    title: "Review registrations",
    description: "Triage pending approvals",
    href: "/admin/registrations",
  },
  {
    title: "Publish announcement",
    description: "Notify your learner base",
    href: "/admin/announcements",
  },
];
