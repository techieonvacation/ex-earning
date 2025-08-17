"use client";

import { usePathname } from "next/navigation";
import Navbar from "./ui/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  // Don't render navbar on admin routes
  if (isAdminRoute) {
    return null;
  }

  return <Navbar />;
}
