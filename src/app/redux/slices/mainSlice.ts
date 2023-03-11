import { DragItemT, MoveItemT, SectionT, SignT, SwitchStateT } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Decimal from "decimal.js";

type State = {
  switchState: SwitchStateT;
  constructorState: Array<SectionT>;
  displayData: string;
  curResult: string;
  prevResult: string;
  sign: SignT;
  isNewNumber: boolean;
  isCalculated: boolean;
  error: string | null;
};

const initialState: State = {
  switchState: "constructor",
  constructorState: [],
  displayData: "0",
  curResult: "",
  prevResult: "",
  sign: "",
  isNewNumber: true,
  isCalculated: false,
  error: null,
};

const signsActions: {
  [k in SignT]: (a: number, b: number) => Decimal | number;
} = {
  "+": (a, b) => new Decimal(a).add(new Decimal(b)),
  "-": (a, b) => new Decimal(a).sub(new Decimal(b)),
  "/": (a, b) => new Decimal(a).dividedBy(new Decimal(b)),
  х: (a, b) => new Decimal(a).mul(new Decimal(b)),
  "": () => 42,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateSwitchState: (state, action: PayloadAction<SwitchStateT>) => {
      if (state.switchState === action.payload) return;

      state.switchState = action.payload;
      state.isNewNumber = true;
      state.displayData = "0";
      state.curResult = "";
      state.prevResult = "";
      state.sign = "";
      state.error = null;
      state.isCalculated = false;
    },
    updateConstructorState: (state, action: PayloadAction<DragItemT>) => {
      const { index, section } = action.payload;

      if (index < 4) {
        state.constructorState.splice(index, 1);
      }

      state.constructorState.push(section);
    },
    moveSection: (state, action: PayloadAction<MoveItemT>) => {
      const {
        payload: { dragIndex, hoverIndex, section },
      } = action;
      const prevSection = state.constructorState[dragIndex];

      if (!prevSection) {
        if (hoverIndex === 0) {
          state.constructorState.unshift(section);
        } else {
          state.constructorState.splice(hoverIndex, 0, section);
        }
      } else {
        state.constructorState.splice(dragIndex, 1);
        state.constructorState.splice(hoverIndex, 0, prevSection);
      }
    },
    removeSection: (state, action: PayloadAction<SectionT>) => {
      const index = state.constructorState.findIndex(
        (item) => item === action.payload
      );
      state.constructorState.splice(index, 1);
    },
    updateNumber: (state, action: PayloadAction<string>) => {
      if (state.displayData === "0" && action.payload === "0") return;
      if (state.displayData.length === 16) return;

      const newNumber = state.displayData + action.payload;
      if (
        (newNumber.match(/,/g) || []).length > 1 &&
        !state.isCalculated &&
        !state.sign
      )
        return;

      if (state.isNewNumber) {
        state.displayData = action.payload !== "," ? action.payload : "0,";
        state.isNewNumber = false;
      } else {
        if (state.displayData.includes(",") && action.payload === ",") return;

        state.displayData += action.payload;
      }

      state.curResult = state.displayData;

      state.isCalculated = false;
    },
    updateSign: (state, action: PayloadAction<SignT>) => {
      state.sign = action.payload;
      state.prevResult = state.displayData;
      state.isNewNumber = true;
    },
    performCalculation: (state) => {
      if (!state.prevResult) return;

      if (state.sign === "/" && state.displayData === "0") {
        state.error = "Не определено";
        return;
      }

      const calculate = signsActions[state.sign];
      const a = parseFloat(state.prevResult.replace(",", "."));
      const b = parseFloat(state.curResult.replace(",", "."));
      const res = String(calculate(a, b)).replace(".", ",");
      state.displayData = res;
      state.prevResult = res;
      state.isNewNumber = true;
      state.isCalculated = true;
    },
  },
});

export const {
  updateSwitchState,
  moveSection,
  updateNumber,
  updateSign,
  performCalculation,
  updateConstructorState,
  removeSection,
} = mainSlice.actions;

export default mainSlice.reducer;
