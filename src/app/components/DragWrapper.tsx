import { useDrag } from "react-dnd";
import { StyledDragWrapper } from "./style";

type DragWrapperP = {
  children: React.ReactNode;
};

const DragWrapper = ({ children }: DragWrapperP) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "section",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <StyledDragWrapper ref={drag} isDragging={isDragging}>
      {children}
    </StyledDragWrapper>
  );
};

export default DragWrapper;
