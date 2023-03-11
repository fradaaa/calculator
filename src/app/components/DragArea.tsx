import { SectionT } from "@/types";
import DragAreaItem from "./DragAreaItem";
import { DigitsPanel, EqualsBtn, Result, SignsPanel } from "./parts";
import { DragAreaWrapper } from "./style";

const components: { [k in SectionT]: () => JSX.Element } = {
  result: Result,
  signs: SignsPanel,
  buttons: DigitsPanel,
  equals: EqualsBtn,
};

const DragArea = () => {
  return (
    <DragAreaWrapper>
      {Object.entries(components).map(([section, Component], i) => (
        <DragAreaItem key={i} index={i} section={section as SectionT}>
          <Component />
        </DragAreaItem>
      ))}
    </DragAreaWrapper>
  );
};

export default DragArea;
