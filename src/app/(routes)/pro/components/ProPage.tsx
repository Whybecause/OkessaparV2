import { Download } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function ProPage() {
  return (
    <div className="flex flex-col space-y-4">
      <a
        href="/api/pro-files/fiche-technique-okessapar.pdf"
        className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer"
      >
        <Download />
        Fiche technique Okessapar
      </a>
      <Separator />

      <a
        href="/api/pro-files/rider-okessapar.pdf"
        className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer"
      >
        <Download />
        Rider Okessapar
      </a>
    </div>
  );
}
