"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "./ui/container";
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
    <Container>
        <div className="border-b">
        <nav className="h-16 flex">
          <ul className="flex space-x-10 items-center justify-center w-full">
            {NAV_ROUTES.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "text-xl font-medium transition-colors hover:text-emerald-300",
                    pathname === route.href ? "text-emerald-300" : "text-neutral-100"
                  )}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
    </div>
      </Container>
  );
};

export default Navbar;
