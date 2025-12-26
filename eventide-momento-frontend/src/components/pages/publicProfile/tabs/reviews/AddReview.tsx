"use client";
import CommonButton from "@/components/common/CommonButton";
import Rating from "@/components/ui/Rating";
import { useUserContext } from "@/contexts/AuthContext";
import { postApiHandler } from "@/lib/postApiHandler";
import { useAddReviewMutation } from "@/redux/features/reviewApis";
import { IReviews } from "@/types/reviews.types";
import { useState } from "react";
import { toast } from "sonner";

const AddReview = ({ id }: { id: string }) => {
  const { user } = useUserContext();

  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addReview] = useAddReviewMutation();

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const review = form.review.value;

    if (rating <= 0) {
      return toast.error("Please Add Rating First!");
    }

    const option: {
      data: IReviews;
    } = {
      data: {
        hostId: id,
        userId: String(user?._id),
        rating: rating,
        review: review,
      },
    };

    await postApiHandler({
      mutateFn: addReview,
      options: option,
      setIsLoading,
      optionalTasksFn: () => {
        form.reset();
        setRating(0);
      },
    });
  };
  return (
    <form onSubmit={handleReviewSubmit} className="w-full md:w-2/3">
      <textarea
        name="review"
        id="review"
        placeholder="Write a Review"
        className="p-2 w-full rounded border-b border-b-lightGray my-4 focus:outline-none"
        required
        maxLength={250}
      />
      <div className="flex items-center gap-4">
        <Rating onChange={(value) => setRating(value)} type="dynamic" />
        <CommonButton
          title={isLoading ? "Adding Review..." : "Add Review"}
          // disabled={!user || isLoading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default AddReview;
