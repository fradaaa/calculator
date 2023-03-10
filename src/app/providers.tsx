"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "../app/redux/store";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </Provider>
  );
};
