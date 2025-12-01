"use client";

import { RiStarFill } from "@remixicon/react";
import { useId, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RatingProps {
  type: "dynamic" | "readonly";
  value?: number; // for readonly, the rating to display
  onChange?: (value: number) => void; // optional callback for dynamic rating
}

export default function Rating({ type, value = 0, onChange }: RatingProps) {
  const id = useId();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(0);

  const handleValueChange = (val: string) => {
    const num = Number(val);
    setCurrentRating(num);
    onChange?.(num);
  };

  const stars = ["1", "2", "3", "4", "5"];

  return (
    <fieldset className="space-y-4">
      <RadioGroup
        className="inline-flex gap-0"
        onValueChange={type === "dynamic" ? handleValueChange : undefined}
      >
        {stars.map((star) => {
          const num = Number(star);
          const isFilled =
            type === "readonly"
              ? num <= value
              : num <= (hoverRating ?? currentRating);

          return (
            <label
              className={`group relative cursor-pointer rounded p-0.5 outline-none ${
                type === "dynamic"
                  ? "has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
                  : "cursor-default"
              }`}
              key={star}
              onMouseEnter={
                type === "dynamic" ? () => setHoverRating(num) : undefined
              }
              onMouseLeave={
                type === "dynamic" ? () => setHoverRating(null) : undefined
              }
            >
              {type === "dynamic" && (
                <RadioGroupItem
                  className="sr-only"
                  id={`${id}-${star}`}
                  value={star}
                />
              )}
              <RiStarFill
                className={`transition-all ${
                  isFilled ? "text-amber-500" : "text-input"
                } ${type === "dynamic" ? "group-hover:scale-110" : ""}`}
                size={24}
              />
              <span className="sr-only">
                {star} star{star === "1" ? "" : "s"}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </fieldset>
  );
}
