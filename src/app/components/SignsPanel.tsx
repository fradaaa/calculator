import { PanelBg, StyledCalcBtn } from "./style";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const signs = "/х-+";

const SignsPanel = () => {
  return (
    <PanelBg height={56}>
      {signs.split("").map((text, i) => (
        <StyledCalcBtn key={i} width={52} className={inter.className}>
          {text}
        </StyledCalcBtn>
      ))}
    </PanelBg>
  );
};

export default SignsPanel;
