"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragOverEvent,
} from "@dnd-kit/core";
import Link from "next/link";
import { GripVertical } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import { Lyrics } from "@/app/api/lyrics/route";
import { Button } from "@/components/ui/button";
import { handleErrorClient } from "@/utils/handleErrorClient";
import { useUser } from "@/hooks/use-user";

function DraggableHandle({ id }: { id: string }) {
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

function Droppable({
  children,
  id,
  style,
  isSelf,
}: {
  children: React.ReactNode;
  id: number;
  style: object;
  isSelf: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const cond = isOver && !isSelf ? style : undefined;

  return (
    <div ref={setNodeRef} style={cond}>
      {children}
    </div>
  );
}

const LyricsList = ({ data }: { data: Lyrics[] }) => {
  const { user } = useUser();
  const [lyrics, setLyrics] = useState(data);
  const [style, setStyle] = useState({});
  const [isSelf, setIsSelf] = useState(false);

  // Get the data into local state
  useEffect(() => {
    setLyrics(data);
  }, [data]);

  // Save new order in DB after drag and drop
  useEffect(() => {
    const updateLyrics = async () => {
      const areArraysEqual = JSON.stringify(data) === JSON.stringify(lyrics);
      if (areArraysEqual) return;

      try {
        await axios.patch("/api/lyrics", lyrics);
        toast.success('Placement modifié');
      } catch (error) {
        handleErrorClient(error);
      }
    };
    updateLyrics();
  }, [lyrics, data]);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    const draggedItem = lyrics.find((lyric) => lyric.id === active.id);

    if (!draggedItem) return;

    const targetOrder = Number(over.id);
    const draggedOrder = draggedItem.order;

    setIsSelf(targetOrder === draggedOrder);

    if (targetOrder < draggedOrder) {
      setStyle({ borderTop: "1px solid white" });
    } else {
      setStyle({ borderBottom: "1px solid white" });
    }
  };

  const handleDragEnd = (event: DragOverEvent) => {
    const { over, active } = event;

    if (!over) return;

    const draggedItem = lyrics.find((lyric) => lyric.id === active.id);
    const targetItem = lyrics.find((lyric) => lyric.order === over.id);

    if (!draggedItem || !targetItem) return;

    const draggedOrder = draggedItem.order;
    const targetOrder = targetItem.order;

    // Réorganiser l'ordre des éléments en fonction de la nouvelle position
    setLyrics((prevItems) => {
      // Mettre à jour l'ordre des éléments en décalant les autres
      const updatedItems = prevItems.map((item) => {
        if (item.order === draggedOrder) {
          return { ...item, order: targetOrder };
        }

        if (targetOrder < draggedOrder) {
          // Si l'élément est déplacé vers le haut (réduire son ordre)
          if (item.order >= targetOrder && item.order < draggedOrder) {
            return { ...item, order: item.order + 1 };
          }
        } else {
          // Si l'élément est déplacé vers le bas (augmenter son ordre)
          if (item.order <= targetOrder && item.order > draggedOrder) {
            return { ...item, order: item.order - 1 };
          }
        }

        return item;
      });
      // Trier les éléments par ordre croissant
      return updatedItems.sort((a, b) => a.order - b.order);
    });
  };

  const isAdmin = !!user;

  return (
    <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      {lyrics.map((lyric) => (
        <Droppable
          key={lyric.id}
          id={lyric.order}
          style={style}
          isSelf={isSelf}
        >
          <div className="py-4 relative flex flex-row items-center">
            <Link
              href={`/lyrics/${lyric.songName}`}
              className="text-2xl underline decoration-emerald-300 transform absolute left-1/2 -translate-x-1/2"
            >
              {lyric.songName}
            </Link>
            {isAdmin && (
              <div className="ml-auto">
                <DraggableHandle id={lyric.id!} />
              </div>
            )}
          </div>
        </Droppable>
      ))}
    </DndContext>
  );
};

export default LyricsList;
