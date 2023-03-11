"use client";

import { DragArea, DropArea, SwitchPanel } from "./components";
import { StyledMain } from "./components/style";
import { useAppSelector } from "./redux/hooks";

export default function Home() {
  const switchState = useAppSelector((state) => state.main.switchState);

  return (
    <StyledMain>
      <div></div>
      <SwitchPanel />
      {switchState === "constructor" ? <DragArea /> : <div></div>}
      <DropArea />
    </StyledMain>
  );
}
