"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DndContext, DragOverEvent } from "@dnd-kit/core";

import LyricItem from "../../lyrics/components/lyric-item";
import NoResults from "../../../../components/no-results";
import Droppable from "./components/droppable";
import DraggableHandle from "./components/draggable-handle";
import Spinner from "@/components/ui/spinner";
import { handleErrorClient } from "@/utils/handleErrorClient";
import { LyricProps } from "@/app/api/lyrics/route";
import AddLyrics from "./components/add-lyrics";

const LyricsDashboard = () => {
  const [lyrics, setLyrics] = useState<LyricProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [style, setStyle] = useState({});
  const [isSelf, setIsSelf] = useState(false);
  const [dragged, setDragged] = useState(false);

  // Fetch lyrics data
  useEffect(() => {
    const getLyrics = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/lyrics");
        setLyrics(response.data);
      } catch (error) {
        console.error(error);
        handleErrorClient(error);
      } finally {
        setIsLoading(false);
      }
    };

    getLyrics();
  }, []);

  // Save new order in DB after drag and drop
  useEffect(() => {
    if (dragged) {
      const updateLyrics = async () => {
        try {
          await axios.patch("/api/lyrics", lyrics);
          toast.success("Placement modifié");
          setDragged(false);
        } catch (error) {
          handleErrorClient(error);
        }
      };

      updateLyrics();
    }
  }, [dragged, lyrics]);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    const draggedItem = lyrics.find((lyric) => lyric.id === active.id);

    if (!draggedItem) return;

    const targetOrder = Number(over.id);
    const draggedOrder = draggedItem.order;

    setIsSelf(targetOrder === draggedOrder);

    if (draggedOrder && targetOrder < draggedOrder) {
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
    setDragged(true);
  };

  return (
    <>
      <div className="pt-6 pb-8 relative flex flex-col md:flex-row items-center border-b border-gray-300">
        <h1 className="text-center md:absolute md:left-1/2 transform md:-translate-x-1/2">
          Lyrics Dashboard
        </h1>
        <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
          <AddLyrics setLyrics={setLyrics} />
        </div>
      </div>

      {isLoading && <Spinner />}

      {!isLoading && lyrics.length === 0 && (
        <NoResults message={"Aucun lyrics enregistrés."} />
      )}

      <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        {lyrics.map((lyric) => (
          <Droppable
            key={lyric.id}
            id={lyric.order}
            style={style}
            isSelf={isSelf}
          >
            <LyricItem data={lyric} href={"/admin/lyrics"}>
              <div className="ml-auto">
                <DraggableHandle id={lyric.id!} />
              </div>
            </LyricItem>
          </Droppable>
        ))}
      </DndContext>
    </>
  );
};

export default LyricsDashboard;
