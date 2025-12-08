import { LocalFonts } from "@/components/common/fonts";
import AddReview from "./AddReview";
import { AllReviews } from "./AllReviews";

const Reviews = ({ id }: { id: string }) => {
  return (
    <div className="">
      <h2
        className={`${LocalFonts.anton.className} text-3xl md:text-4xl text-secondary1 mb-8 text-left`}
      >
        Reviews & Rating
      </h2>
      <AddReview id={String(id)} />
      <AllReviews id={String(id)} />
    </div>
  );
};

export default Reviews;
