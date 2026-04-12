import ActionDialogDelete from "@/components/common/ActionDialogDelete";
import LoaderSpinner from "@/components/common/Loader";
import useTable from "@/components/common/table/hooks/useTable";
import TablePagination from "@/components/common/table/TablePagination";
import TableSearch from "@/components/common/table/TableSearch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useRequest from "@/hooks/useRequest";
import useSyncParams from "@/hooks/useSyncParams";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import documentCategoryApi from "./api";
import AddEdit from "./components/AddEdit";

const DocumentCategories = () => {
  const { searchParamsSyncParams } = useSyncParams();
  const searchParams = searchParamsSyncParams;
  const { mutateAsync } = useRequest();

  const search = searchParams?.get("search") || "";

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (category) => {
    setEditData(category);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setEditData(null);
  };

  const handleToggleStatus = async (category) => {
    try {
      // Extract document type IDs from document_types array
      const documentTypeIds =
        category.document_types?.map((doc) => String(doc.id)) || [];

      await mutateAsync({
        id: category.id,
        data: {
          name: category.name,
          description: category.description,
          document_type_ids: documentTypeIds,
          is_active: !category.is_active,
        },
        api: documentCategoryApi.update(category.id),
        cacheKey: documentCategoryApi.cacheKey,
        isToast: true,
      });
    } catch (error) {
      console.error("Toggle status error:", error);
    }
  };

  // Table configuration with real API
  const { tableInfo } = useTable({
    filter: {
      search,
    },
    api: documentCategoryApi.list,
    apiCacheKey: documentCategoryApi.cacheKey,
  });

  const categories = tableInfo?.data?.data || [];
  const isLoading = tableInfo?.isLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Appointment Category Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create and manage appointment categories and their required
              documents
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Category
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <TableSearch
            placeholder="Search by category name or description..."
            searchTableParams={search}
            tableInfo={tableInfo}
            className="w-96"
          />
        </div>
      </div>

      <AddEdit
        open={isSheetOpen}
        onClose={handleCloseSheet}
        editData={editData}
      />

      {/* Categories List - Card-based Rows */}
      {isLoading ? (
        <LoaderSpinner message="Loading categories..." />
      ) : categories.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">
            No Categories Found
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Create your first category to get started
          </p>
        </div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="divide-y">
            {categories.map((category, index) => {
              const documentTypes = category.document_types || [];
              const requiredDocs = documentTypes.filter(
                (doc) => doc.is_required,
              );
              const optionalDocs = documentTypes.filter(
                (doc) => !doc.is_required,
              );

              return (
                <div
                  key={category.id}
                  className="p-6 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Number Badge with Status */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-600 text-white font-semibold text-lg">
                        {index + 1}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-medium",
                          category.is_active
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-300",
                        )}
                      >
                        {category.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    {/* Category Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1 capitalize">
                            {category.name}
                          </h3>
                          <p className="text-sm text-slate-600 mb-3 capitalize">
                            {category.description}
                          </p>

                          {/* Document Stats */}
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <FileText className="h-4 w-4" />
                              <span>{documentTypes.length} Documents</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span>{requiredDocs.length} Required</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <AlertCircle className="h-4 w-4 text-slate-400" />
                              <span>{optionalDocs.length} Optional</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(category)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <ActionDialogDelete
                            name={category.name}
                            request={{
                              id: category.id,
                              api: documentCategoryApi.delete(category.id),
                              cacheKey: documentCategoryApi.cacheKey,
                            }}
                            trigger={
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <Button
                            size="sm"
                            onClick={() => handleToggleStatus(category)}
                            className={cn(
                              category.is_active
                                ? "bg-slate-600 hover:bg-slate-700"
                                : "bg-emerald-600 hover:bg-emerald-700",
                            )}
                          >
                            {category.is_active ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      </div>

                      {/* Required Documents */}
                      {documentTypes.length > 0 && (
                        <div className="border-t pt-4 mt-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                            <FileText className="h-4 w-4" />
                            <span>Associated Documents:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {documentTypes.map((doc, idx) => (
                              <div
                                key={doc.id}
                                className={cn(
                                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border",
                                  doc.is_required
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : "bg-slate-50 text-slate-600 border-slate-200",
                                )}
                              >
                                <span
                                  className={cn(
                                    "flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium border",
                                    doc.is_required
                                      ? "border-red-700 text-red-700"
                                      : "border-slate-600 text-slate-600",
                                  )}
                                >
                                  {idx + 1}
                                </span>
                                <span>
                                  {doc.name}
                                  {doc.is_required && (
                                    <span className="text-red-600 ml-0.5">
                                      *
                                    </span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Created Date */}
                          <p className="text-xs text-slate-500 mt-3">
                            Created:{" "}
                            {new Date(category.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && categories.length > 0 && (
        <div className="bg-white rounded-xl border p-4">
          <TablePagination tableInfo={tableInfo} />
        </div>
      )}
    </div>
  );
};

export default DocumentCategories;
