import { PanelBg, StyledCalcBtn } from "./style";

const EqualsBtn = () => {
  return (
    <PanelBg height={72}>
      <StyledCalcBtn
        bg="#5D5FEF"
        color="#fff"
        width={232}
        height={64}
        style={{ border: "none" }}
      >
        =
      </StyledCalcBtn>
    </PanelBg>
  );
};

export default EqualsBtn;
