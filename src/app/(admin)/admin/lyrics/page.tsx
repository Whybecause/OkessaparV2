"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DndContext, DragOverEvent } from "@dnd-kit/core";

import Droppable from "./components/droppable";
import DraggableHandle from "./components/draggable-handle";
import { handleErrorClient } from "@/utils/error-front";
import { LyricProps } from "@/app/api/lyrics/route";
import AddLyrics from "./components/add-lyrics";
import Link from "next/link";
import EditLyric from "./components/edit-lyric";
import DeleteLyric from "./components/delete-lyric";
import MotionDiv from "@/components/motion-div";
import { useData } from "@/hooks/use-data";
import AsyncData from "@/components/async-data";

const LyricsDashboard = () => {
  const [lyrics, setLyrics] = useState<LyricProps[]>([]);
  const [style, setStyle] = useState({});
  const [isSelf, setIsSelf] = useState(false);
  const [dragged, setDragged] = useState(false);

  // Fetch lyrics data
  const { data, isLoading, error } = useData("/api/lyrics");

  useEffect(() => {
    if (data) {
      setLyrics(data as LyricProps[]);
    }
  }, [data]);

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
      setStyle({
        borderTop: "5px solid rgb(110 231 183 / var(--tw-text-opacity, 1))",
      });
    } else {
      setStyle({
        borderBottom: "5px solid rgb(110 231 183 / var(--tw-text-opacity, 1))",
      });
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
          Lyrics
        </h1>
        <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
          <AddLyrics setLyrics={setLyrics} />
        </div>
      </div>
      <AsyncData
        data={lyrics}
        isLoading={isLoading}
        error={error}
        noResultMessage={"Aucun lyrics enregistrés"}
      >
        <MotionDiv>
          <ul className="w-full flex flex-col items-center gap-2 mt-4">
            <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
              {lyrics.length > 0 &&
                lyrics.map((lyric) => (
                  <Droppable
                    key={lyric.id}
                    id={lyric.order}
                    styleOnDrag={style}
                    isSelf={isSelf}
                    className={
                      "w-full relative max-w-md border rounded-md bg-gray-900/50 p-2"
                    }
                  >
                    <li key={lyric.id} className="flex justify-between w-full">
                      <div className="flex items-center gap-2">
                        <DraggableHandle
                          className="text-gray-500"
                          id={lyric.id!}
                        />
                        <Link
                          href={`/admin/lyrics/${lyric.slug}`}
                          aria-label="Accéder aux paroles"
                          className="text-white truncate w-[200px]"
                        >
                          {lyric.songName}
                        </Link>
                      </div>

                      <div className="flex items-center gap-2">
                        {lyric && (
                          <EditLyric data={lyric} setLyrics={setLyrics} />
                        )}
                        <DeleteLyric
                          id={lyric.id}
                          songName={lyric.songName}
                          setLyrics={setLyrics}
                        />
                      </div>
                    </li>
                  </Droppable>
                ))}
            </DndContext>
          </ul>
        </MotionDiv>
      </AsyncData>
    </>
  );
};

export default LyricsDashboard;
