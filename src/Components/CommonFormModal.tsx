// components/CommonFormModal.tsx
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CommonFormModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  initialData?: T;
  title: string;
  fields: {
    name: keyof T;
    label: string;
    type?: string;
    required?: boolean;
  }[];
}

export function CommonFormModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  fields,
}: CommonFormModalProps<T>) {
  const { register, handleSubmit, reset } = useForm<T>({
    defaultValues: initialData || {},
  });

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name.toString()}>
              <Label htmlFor={field.name.toString()}>{field.label}</Label>
              <Input
                id={field.name.toString()}
                type={field.type || "text"}
                {...register(field.name as string, {
                  required: field.required,
                })}
              />
            </div>
          ))}
          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
