import { create } from "zustand";
import { AppState, FieldDefinition, PageConfig, WeekConfig } from "../types";

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

const WEEK_COLORS = [
  "bg-blue-50 border-blue-200",
  "bg-green-50 border-green-200",
  "bg-purple-50 border-purple-200",
  "bg-orange-50 border-orange-200",
  "bg-pink-50 border-pink-200",
];

export const useAppStore = create<AppState>((set) => ({
  file: null,
  numPages: 0,
  fieldDefinitions: [],
  weeks: [],
  activeWeekId: null,
  fieldValues: {},
  mode: "setup",

  setFile: (file) =>
    set({
      file,
      fieldDefinitions: [],
      weeks: [],
      numPages: 0,
      activeWeekId: null,
    }),
  setNumPages: (num) => set({ numPages: num }),

  addFieldDefinition: (def) =>
    set((state) => ({
      fieldDefinitions: [...state.fieldDefinitions, def],
    })),

  updateFieldDefinition: (id, updates) =>
    set((state) => ({
      fieldDefinitions: state.fieldDefinitions.map((f) =>
        f.id === id ? { ...f, ...updates } : f,
      ),
    })),

  removeFieldDefinition: (id) =>
    set((state) => ({
      fieldDefinitions: state.fieldDefinitions.filter((f) => f.id !== id),
    })),

  // Week Logic
  setActiveWeek: (id) => set({ activeWeekId: id }),

  addWeek: () =>
    set((state) => {
      const newWeekId = generateId();
      // Find the highest week number
      const maxWeekNum = state.weeks.reduce(
        (max, w) => Math.max(max, w.weekNumber || 0),
        0,
      );
      const nextWeekNum =
        maxWeekNum > 0 ? maxWeekNum + 1 : state.weeks.length + 1;

      return {
        weeks: [
          ...state.weeks,
          {
            id: newWeekId,
            label: `Week ${nextWeekNum}`,
            weekNumber: nextWeekNum,
            pages: [],
            color: WEEK_COLORS[state.weeks.length % WEEK_COLORS.length],
          },
        ],
        activeWeekId: newWeekId, // Auto-select new week
      };
    }),

  duplicateWeek: (weekId) =>
    set((state) => {
      const weekToClone = state.weeks.find((w) => w.id === weekId);
      if (!weekToClone) return state;

      const newWeekId = generateId();

      // Deep clone pages with new instance IDs
      const newPages = weekToClone.pages.map((p) => ({
        ...p,
        instanceId: generateId(),
        weekId: newWeekId,
      }));

      // Calculate next week number
      const maxWeekNum = state.weeks.reduce(
        (max, w) => Math.max(max, w.weekNumber || 0),
        0,
      );
      const nextWeekNum =
        maxWeekNum > 0 ? maxWeekNum + 1 : state.weeks.length + 1;

      return {
        weeks: [
          ...state.weeks,
          {
            ...weekToClone,
            id: newWeekId,
            label: `Week ${nextWeekNum}`,
            weekNumber: nextWeekNum,
            pages: newPages,
            color: WEEK_COLORS[state.weeks.length % WEEK_COLORS.length],
          },
        ],
        activeWeekId: newWeekId,
      };
    }),

  removeWeek: (weekId) =>
    set((state) => {
      const newWeeks = state.weeks.filter((w) => w.id !== weekId);
      return {
        weeks: newWeeks,
        // Select previous week or null if empty
        activeWeekId:
          newWeeks.length > 0 ? newWeeks[newWeeks.length - 1].id : null,
      };
    }),

  addPageToWeek: (weekId, templatePageIndex) => {
    const instanceId = generateId();
    set((state) => ({
      weeks: state.weeks.map((week) => {
        if (week.id === weekId) {
          return {
            ...week,
            pages: [
              ...week.pages,
              {
                id: generateId(),
                templatePageIndex,
                instanceId,
                weekId: week.id,
              },
            ],
          };
        }
        return week;
      }),
    }));
    return instanceId;
  },

  removePageFromWeek: (weekId, instanceId) =>
    set((state) => ({
      weeks: state.weeks.map((week) => {
        if (week.id === weekId) {
          return {
            ...week,
            pages: week.pages.filter((p) => p.instanceId !== instanceId),
          };
        }
        return week;
      }),
    })),

  updateWeek: (weekId, updates) =>
    set((state) => ({
      weeks: state.weeks.map((w) =>
        w.id === weekId ? { ...w, ...updates } : w,
      ),
    })),

  updateFieldValue: (pageInstanceId, fieldId, value) =>
    set((state) => ({
      fieldValues: {
        ...state.fieldValues,
        [`${pageInstanceId}:${fieldId}`]: value,
      },
    })),

  setMode: (mode) => set({ mode }),
}));
