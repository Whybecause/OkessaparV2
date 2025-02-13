import { useDroppable } from "@dnd-kit/core";

const Droppable = ({
  children,
  id,
  styleOnDrag,
  isSelf,
  className = "",
}: {
  children: React.ReactNode;
  id: number;
  styleOnDrag: object;
  isSelf: boolean;
  className?: string;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const cond = isOver && !isSelf ? styleOnDrag : undefined;

  return (
    <div ref={setNodeRef} className={className} style={cond}>
      {children}
    </div>
  );
}

export default Droppable;
