import { PanelBg, StyledCalcBtn } from "./style";
import { Inter } from "next/font/google";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { performCalculation, updateSign } from "../../redux/slices/mainSlice";
import { SignT } from "@/types";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const signs = "/х-+";

const SignsPanel = () => {
  const switchState = useAppSelector((state) => state.main.switchState);
  const isCalculated = useAppSelector((state) => state.main.isCalculated);
  const dispatch = useAppDispatch();

  const handleClick = (text: string) => () => {
    if (!isCalculated) {
      dispatch(performCalculation());
    }

    dispatch(updateSign(text as SignT));
  };

  return (
    <PanelBg height={56}>
      {signs.split("").map((text, i) => (
        <StyledCalcBtn
          key={i}
          width={52}
          className={inter.className}
          onClick={handleClick(text)}
          state={switchState}
        >
          {text}
        </StyledCalcBtn>
      ))}
    </PanelBg>
  );
};

export default SignsPanel;
