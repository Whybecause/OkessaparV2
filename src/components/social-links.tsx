import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const SocialLinks = () => {
  const SOCIAL_LINKS = [
    {
      href: "https://www.instagram.com/okessapar",
      icon: <Instagram />,
      label: "Instagram",
    },
    {
      href: "https://www.youtube.com/channel/UCjeEtfJO2NhwegNFxcvb7bw",
      icon: <Youtube />,
      label: "Youtube",
    },
    {
      href: "https://www.facebook.com/okessapar/",
      icon: <Facebook />,
      label: "Facebook",
    },
    {
      href: "https://okessapar.bandcamp.com/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="w-6 h-6 text-emerald-100"
        >
          <path d="M502.7 31.43c4.8 0 7.2 6.6 3.9 10.31L202.3 470.16c-1.5 2-3.9 3.3-6.5 3.3H9.47c-4.95 0-7.45-6.655-4-10.355L309.15 41.155c1.45-1.99 3.85-3.255 6.4-3.255h187.15z" />
        </svg>
      ),
      label: "Bandcamp",
    },
  ];

  return (
    <>
      {SOCIAL_LINKS.map((link) => (
        <TooltipProvider key={link.href} delayDuration={200}>
          <Tooltip>
            <TooltipTrigger className="hover:scale-110 transition">
              <Link
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-emerald-100"
              >
                {link.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">{link.label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
};

export default SocialLinks;
