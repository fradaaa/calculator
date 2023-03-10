import { SectionT, SwitchStateT } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

type State = {
  switchState: SwitchStateT;
  constructorState: Array<SectionT>;
};

const initialState: State = {
  switchState: "runtime",
  constructorState: ["result", "signs", "buttons", "equals"],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateSwitchState: (state, action: PayloadAction<SwitchStateT>) => {
      state.switchState = action.payload;
    },
    moveSection: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const {
        payload: { dragIndex, hoverIndex },
      } = action;
      const prevSection = state.constructorState[dragIndex];
      state.constructorState.splice(dragIndex, 1);
      state.constructorState.splice(hoverIndex, 0, prevSection);
    },
  },
});

export const { updateSwitchState, moveSection } = mainSlice.actions;

export default mainSlice.reducer;
