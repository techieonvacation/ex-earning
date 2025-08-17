import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-muted border border-border px-4 py-5 text-center shadow-sm`}
    >
      <h3 className="mb-2 font-semibold text-card-foreground">
        #1 Tailwind CSS Dashboard
      </h3>
      <p className="mb-4 text-muted-foreground text-sm">
        Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.
      </p>
      <a
        href="https://tailadmin.com/pricing"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center p-3 font-medium text-primary-foreground rounded-lg bg-primary text-sm hover:bg-primary/90 transition-colors shadow-sm"
      >
        Upgrade To Pro
      </a>
    </div>
  );
}
