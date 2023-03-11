import { DragItemT } from "@/types";
import { Inter } from "next/font/google";
import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateConstructorState } from "../redux/slices/mainSlice";
import Reorder from "./Reorder";
import { DropAreaInfo, DropAreaWrapper, DropSubText, DropText } from "./style";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const DropArea = () => {
  const constructorOrder = useAppSelector(
    (state) => state.main.constructorState
  );
  const dispatch = useAppDispatch();

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "section",
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
      canDrop: () => constructorOrder.length < 4,
      drop: (item: DragItemT) => {
        dispatch(updateConstructorState(item));
      },
    }),
    [constructorOrder]
  );

  const isStarted = constructorOrder.length > 0;
  const highlightDrop = isStarted && canDrop && isOver;

  return (
    <DropAreaWrapper isStarted={isStarted} isOver={!isStarted && isOver}>
      <>
        {constructorOrder.map((section, i) => (
          <Reorder key={i} index={i} section={section} />
        ))}
      </>
      <div
        ref={drop}
        style={{
          display: "flex",
          flexFlow: "column",
          height: "100%",
          position: "relative",
        }}
      >
        {highlightDrop && (
          <svg
            width="250"
            height="6"
            viewBox="0 0 250 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", top: "-6px", left: "-4px" }}
          >
            <path
              d="M0.113249 3L3 5.88675L5.88675 3L3 0.113249L0.113249 3ZM249.887 3L247 0.113249L244.113 3L247 5.88675L249.887 3ZM3 3.5H247V2.5H3V3.5Z"
              fill="#5D5FEF"
            />
          </svg>
        )}
        {!isStarted && (
          <DropAreaInfo>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7778 1V5.44444"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M21 3.22222L16.5556 3.22222"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12.3889 3.22222H5C2.79086 3.22222 1 5.01309 1 7.22223V16.2778M18.7778 9.61111V17C18.7778 19.2091 16.9869 21 14.7778 21H5C2.79086 21 1 19.2091 1 17V16.2778M1 16.2778L4.83824 12.4395C6.40034 10.8774 8.93298 10.8774 10.4951 12.4395C11.8961 13.8406 13.5664 15.5108 14.8889 16.8333"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18.7778 14.6111L18.2729 14.1062C16.7108 12.5441 14.1781 12.5441 12.616 14.1062L12.3889 14.3333"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12.1111" cy="7.66667" r="0.555556" fill="black" />
            </svg>
            <DropText className={inter.className}>Перетащите сюда</DropText>
            <DropSubText className={inter.className}>
              любой элемент из левой панели
            </DropSubText>
          </DropAreaInfo>
        )}
      </div>
    </DropAreaWrapper>
  );
};

export default DropArea;
