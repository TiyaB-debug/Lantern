"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/dashboard/dashboard.css";

const tabs = [
  ["/dashboard", "Dashboard"],
  ["/assessment", "Assess"],
  ["/explore", "Explore"],
  ["/saved", "Compare"],
  ["/transition", "My Transition"],
];

export default function LanternNav() {
  const path = usePathname();
  return (
    <header className="dashboard-header">
      <Link className="dashboard-brand" href="/dashboard">
        <img src="/figma/dashboard/brand.svg" width={30} height={30} alt="" />
        Lantern
      </Link>
      <nav className="dashboard-nav" aria-label="Main navigation">
        {tabs.map(([href, label]) => (
          <Link key={href} href={href} aria-current={path === href || path.startsWith(href + "/") || (href === "/explore" && path.startsWith("/careers/")) || (href === "/assessment" && path === "/results") ? "page" : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <Link className="dashboard-profile" href="/profile" aria-current={path === "/profile" ? "page" : undefined}>
        <img src="/figma/dashboard/profile.svg" width={18} height={18} alt="" />
        Profile
      </Link>
    </header>
  );
}
