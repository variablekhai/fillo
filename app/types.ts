export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FieldDefinition {
  id: string;
  name: string;
  pageIndex: number; // 0-based index of the template page
  rect: BoundingBox;
  role: "text" | "date" | "day" | "week";
}

export interface PageConfig {
  id: string;
  templatePageIndex: number; // Which page from the uploaded PDF to use
  instanceId: string; // Unique ID for this specific page instance in the final document
  weekId: string; // Link back to week
}

export interface WeekConfig {
  id: string;
  label: string;
  pages: PageConfig[];
  color: string; // Styling
  startDate?: string;
  weekNumber?: number;
}

export interface AppState {
  file: File | null;
  numPages: number; // Total pages in the uploaded PDF

  // The definitions of where boxes are on the TEMPLATE
  fieldDefinitions: FieldDefinition[];

  // The structure of the FINAL PDF
  weeks: WeekConfig[];
  activeWeekId: string | null;

  // The data to fill
  fieldValues: Record<string, string>; // Key: `${pageInstanceId}:${fieldId}` -> Value

  setFile: (file: File) => void;
  setNumPages: (num: number) => void;
  addFieldDefinition: (def: FieldDefinition) => void;
  updateFieldDefinition: (
    id: string,
    updates: Partial<FieldDefinition>,
  ) => void;
  removeFieldDefinition: (id: string) => void;

  setActiveWeek: (id: string | null) => void;
  addWeek: () => void;
  duplicateWeek: (weekId: string) => void;
  removeWeek: (weekId: string) => void;
  addPageToWeek: (weekId: string, templatePageIndex: number) => string;
  removePageFromWeek: (weekId: string, instanceId: string) => void;
  updateWeek: (weekId: string, updates: Partial<WeekConfig>) => void;

  updateFieldValue: (
    pageInstanceId: string,
    fieldId: string,
    value: string,
  ) => void;

  mode: "setup" | "entry";
  setMode: (mode: "setup" | "entry") => void;
}
