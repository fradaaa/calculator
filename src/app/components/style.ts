import styled from "@emotion/styled";

export const SwitchContainer = styled.div`
  display: flex;
  padding: 1px;
  width: 100%;
  background: #f3f4f6;
  border-radius: 6px;
`;

type SwitchButtonP = {
  text?: string;
  selected?: boolean;
  width: number;
};

export const SwitchButton = styled.button<SwitchButtonP>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  border-radius: 5px;
  padding: 8px 12px;
  gap: 10px;
  font-weight: 500;
  color: #4d5562;
  font-size: 14px;
  line-height: 15px;
  ${({ width, selected }) => ({
    width: `${width}px`,
    background: selected ? "#fff" : "#F3F4F6",
    border: selected ? "1px solid #e2e3e5" : "none",
  })}
`;

export const StyledMain = styled.main`
  display: grid;
  grid-template-columns: 240px 243px;
  grid-template-rows: 38px 448px;
  row-gap: 30px;
  column-gap: 56px;
`;

export const DragAreaWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;
`;

type PaneBgP = {
  height: number;
};

export const PanelBg = styled.div<PaneBgP>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: ${({ height }) => `${height}px`};
  gap: 8px;
  padding: 4px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const ResultInner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  height: 52px;
  background: #f3f4f6;
  width: 100%;
  padding: 4px 8px;
`;

export const ResultText = styled.p`
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  text-align: right;
  color: #111827;
  margin: 0;
`;

type StyledCalcBtnP = {
  width?: number;
  height?: number;
  bg?: string;
  color?: string;
};

export const StyledCalcBtn = styled.button<StyledCalcBtnP>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: ${({ width }) => (width ? `${width}px` : "72px")};
  height: ${({ height }) => (height ? `${height}px` : "48px")};
  background: ${({ bg }) => (bg ? bg : "#fff")};
  border: 1px solid #e2e3e5;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  ${({ color }) => (color ? color : "#000")}
  text-align: center;
`;

export const DropAreaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #c4c4c4;
  border-radius: 6px;
`;

export const DropAreaInfo = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

export const DropText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #5d5fef;
  margin: 0;
`;

export const DropSubText = styled.p`
  width: 130px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #6b7280;
  margin: -8px 0 0;
`;

type StyledDragWrapperP = {
  isDragging: boolean;
};

export const StyledDragWrapper = styled.div<StyledDragWrapperP>`
  ${({ isDragging }) => ({
    opacity: isDragging ? 0.5 : 1,
  })};
`;
