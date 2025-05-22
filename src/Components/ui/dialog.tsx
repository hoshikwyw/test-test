export function Dialog({ children, open, onOpenChange }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">{children}</div>
    </div>
  );
}

export const DialogContent = ({ children }: any) => <div>{children}</div>;
export const DialogHeader = ({ children }: any) => (
  <div className="mb-4">{children}</div>
);
export const DialogTitle = ({ children }: any) => (
  <h2 className="text-xl font-bold">{children}</h2>
);
export const DialogFooter = ({ children }: any) => (
  <div className="mt-4 flex justify-end gap-2">{children}</div>
);
