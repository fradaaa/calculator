import { PanelBg, ResultInner, ResultText } from "./style";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const Result = () => {
  return (
    <PanelBg height={60}>
      <ResultInner>
        <ResultText className={inter.className}>0</ResultText>
      </ResultInner>
    </PanelBg>
  );
};

export default Result;
