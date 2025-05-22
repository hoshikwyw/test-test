// pages/ProductsPage.tsx
import { useState, useRef } from "react";
import { mockProducts, type Product } from "@/utils/mockProducts";
import DataTable from "./ComAgGrid";
import { Button } from "./ui/button";
import { Trash2, Download, PlusCircle, Edit } from "lucide-react";
import { useTableCrud } from "../utils/tableUtils";
import { CommonFormModal } from "./CommonFormModal";

const ProductsPage = () => {
  const [rowData, setRowData] = useState<Product[]>(mockProducts);
  const gridRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { handleAdd, handleEdit, handleDelete } = useTableCrud<Product>(
    rowData,
    setRowData
  );

  const columnDefs = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      valueFormatter: (params: { value: any }) => {
        const value = params.value;
        if (value == null) return "$0.00";
        const num = Number(value);
        return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      valueFormatter: (params: { value: any }) => {
        const value = params.value;
        if (value == null) return "0";
        const num = Number(value);
        return isNaN(num) ? "0" : Math.floor(num).toString();
      },
      // Optional editing configuration:
      editable: true,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
        precision: 0,
      },
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      width: 150,
      valueFormatter: (params: { value: any }) => {
        try {
          return params.value
            ? new Date(params.value).toLocaleDateString()
            : "N/A";
        } catch {
          return "N/A";
        }
      },
    },
  ];

  const getSelectedProducts = () => {
    if (!gridRef.current) return [];
    return gridRef.current.api.getSelectedNodes().map((node: any) => node.data);
  };

  const handleDeleteSelected = () => {
    console.log("Deleting selected rows");
    if (!gridRef.current) return;
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    console.log(
      "Selected nodes:",
      selectedNodes.map((node: any) => node.data)
    );
    // if (selectedNodes.length === 0) {
    //   console.warn("No rows selected");
    //   return;
    // }

    // const selectedIds = selectedNodes.map((node: any) => node.data.id);
    // setRowData((prevData) =>
    //   prevData.filter((product) => !selectedIds.includes(product.id))
    // );

    // // Optional: Clear selection after deletion
    gridRef.current.api.deselectAll();
  };

  const handleExport = () => {
    const selectedProducts = getSelectedProducts();
    const dataToExport =
      selectedProducts.length > 0 ? selectedProducts : rowData;
    console.log("Exporting:", dataToExport);
  };

  const handleSubmit = (data: Product) => {
    if (currentProduct) {
      handleEdit({ ...data, id: currentProduct.id });
    } else {
      handleAdd({ ...data, lastUpdated: new Date().toISOString() });
    }
    setCurrentProduct(null);
  };

  const productFields = [
    { name: "name", label: "Product Name", required: true },
    { name: "category", label: "Category", required: true },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "stock", label: "Stock", type: "number", required: true },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            // variant="destructive"
            onClick={handleDeleteSelected}
            disabled={!gridRef.current?.api.getSelectedNodes().length}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <CommonFormModal<Product>
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentProduct(null);
        }}
        onSubmit={handleSubmit}
        initialData={currentProduct || undefined}
        title={currentProduct ? "Edit Product" : "Add New Product"}
        fields={productFields}
      />

      <div className="bg-white rounded-lg shadow">
        <DataTable
          ref={gridRef}
          className="w-full h-[600px]"
          rowData={rowData}
          colDefs={columnDefs}
          AgGridReactProps={{
            defaultColDef: { flex: 1 },
            animateRows: true,
          }}
          rowSelection={{
            mode: "single",
            checkboxSelection: true,
            enableClickSelection: true,
          }}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
