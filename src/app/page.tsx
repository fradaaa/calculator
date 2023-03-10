"use client";

import {
  ButtonsPanel,
  DropArea,
  EqualsBtn,
  Result,
  SignsPanel,
  SwitchState,
} from "./components";
import { LeftSideWrapper, StyledMain } from "./components/style";

export default function Home() {
  return (
    <StyledMain>
      <div></div>
      <SwitchState />
      <LeftSideWrapper>
        <Result />
        <SignsPanel />
        <ButtonsPanel />
        <EqualsBtn />
      </LeftSideWrapper>
      <DropArea />
    </StyledMain>
  );
}
