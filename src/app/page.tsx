"use client";

import { DragArea, DropArea, SwitchState } from "./components";
import { StyledMain } from "./components/style";

export default function Home() {
  return (
    <StyledMain>
      <div></div>
      <SwitchState />
      <DragArea />
      <DropArea />
    </StyledMain>
  );
}
