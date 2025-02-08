import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";

const SocialLinks = () => {
  const SOCIAL_LINKS = [
    { href: "https://www.instagram.com/okessapar", icon: <Instagram /> },
    {
      href: "https://www.youtube.com/channel/UCjeEtfJO2NhwegNFxcvb7bw",
      icon: <Youtube />,
    },
    { href: "https://www.facebook.com/okessapar/", icon: <Facebook /> },
  ];

  return (
    <>
      {SOCIAL_LINKS.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.icon}
        </Link>
      ))}
    </>
  );
};

export default SocialLinks;
