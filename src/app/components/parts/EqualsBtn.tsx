import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { performCalculation } from "../../redux/slices/mainSlice";
import { PanelBg, StyledCalcBtn } from "./style";

const EqualsBtn = () => {
  const switchState = useAppSelector((state) => state.main.switchState);
  const dispatch = useAppDispatch();

  return (
    <PanelBg height={72}>
      <StyledCalcBtn
        bg="#5D5FEF"
        color="#fff"
        width={232}
        height={64}
        style={{ border: "none" }}
        onClick={() => dispatch(performCalculation())}
        state={switchState}
      >
        =
      </StyledCalcBtn>
    </PanelBg>
  );
};

export default EqualsBtn;
