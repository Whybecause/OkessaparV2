import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center w-full">
    <Loader2 className="w-10 h-10 animate-spin text-gray-500 text-muted-foreground" />
  </div>
  )
}

export default Spinner;
