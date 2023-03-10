import { SectionT } from "@/types";
import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { moveSection } from "../redux/slices/mainSlice";
import ButtonsPanel from "./ButtonsPanel";
import EqualsBtn from "./EqualsBtn";
import Result from "./Result";
import SignsPanel from "./SignsPanel";

const components: { [k in SectionT]: () => JSX.Element } = {
  result: Result,
  signs: SignsPanel,
  buttons: ButtonsPanel,
  equals: EqualsBtn,
};

type DragWrapperP = {
  section: SectionT;
  index: number;
  children?: React.ReactNode;
};

const Reorder = ({ section, index, children }: DragWrapperP) => {
  const ref = useRef<HTMLDivElement>(null);
  const switchState = useAppSelector((state) => state.main.switchState);
  const dispatch = useAppDispatch();

  const Section = components[section];

  const [, drop] = useDrop({
    accept: "section",
    hover(item: { section: SectionT; index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      console.log(hoverClientY);

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      dispatch(moveSection({ dragIndex, hoverIndex }));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "section",
    item: () => {
      return { section, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => switchState === "constructor",
  });

  drag(drop(ref));

  return (
    <div ref={ref}>
      <Section />
    </div>
  );
};

export default Reorder;
