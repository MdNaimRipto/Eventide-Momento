import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rating from "@/components/ui/Rating";

const AllReviews = () => {
  const staticReviews = [
    {
      userName: "Alice Johnson",
      review:
        "Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious.",
      rating: 5,
    },
    {
      userName: "Bob Smith",

      review: "Good value for money. The room was clean and comfortable.",
      rating: 4,
    },
    {
      userName: "Catherine Lee",

      review:
        "Average stay. The location was convenient, but the amenities were lacking.",
      rating: 4,
    },
    {
      userName: "Alice Johnson",
      review:
        "Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious.",
      rating: 5,
    },
    {
      userName: "Bob Smith",

      review: "Good value for money. The room was clean and comfortable.",
      rating: 4,
    },
    {
      userName: "Catherine Lee",

      review:
        "Average stay. The location was convenient, but the amenities were lacking.",
      rating: 4,
    },
    {
      userName: "Alice Johnson",
      review:
        "Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious.",
      rating: 5,
    },
    {
      userName: "Bob Smith",

      review: "Good value for money. The room was clean and comfortable.",
      rating: 4,
    },
    {
      userName: "Catherine Lee",

      review:
        "Average stay. The location was convenient, but the amenities were lacking.",
      rating: 4,
    },
  ];

  const reviews = [...staticReviews];

  return (
    <div className="mt-12">
      {reviews.map((r, i) => (
        <div key={i} className="flex items-start gap-4 mb-5">
          <div className="flex flex-col items-center gap-2 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-8">
              <span className="w-[1px] h-[18px] bg-secondary1 block"></span>
              <span className="w-[36px] h-[1px] bg-secondary1 block"></span>
            </div>
          </div>
          <div>
            <h4 className="text-sm md:text-xl font-inter text-black font-semibold mt-1 mb-5">
              {r.userName}
            </h4>
            <p className="font-inter font-normal mb-3 text-xs md:text-sm leading-7 md:leading-7">
              {r.review}
            </p>
            <Rating type="readonly" value={r.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
