import { SignT } from "@/types";
import { Inter } from "next/font/google";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateSign } from "../../redux/slices/mainSlice";
import { PanelBg, StyledCalcBtn } from "./style";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const signs = "/х-+";

const SignsPanel = () => {
  const switchState = useAppSelector((state) => state.main.switchState);
  const dispatch = useAppDispatch();

  return (
    <PanelBg height={56}>
      {signs.split("").map((text, i) => (
        <StyledCalcBtn
          key={i}
          width={52}
          className={inter.className}
          onClick={() => dispatch(updateSign(text as SignT))}
          state={switchState}
        >
          {text}
        </StyledCalcBtn>
      ))}
    </PanelBg>
  );
};

export default SignsPanel;
