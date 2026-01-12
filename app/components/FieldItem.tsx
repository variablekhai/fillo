import React from "react";
import { FieldDefinition } from "../types";
import {
  Trash2,
  Type,
  Calendar,
  CalendarDays,
  Hash,
  Pencil,
} from "lucide-react";
import { Select } from "./ui/Select";

interface FieldItemProps {
  field: FieldDefinition;
  onUpdate: (id: string, updates: Partial<FieldDefinition>) => void;
  onRemove: (id: string) => void;
}

export const FieldItem: React.FC<FieldItemProps> = ({
  field,
  onUpdate,
  onRemove,
}) => {
  const roleOptions = [
    { label: "Text", value: "text", icon: <Type size={14} /> },
    { label: "Date", value: "date", icon: <Calendar size={14} /> },
    {
      label: "Day (e.g. Monday)",
      value: "day",
      icon: <CalendarDays size={14} />,
    },
    {
      label: "Week Number (e.g. 1)",
      value: "week",
      icon: <Hash size={14} />,
    },
  ];

  return (
    <div className="group bg-white p-3 hover:shadow-md border border-gray-200 transition-all duration-200 space-y-3">
      <div className="flex gap-2 items-start">
        <div className="flex-1 space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
            Field Name
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={field.name}
              onChange={(e) => onUpdate(field.id, { name: e.target.value })}
              className="w-full text-sm font-medium text-stone-800 border border-stone-200 rounded-none px-2 py-1.5 pr-8 focus:border-fillo-500 focus:ring-1 focus:ring-fillo-500 outline-none transition-all placeholder:text-stone-300"
              placeholder="Enter name..."
            />
            <Pencil
              size={12}
              className="absolute right-2.5 text-stone-400 pointer-events-none"
            />
          </div>
        </div>
        <button
          onClick={() => onRemove(field.id)}
          className="mt-6 text-stone-300 hover:text-red-500 p-1.5 rounded-none hover:bg-red-50 transition-colors"
          title="Delete field"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Role Selector */}
      <div className="space-y-1">
        <Select
          label="Field Type"
          options={roleOptions}
          value={field.role}
          onChange={(val) => onUpdate(field.id, { role: val as any })}
        />
      </div>
    </div>
  );
};
