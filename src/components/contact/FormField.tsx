import React from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
};

export const fieldClass = (hasError: boolean) =>
`w-full border-0 border-b bg-transparent px-0 py-3 text-[16px] text-bone placeholder:text-silver/40 transition-colors duration-150 focus:outline-none focus:ring-0 ${
hasError ? "border-signal" : "border-charcoal focus:border-signal"}`;


export function FormField({ id, label, error, optional, children }: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-silver">
        {label}
        {optional && <span className="text-silver/60">Optional</span>}
      </label>
      {children}
      {error &&
      <p id={`${id}-error`} role="alert" className="mt-2 font-mono text-[11px] tracking-[0.06em] text-signal">
          {error}
        </p>
      }
    </div>);

}