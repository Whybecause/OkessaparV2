import { useDroppable } from "@dnd-kit/core";

const Droppable = ({
  children,
  id,
  style,
  isSelf,
}: {
  children: React.ReactNode;
  id: number;
  style: object;
  isSelf: boolean;
}) => {
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

export default Droppable;
