import { LocalFonts } from "@/components/common/fonts";
import AddReview from "./AddReview";
import AllReviews from "./AllReviews";

const Reviews = () => {
  return (
    <div className="container py-16">
      <h2
        className={`${LocalFonts.anton.className} text-3xl md:text-4xl text-secondary1 mb-8 text-left`}
      >
        Reviews & Rating
      </h2>
      <AddReview />
      <AllReviews />
    </div>
  );
};

export default Reviews;
