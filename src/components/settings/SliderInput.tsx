import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  showValue?: boolean;
  suffix?: string;
}

export const SliderInput = React.memo(
  ({
    label,
    value,
    onChange,
    min,
    max,
    step,
    showValue = false,
    suffix = "",
  }: SliderInputProps) => {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-xs text-muted-foreground">{label}</Label>
          {showValue && (
            <span className="text-xs font-semibold text-foreground">
              {value}
              {suffix}
            </span>
          )}
        </div>
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={([v]) => onChange(v)}
        />
      </div>
    );
  },
);

SliderInput.displayName = "SliderInput";
