import {
  Home,
  Bookmark,
  History,
  FileText,
  Settings,
  UserCog,
} from "lucide-react";

export const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },

  {
    icon: FileText,
    label: "Article",
    href: "/dashboard/article",
    subItems: [
      { label: "Daftar Article", href: "/dashboard/article" },
      { label: "Category", href: "/dashboard/article/category" },
    ],
  },

  {
    icon: History,
    label: "History",
    href: "/dashboard/history",
  },

  {
    icon: Bookmark,
    label: "Bookmarks",
    href: "/dashboard/bookmarks",
  },
  {
    icon: UserCog,
    label: "Accounts",
    href: "/dashboard/user",
  },

  {
    icon: Settings,
    label: "Pengaturan",
    href: "/dashboard/profile",
    subItems: [
      { label: "Profile", href: "/dashboard/profile" },
      { label: "Security", href: "/dashboard/profile/security" },
    ],
  },

  {
    icon: Home,
    label: "Home",
    href: "/",
  },
];
