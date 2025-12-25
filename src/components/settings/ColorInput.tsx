import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showInput?: boolean;
}

export const ColorInput = React.memo(
  ({ label, value, onChange, showInput = false }: ColorInputProps) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label className="text-xs text-muted-foreground">{label}</Label>
        )}
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={label || "Color picker"}
            className="w-12 h-12 rounded bg-transparent cursor-pointer"
          />
          {showInput && (
            <Input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 font-mono"
            />
          )}
        </div>
      </div>
    );
  },
);

ColorInput.displayName = "ColorInput";
