import { SectionT } from "@/types";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../redux/hooks";
import { StyledDragWrapper } from "./style";

type DragWrapperP = {
  section: SectionT;
  children: React.ReactNode;
};

const DragWrapper = ({ section, children }: DragWrapperP) => {
  const switchState = useAppSelector((state) => state.main.switchState);
  const constructorOrder = useAppSelector(
    (state) => state.main.constructorState
  );

  const [{ isDragging, canDrag }, drag] = useDrag(
    () => ({
      type: "section",
      item: {
        section,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        canDrag: !!monitor.canDrag(),
      }),
      canDrag: () =>
        !constructorOrder.includes(section) ?? switchState === "constructor",
    }),
    [switchState, section]
  );

  return (
    <StyledDragWrapper ref={drag} isDragging={isDragging} canDrag={canDrag}>
      {children}
    </StyledDragWrapper>
  );
};

export default DragWrapper;
