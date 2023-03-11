import { DragItemT, MoveItemT, SectionT, SignT, SwitchStateT } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const signsActions: { [k in SignT]: (a: string, b: string) => number } = {
  "+": (a, b) => parseFloat(a) + parseFloat(b),
  "-": (a, b) => parseFloat(a) - parseFloat(b),
  "/": (a, b) => parseFloat(a) / parseFloat(b),
  х: (a, b) => parseFloat(a) * parseFloat(b),
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
      if ((newNumber.match(/,/g) || []).length > 1) return;

      if (state.displayData === "0" || state.sign !== "") {
        if (state.isNewNumber && action.payload !== ",") {
          state.displayData = action.payload;
          state.isNewNumber = false;
        } else {
          state.displayData += action.payload;
        }
        state.curResult = state.displayData;
      } else {
        state.displayData += action.payload;
      }

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
      const a = state.prevResult.replace(",", ".");
      const b = state.curResult.replace(",", ".");
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
