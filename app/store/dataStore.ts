import { create } from "zustand";

interface DataState {
  values: Record<string, string>;
  setValue: (fieldId: string, value: string) => void;
  setValues: (values: Record<string, string>) => void;
  clearValues: () => void;
}

export const useDataStore = create<DataState>((set) => ({
  values: {},
  setValue: (fieldId, value) =>
    set((state) => ({
      values: { ...state.values, [fieldId]: value },
    })),
  setValues: (values) => set({ values }),
  clearValues: () => set({ values: {} }),
}));
