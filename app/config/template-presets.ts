import { FieldDefinition } from "../types";
import { v4 as uuidv4 } from "uuid";

export const UMPSA_PRESET_FIELDS: FieldDefinition[] = [
  {
    name: "Date",
    pageIndex: 2,
    rect: {
      x: 115.5,
      y: 105,
      width: 92,
      height: 14,
    },
    role: "date",
    id: uuidv4(),
  },
  {
    name: "Day",
    pageIndex: 2,
    rect: {
      x: 248.5,
      y: 104,
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
      y: 105,
      width: 16,
      height: 13,
    },
    role: "week",
    id: uuidv4(),
  },
  {
    name: "Activity",
    pageIndex: 2,
    rect: {
      x: 71.5,
      y: 184.5,
      width: 479,
      height: 201,
    },
    role: "text",
    id: uuidv4(),
  },
  {
    name: "Week Number",
    pageIndex: 8,
    rect: {
      x: 284.5,
      y: 88,
      width: 15,
      height: 14,
    },
    role: "week",
    id: uuidv4(),
  },
  {
    name: "Date",
    pageIndex: 8,
    rect: {
      x: 332.5,
      y: 89,
      width: 106,
      height: 10,
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
      y: 147,
      width: 132,
      height: 282,
    },
    role: "text",
    id: uuidv4(),
  },
  {
    name: "How does this relate",
    pageIndex: 8,
    rect: {
      x: 302.5,
      y: 148,
      width: 254,
      height: 279,
    },
    role: "text",
    id: uuidv4(),
  },
  {
    name: "Date",
    pageIndex: 8,
    rect: {
      x: 95.5,
      y: 613,
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
      x: 141.5,
      y: 752,
      width: 16,
      height: 14,
    },
    role: "week",
    id: uuidv4(),
  },
];
