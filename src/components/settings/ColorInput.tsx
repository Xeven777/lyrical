import React from "react";
import { ColorPicker } from "@/components/ui/color-picker";
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
          <ColorPicker
            value={value}
            onChange={onChange}
            aria-label={label || "Color picker"}
            className="size-12"
          />
        </div>
      </div>
    );
  }
);

ColorInput.displayName = "ColorInput";
