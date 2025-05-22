import { mockUsers, type User } from "@/utils/mockUsers";
import { useRef, useState } from "react";
import ComAgGrid from "./ComAgGrid";

const UsersPage = () => {
  const gridRef = useRef<any>(null);
  const [rowData] = useState<User[]>(mockUsers);

  const columnDefs = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: "firstName",
      headerName: "Name",
      valueGetter: (params: any) =>
        `${params.data.firstName} ${params.data.lastName}`,
      width: 200,
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "lastLogin",
      headerName: "Last Login",
      width: 150,
      valueFormatter: (params: any) => new Date(params.value).toLocaleString(),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      cellClassRules: {
        "text-green-500": (params) => params.value === "Active",
        "text-yellow-500": (params) => params.value === "Inactive",
        "text-red-500": (params) => params.value === "Suspended",
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="bg-white rounded-lg shadow">
        <ComAgGrid
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

export default UsersPage;
