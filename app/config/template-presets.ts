import { FieldDefinition } from "../types";
import { v4 as uuidv4 } from "uuid";

export const UMPSA_PRESET_FIELDS: FieldDefinition[] = [
  {
    name: "Date",
    pageIndex: 2,
    rect: {
      x: 115.5,
      y: 100,
      width: 92,
      height: 15,
    },
    role: "date",
    id: uuidv4(),
  },
  {
    name: "Day",
    pageIndex: 2,
    rect: {
      x: 248.5,
      y: 100,
      width: 107,
      height: 15,
    },
    role: "day",
    id: uuidv4(),
  },
  {
    name: "Week Number",
    pageIndex: 2,
    rect: {
      x: 430.5,
      y: 100,
      width: 16,
      height: 15,
    },
    role: "week",
    id: uuidv4(),
  },
  {
    name: "Activity",
    pageIndex: 2,
    rect: {
      x: 71.5,
      y: 184.2,
      width: 479,
      height: 500,
    },
    role: "text",
    id: uuidv4(),
  },
  {
    name: "Week Number",
    pageIndex: 8,
    rect: {
      x: 284.5,
      y: 87.4,
      width: 22,
      height: 12,
    },
    role: "week",
    id: uuidv4(),
  },
  {
    name: "Date",
    pageIndex: 8,
    rect: {
      x: 332.5,
      y: 82,
      width: 106,
      height: 15,
    },
    role: "date",
    id: uuidv4(),
  },
  {
    name: "Work Details",
    pageIndex: 8,
    rect: {
      x: 66.5,
      y: 146,
      width: 85,
      height: 283,
    },
    role: "text",
    id: uuidv4(),
  },
  {
    name: "What did I learn",
    pageIndex: 8,
    rect: {
      x: 161.5,
      y: 146,
      width: 132,
      height: 283,
    },
    role: "text",
    id: uuidv4(),
  },
  {
    name: "How does this relate",
    pageIndex: 8,
    rect: {
      x: 302.5,
      y: 146,
      width: 254,
      height: 283,
    },
    role: "text",
    id: uuidv4(),
  },
  {
    name: "Date",
    pageIndex: 8,
    rect: {
      x: 95.5,
      y: 610,
      width: 85,
      height: 14,
    },
    role: "date",
    id: uuidv4(),
  },
  {
    name: "Week Number",
    pageIndex: 8,
    rect: {
      x: 140,
      y: 750.1,
      width: 16,
      height: 12,
    },
    role: "week",
    id: uuidv4(),
  },
];
