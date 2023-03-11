import { PanelBg, ResultInner, ResultText } from "./style";
import { Inter } from "next/font/google";
import { useAppSelector } from "../../redux/hooks";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const getFontSize = (c: number): React.CSSProperties => {
  const rFactor = 1.468599033816425;
  const width = 216;
  const ratio = width / c;
  const calcSize = ratio * rFactor;
  const defaultSize = 36;
  const fontSize = calcSize > defaultSize ? defaultSize : calcSize;

  return {
    fontSize: `${fontSize}px`,
  };
};

const Result = () => {
  const result = useAppSelector((state) => state.main.displayData);
  const error = useAppSelector((state) => state.main.error);

  /* const transformString = (str: string, limit: number = 16) => {
    const [int, dec] = str.split(",");

    if (!dec) return int;

    return int + "." + dec; + dec.substring(0, limit - int.length);
  }; */

  const text = result.replace(".", ",");
  const style = getFontSize(error ? error.length : text.length);

  return (
    <PanelBg height={60}>
      <ResultInner>
        <ResultText className={inter.className} style={style}>
          {error ? error : text}
        </ResultText>
      </ResultInner>
    </PanelBg>
  );
};

export default Result;
