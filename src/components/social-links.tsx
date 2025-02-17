import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";

const SocialLinks = () => {
  const SOCIAL_LINKS = [
    { href: "https://www.instagram.com/okessapar", icon: <Instagram />, label: "Instagram" },
    {
      href: "https://www.youtube.com/channel/UCjeEtfJO2NhwegNFxcvb7bw",
      icon: <Youtube />,
      label: "Youtube"
    },
    { href: "https://www.facebook.com/okessapar/", icon: <Facebook />, label: "Facebook" },
  ];

  return (
    <>
      {SOCIAL_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          {link.icon}
        </Link>
      ))}
    </>
  );
};

export default SocialLinks;
