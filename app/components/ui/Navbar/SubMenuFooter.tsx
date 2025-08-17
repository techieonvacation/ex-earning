import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { SubMenuFooterProps } from "./Navbar.types";

export default function SubMenuFooter({
  className,
  text,
  href,
}: SubMenuFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between px-4 py-3 rounded-b-lg bg-primary/5 border-t border-primary/10",
        className
      )}
    >
      <div className="text-sm  mb-2 md:mb-0">
        {text || "Ready to get started?"}
        <Link
          href={href || "/contact"}
          className="font-semibold text-sm text-primary hover:text-primary/80 transition-colors px-2 font-urbanist"
        >
          Let&apos;s talk
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
        <Link
          href="mailto:info@eleservsoftech.com"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-urbanist"
        >
          <Mail className="h-4 w-4" />
          <span>info@eleservsoftech.com</span>
        </Link>

        <Link
          href="tel:+919826000000"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-urbanist"
        >
          <Phone className="h-4 w-4" />
          <span>+91 9826000000</span>
        </Link>
      </div>
    </div>
  );
}
