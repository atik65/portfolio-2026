import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import ActionDialogDelete from "@/components/common/ActionDialogDelete";
import documentCategoryApi from "../api";

export const documentCategoryColumns = [
  {
    header: "CATEGORY NAME",
    accessorKey: "name",
  },
  {
    header: "DESCRIPTION",
    accessorKey: "description",
  },
  {
    header: "REQUIRED",
    accessorKey: "is_required",
    cell: ({ row }) => {
      if (!row) return null;
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
            row.is_required
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-50 text-gray-700"
          )}
        >
          {row.is_required ? "Required" : "Optional"}
        </span>
      );
    },
  },
  {
    header: "CREATED DATE",
    accessorKey: "createdAt",
  },
  {
    header: "ACTIONS",
    accessorKey: "actions",
    cell: ({ row, logics }) => {
      if (!row) return null;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
            onClick={() => logics?.handleEdit(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <ActionDialogDelete
            name={row.name}
            request={{
              id: row.id,
              api: documentCategoryApi.delete(row.id),
              cacheKey: documentCategoryApi.cacheKey,
            }}
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
