import { SectionT } from "@/types";
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
  const {} = constructorState;

  const [{ isDragging, canDrag }, drag] = useDrag(
    () => ({
      type: "section",
      item: {
        section,
        index: index + 4,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        canDrag: !!monitor.canDrag(),
      }),
      canDrag: () => !constructorState.includes(section),
    }),
    [constructorState, section]
  );

  return (
    <StyledDragWrapper ref={drag} isDragging={isDragging} canDrag={canDrag}>
      {children}
    </StyledDragWrapper>
  );
};

export default DragAreaItem;
