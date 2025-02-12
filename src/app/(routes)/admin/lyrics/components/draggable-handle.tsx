import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";

const  DraggableHandle = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <Button
      size="icon"
      variant="ghost"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ cursor: "grab" }}
      onClick={(e) => e.preventDefault()} // Évite de trigger un clic accidentel
    >
      <GripVertical />
    </Button>
  );
}

export default DraggableHandle;
