import { DragItemT, SectionT } from "@/types";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { moveSection, removeSection } from "../redux/slices/mainSlice";
import { DigitsPanel, EqualsBtn, Result, SignsPanel } from "./parts";

const components: { [k in SectionT]: () => JSX.Element } = {
  result: Result,
  signs: SignsPanel,
  buttons: DigitsPanel,
  equals: EqualsBtn,
};

type DragWrapperP = {
  section: SectionT;
  index: number;
  children?: React.ReactNode;
};

const Reorder = ({ section, index }: DragWrapperP) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState<number | null>(null);
  const switchState = useAppSelector((state) => state.main.switchState);
  const dispatch = useAppDispatch();

  const Section = components[section];

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "section",
    hover(item: DragItemT) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      setDropPos(-6);
    },
    drop: (item) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(moveSection({ dragIndex, hoverIndex, section: item.section }));

      item.index = hoverIndex;
    },
    canDrop: (item) => item.section !== section,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const [, drag] = useDrag({
    type: "section",
    item: () => {
      return { section, index };
    },
    canDrag: () =>
      section === "result" ? false : switchState === "constructor",
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onDoubleClick={() => dispatch(removeSection(section))}
    >
      {isOver && dropPos && canDrop && (
        <svg
          width="250"
          height="6"
          viewBox="0 0 250 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: "-4px",
            top: dropPos,
          }}
        >
          <path
            d="M0.113249 3L3 5.88675L5.88675 3L3 0.113249L0.113249 3ZM249.887 3L247 0.113249L244.113 3L247 5.88675L249.887 3ZM3 3.5H247V2.5H3V3.5Z"
            fill="#5D5FEF"
          />
        </svg>
      )}
      <Section />
    </div>
  );
};

export default Reorder;
