export type SectionT = "result" | "signs" | "buttons" | "equals";
export type SwitchStateT = "runtime" | "constructor";
export type SignT = "+" | "-" | "х" | "/" | "";

export type DragItemT = {
  section: SectionT;
  index: number;
};

export type MoveItemT = {
  dragIndex: number;
  hoverIndex: number;
  section: SectionT;
};
