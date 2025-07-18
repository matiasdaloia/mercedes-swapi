import type { ColumnDef } from "@tanstack/react-table";
import { getGenderIcon } from "./utils";
import { ArrowUpDown, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import type { Person, SortField, SortOrder } from "@/services/people/types";

interface ColumnContext {
  onSortChange?: (field: SortField) => void;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

export const createColumns = (context: ColumnContext): ColumnDef<Person>[] => [
  {
    accessorKey: "name",
    header: () => {
      const isActive = context.sortBy === "name";
      const Icon = isActive
        ? context.sortOrder === "asc"
          ? ArrowUp
          : ArrowDown
        : ArrowUpDown;

      return (
        <Button
          variant="link"
          onClick={() => context.onSortChange?.("name")}
          className="h-auto p-0 font-medium"
        >
          Name
          <Icon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "height",
    header: "Height",
    cell: ({ row }) => {
      const height = row.original.height;
      return <span className="text-slate-300">{height} cm</span>;
    },
  },
  {
    accessorKey: "mass",
    header: "Mass",
    cell: ({ row }) => {
      const mass = row.original.mass;
      return <span className="text-slate-300">{mass} kg</span>;
    },
  },
  {
    accessorKey: "hair_color",
    header: "Hair",
    cell: ({ row }) => {
      const hairColor = row.original.hair_color;
      return <span className="text-slate-300 capitalize">{hairColor}</span>;
    },
  },
  {
    accessorKey: "skin_color",
    header: "Skin",
    cell: ({ row }) => {
      const skinColor = row.original.skin_color;
      return <span className="text-slate-300 capitalize">{skinColor}</span>;
    },
  },
  {
    accessorKey: "eye_color",
    header: "Eyes",
    cell: ({ row }) => {
      const eyeColor = row.original.eye_color;
      return <span className="text-slate-300 capitalize">{eyeColor}</span>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.gender;
      return (
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getGenderIcon(gender)}</span>
          <span className="text-slate-300 capitalize">{gender}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "birth_year",
    header: "Birth Year",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-purple-400" />
          <span className="text-slate-300">{row.original.birth_year}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created",
    header: () => {
      const isActive = context.sortBy === "created";
      const Icon = isActive
        ? context.sortOrder === "asc"
          ? ArrowUp
          : ArrowDown
        : ArrowUpDown;

      return (
        <Button
          variant="link"
          onClick={() => context.onSortChange?.("created")}
          className="h-auto p-0 font-medium"
        >
          Created
          <Icon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.created);
      return date.toLocaleDateString();
    },
  },
];

// Export a default columns array for backward compatibility
export const columns: ColumnDef<Person>[] = createColumns({});
