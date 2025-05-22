// utils/tableUtils.ts

export type CrudFunctions<T> = {
  handleAdd: (item: T) => void;
  handleEdit: (item: T) => void;
  handleDelete: (ids: number[]) => void;
};

export const useTableCrud = <T extends { id: number }>(
  data: T[],
  setData: React.Dispatch<React.SetStateAction<T[]>>
): CrudFunctions<T> => {
  const handleAdd = (item: T) => {
    const newId = Math.max(...data.map((d) => d.id), 0) + 1;
    setData([...data, { ...item, id: newId }]);
  };

  const handleEdit = (item: T) => {
    setData(data.map((d) => (d.id === item.id ? item : d)));
  };

  const handleDelete = (ids: number[]) => {
    setData(data.filter((item) => !ids.includes(item.id)));
  };

  return { handleAdd, handleEdit, handleDelete };
};