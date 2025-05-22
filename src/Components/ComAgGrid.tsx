import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { AgGridReact, type AgGridReactProps } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface DataTableProps<Rows> extends HTMLAttributes<HTMLDivElement> {
  rowData: Rows;
  colDefs: ColDef<Rows[number]>[];
  rowSelection?: "single" | "multiple" | RowSelectionOptions;
  AgGridReactProps?: AgGridReactProps;
}

const DataTable = forwardRef(function DataTable<Rows>(
  props: DataTableProps<Rows>,
  ref: React.Ref<any>
) {
  const {
    rowData,
    colDefs,
    AgGridReactProps,
    rowSelection: rowSelectionProp,
    ...rest
  } = props;

  const rowSelectionConfig = useMemo(() => {
    if (typeof rowSelectionProp === "string") {
      return {
        mode: rowSelectionProp,
        enableClickSelection: true,
      };
    } else if (rowSelectionProp) {
      return {
        ...rowSelectionProp,
        enableClickSelection: rowSelectionProp.enableClickSelection ?? true,
      };
    }
    return undefined;
  }, [rowSelectionProp]);

  return (
    <div className="ag-theme-alpine" {...rest}>
      <AgGridReact
        ref={ref}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={rowSelectionConfig?.mode}
        rowMultiSelectWithClick={rowSelectionConfig?.enableClickSelection}
        {...AgGridReactProps}
      />
    </div>
  );
});

export default DataTable;
