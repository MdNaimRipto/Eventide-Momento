"use client";
import CommonButton from "@/components/common/CommonButton";
import Rating from "@/components/ui/Rating";

const AddReview = () => {
  return (
    <form className="w-full md:w-2/3">
      <textarea
        name="review"
        id="review"
        placeholder="Write a Review"
        className="p-2 w-full rounded border-b border-b-lightGray my-4 focus:outline-none bg-primary"
        required
        maxLength={250}
      />
      <div className="flex items-center gap-4">
        <Rating type="dynamic" />
        <CommonButton title="Submit" />
      </div>
    </form>
  );
};

export default AddReview;
