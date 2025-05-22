import { forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`px-4 py-2 rounded-md bg-blue-500 text-white ${className}`}
      {...props}
    />
  );
});
