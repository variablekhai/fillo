import { create } from "zustand";
import { FieldDefinition } from "../types";

interface TemplateState {
  file: File | null;
  numPages: number;
  scale: number;
  fields: FieldDefinition[];
  selectedFieldId: string | null;

  setFile: (file: File | null) => void;
  setNumPages: (num: number) => void;
  setScale: (scale: number | ((prev: number) => number)) => void;

  addField: (def: Omit<FieldDefinition, "id">) => void;
  updateField: (id: string, updates: Partial<FieldDefinition>) => void;
  removeField: (id: string) => void;
  selectField: (id: string | null) => void;
  setFields: (fields: FieldDefinition[]) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  file: null,
  numPages: 0,
  scale: 1.0,
  fields: [],
  selectedFieldId: null,

  setFile: (file) =>
    set({ file, numPages: 0, fields: [], selectedFieldId: null }),
  setNumPages: (num) => set({ numPages: num }),
  setScale: (scaleOrFn) =>
    set((state) => ({
      scale:
        typeof scaleOrFn === "function" ? scaleOrFn(state.scale) : scaleOrFn,
    })),

  addField: (def) =>
    set((state) => ({
      fields: [...state.fields, { ...def, id: `field-${Date.now()}` }],
    })),

  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),

  removeField: (id) =>
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
      selectedFieldId:
        state.selectedFieldId === id ? null : state.selectedFieldId,
    })),

  selectField: (id) => set({ selectedFieldId: id }),
  setFields: (fields) => set({ fields }),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));
