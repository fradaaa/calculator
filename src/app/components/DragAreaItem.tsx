import { SectionT } from "@/types";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../redux/hooks";
import { StyledDragWrapper } from "./style";

type DragWrapperP = {
  section: SectionT;
  index: number;
  children: React.ReactNode;
};

const DragAreaItem = ({ section, index, children }: DragWrapperP) => {
  const constructorState = useAppSelector(
    (state) => state.main.constructorState
  );
  const [isDraggable, setIsDraggable] = useState(
    !constructorState.includes(section)
  );

  useEffect(() => {
    setIsDraggable(!constructorState.includes(section));
  }, [constructorState, section]);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "section",
      item: {
        section,
        index: index + 4,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      canDrag: () => isDraggable,
    }),
    [isDraggable, constructorState]
  );

  return (
    <StyledDragWrapper ref={drag} isDragging={isDragging} canDrag={isDraggable}>
      {children}
    </StyledDragWrapper>
  );
};

export default DragAreaItem;
