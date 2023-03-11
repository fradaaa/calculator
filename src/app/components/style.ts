import styled from "@emotion/styled";

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

type DropAreaWrapperT = {
  isStarted: boolean;
  isOver: boolean;
};

export const DropAreaWrapper = styled.div<DropAreaWrapperT>`
  display: flex;
  flex-flow: column;
  align-items: stretch;
  gap: 12px;
  border: ${({ isStarted }) => (isStarted ? "none" : "2px dashed #c4c4c4")};
  border-radius: 6px;
  background: ${({ isOver }) => (isOver ? "#F0F9FF" : "")};
`;

export const DropAreaInfo = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
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
  canDrag: boolean;
};

export const StyledDragWrapper = styled.div<StyledDragWrapperP>`
  ${({ isDragging, canDrag }) => ({
    opacity: isDragging || !canDrag ? 0.5 : 1,
  })};
`;
