import { PanelBg, StyledCalcBtn } from "./style";
import { Inter } from "next/font/google";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateNumber } from "../../redux/slices/mainSlice";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const buttons = "7894561230,";

const DigitsPanel = () => {
  const switchState = useAppSelector((state) => state.main.switchState);
  const dispatch = useAppDispatch();

  return (
    <PanelBg height={224}>
      {buttons.split("").map((text, i) => (
        <StyledCalcBtn
          key={i}
          width={text === "0" ? 152 : undefined}
          className={inter.className}
          onClick={() => dispatch(updateNumber(text))}
          state={switchState}
        >
          {text}
        </StyledCalcBtn>
      ))}
    </PanelBg>
  );
};

export default DigitsPanel;
