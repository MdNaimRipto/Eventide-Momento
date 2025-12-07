import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { eventCategoryEnums } from "@/types/eventTypes";
import { Dispatch, SetStateAction } from "react";

const EventCategorySelect = ({
  category,
  setCategory,
}: {
  category: eventCategoryEnums | "";
  setCategory: Dispatch<SetStateAction<eventCategoryEnums | "">>;
}) => {
  const categories: eventCategoryEnums[] = [
    "SPORTS",
    "MUSIC",
    "TECHNOLOGY",
    "BUSINESS",
    "ARTS",
    "EDUCATION",
    "SOCIAL",
  ];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="category" className="font-medium text-sm">
        Category
      </label>
      <Select
        value={category}
        onValueChange={(value) => setCategory(value as eventCategoryEnums)}
        required
      >
        <SelectTrigger id="category" className="w-full rounded-none h-[45px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              {c.charAt(0) + c.slice(1).toLowerCase()} {/* Optional: format */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventCategorySelect;
