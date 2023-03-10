import { PanelBg, StyledCalcBtn } from "./style";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const buttons = "7894561230,";

const ButtonsPanel = () => {
  return (
    <PanelBg height={224}>
      {buttons.split("").map((text, i) => (
        <StyledCalcBtn
          key={i}
          width={text === "0" ? 152 : undefined}
          className={inter.className}
        >
          {text}
        </StyledCalcBtn>
      ))}
    </PanelBg>
  );
};

export default ButtonsPanel;
