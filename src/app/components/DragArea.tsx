import { SectionT } from "@/types";
import ButtonsPanel from "./ButtonsPanel";
import DragWrapper from "./DragWrapper";
import EqualsBtn from "./EqualsBtn";
import Result from "./Result";
import SignsPanel from "./SignsPanel";
import { DragAreaWrapper } from "./style";

const components: { [k in SectionT]: () => JSX.Element } = {
  result: Result,
  signs: SignsPanel,
  buttons: ButtonsPanel,
  equals: EqualsBtn,
};

const DragArea = () => {
  return (
    <DragAreaWrapper>
      {Object.values(components).map((Component, i) => (
        <DragWrapper key={i}>
          <Component />
        </DragWrapper>
      ))}
    </DragAreaWrapper>
  );
};

export default DragArea;
