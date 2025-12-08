import Loader from "@/components/common/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rating from "@/components/ui/Rating";
import { useGetReviewsQuery } from "@/redux/features/reviewApis";
import { IReviews } from "@/types/reviews.types";
import { IUser } from "@/types/userTypes";

export const AllReviews = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetReviewsQuery({
    reviewForId: id.toString(),
  });

  if (isLoading) {
    return <Loader />;
  }

  // backend data
  const realReviews = data?.data?.data as IReviews[];

  // transform backend reviews to frontend format
  const formattedReviews = realReviews.map((r) => ({
    profileImage: (r.userId as unknown as IUser)?.profileImage,
    userName: (r.userId as unknown as IUser)?.userName,
    review: r.review,
    rating: r.rating,
  }));

  // optional static reviews
  const staticReviews = [
    {
      profileImage: "https://github.com/shadcn.png",
      userName: "Alice Johnson",
      review:
        "Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious. Great experience! The service was excellent and the food was delicious.",
      rating: 5,
    },
    {
      profileImage: "https://github.com/maxleiter.png",
      userName: "Bob Smith",
      review: "Good value for money. The room was clean and comfortable.",
      rating: 4,
    },
    {
      profileImage: "https://github.com/evilrabbit.png",
      userName: "Catherine Lee",
      review:
        "Average stay. The location was convenient, but the amenities were lacking.",
      rating: 4,
    },
  ];

  // combine backend and static reviews
  const reviews = [...formattedReviews, ...staticReviews];

  return (
    <div className="mt-12">
      {reviews.map((r, i) => (
        <div key={i} className="flex items-start gap-4 mb-5">
          <div className="flex flex-col items-center gap-2 mb-4">
            <Avatar>
              <AvatarImage src={r.profileImage} />
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
