"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useUser } from "@/hooks/use-user";
import { cn } from "@/utils/utils";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const NAV_ROUTES = [
    // { href: "/", label: "Home" },
    { href: "/music", label: "Musique" },
    { href: "/shows", label: "Concerts" },
    { href: "/lyrics", label: "Lyrics" },
    { href: "/contact", label: "Contact" },
  ];
  const { user } = useUser();

  return (
    <div className="h-16 items-center border-b border-gray-500 justify-center flex w-full">
      <nav className="md:flex w-full items-center justify-between px-4 hidden">
        {/* Logo */}
        <Link
          href="/"
          className=" bg-[rgb(28,28,28)] rounded-full w-[50px] h-[50px] flex items-center justify-center"
        >
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={30}
            height={30}
            className=""
          />
        </Link>

        {/* Public Nav Items */}
        {NAV_ROUTES.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "text-md font-semibold transition-colors hover:text-emerald-300",
              pathname === route.href ? "text-emerald-300" : "text-neutral-100"
            )}
          >
            {route.label}
          </Link>
        ))}

        {/* Admin */}
        {user && (
          <Link
            href={"/admin"}
            className={cn(
              "text-md font-semibold transition-colors hover:text-emerald-300",
              pathname.includes("admin")
                ? "text-emerald-300"
                : "text-neutral-100"
            )}
          >
            Admin
          </Link>
        )}
      </nav>

      {/* Menu Burger (Mobile) */}
      <motion.button
        ref={menuButtonRef}
        className="block md:hidden"
        onClick={(event) => {
          event.stopPropagation();
          toggleMenu();
        }}
        aria-label="Toggle Menu"
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 90 : 0 }} // Rotation légère du bouton
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-8 h-8 flex flex-col justify-between">
          {/* Hamburger lines en blanc */}
          <motion.div
            className="w-full h-1 bg-white rounded "
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 0 : 1 }} // Disparition de la première ligne
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-1 bg-white rounded "
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0, // Déplacement vers le bas
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-1 bg-white rounded "
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0, // Déplacement vers le haut
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Menu déroulant (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="absolute z-50 top-16 left-0 w-full bg-black text-white py-4 border-b border-gray-500 flex flex-col items-center space-y-4 md:hidden shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} // Animation de fermeture fluide
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className=" bg-[rgb(28,28,28)] rounded-full w-[50px] h-[50px] flex items-center justify-center"
            >
              <Image
                src={"/logo.png"}
                alt="Logo"
                width={30}
                height={30}
                className=""
              />
            </Link>
            {NAV_ROUTES.map((route) => (
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  "text-lg font-semibold transition-colors hover:text-emerald-300",
                  pathname === route.href ? "text-emerald-300" : "text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            {user && (
              <Link
                href={"/admin"}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-md font-semibold transition-colors hover:text-emerald-300",
                  pathname.includes("admin")
                    ? "text-emerald-300"
                    : "text-neutral-100"
                )}
              >
                Admin
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
