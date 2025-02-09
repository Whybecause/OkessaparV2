"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  const NAV_ROUTES = [
    { href: "/", label: "Home" },
    { href: "/music", label: "Musique" },
    { href: "/shows", label: "Concerts" },
    { href: "/lyrics", label: "Lyrics" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="h-16 items-center border-b justify-center flex w-full">
        <nav className="space-x-4 sm:space-x-16 md:space-x-24 lg:space-x-32">
          {NAV_ROUTES.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-lg md:text-xl font-semibold transition-colors hover:text-emerald-300",
                pathname === route.href
                  ? "text-emerald-300"
                  : "text-neutral-100"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
