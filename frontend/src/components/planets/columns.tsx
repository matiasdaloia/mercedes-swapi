import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import type { SortField, SortOrder } from "@/services/planets/types";
import type { Planet } from "@/services/planets/types";
import { formatDiameter, formatPopulation, getClimateIcon } from "./utils";

interface ColumnContext {
  onSortChange?: (field: SortField) => void;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

export const createColumns = (context: ColumnContext): ColumnDef<Planet>[] => [
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
          Planet
          <Icon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "climate",
    header: "Climate",
    cell: ({ row }) => {
      const climate = row.original.climate;
      return (
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getClimateIcon(climate)}</span>
          <span className="text-slate-300 capitalize">{climate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "terrain",
    header: "Terrain",
    cell: ({ row }) => {
      const terrain = row.original.terrain;
      return <span className="text-slate-300 capitalize">{terrain}</span>;
    },
  },
  {
    accessorKey: "population",
    header: "Population",
    cell: ({ row }) => {
      const population = row.original.population;
      return (
        <span className="text-slate-300">{formatPopulation(population)}</span>
      );
    },
  },
  {
    accessorKey: "diameter",
    header: "Diameter",
    cell: ({ row }) => {
      const diameter = row.original.diameter;
      return <span className="text-slate-300">{formatDiameter(diameter)}</span>;
    },
  },
  {
    accessorKey: "gravity",
    header: "Gravity",
    cell: ({ row }) => {
      const gravity = row.original.gravity;
      return <span className="text-slate-300">{gravity}</span>;
    },
  },
  {
    accessorKey: "surface_water",
    header: "Surface Water",
    cell: ({ row }) => {
      const surfaceWater = row.original.surface_water;
      return <span className="text-slate-300 capitalize">{surfaceWater}</span>;
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
