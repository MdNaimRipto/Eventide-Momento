import CommonButton from "@/components/common/CommonButton";
import { useUserContext } from "@/contexts/AuthContext";
import { usePlaceOrderMutation } from "@/redux/features/orderApis";
import {
  IApiErrorResponse,
  IApiSuccessResponse,
} from "@/types/apiResponseTypes";
import { IEvent } from "@/types/eventTypes";
import { IUser } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const BookEvent = ({ event }: { event: IEvent }) => {
  const { entryFee: amount } = event;
  const { user } = useUserContext();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [placeOrder] = usePlaceOrderMutation();
  const handlePayment = async () => {
    if (!user || user === undefined) {
      router.push("/auth/login");
      return;
    }

    const option = {
      data: {
        userId: user?._id,
        hostId: (event.hostId as unknown as IUser)?._id,
        eventId: event._id,
        paidAmount: amount,
        currency: "bdt",
        email: user?.email,
      },
    };

    try {
      setIsLoading(true);

      const res: IApiSuccessResponse = await placeOrder(option).unwrap();
      if (res.success === true) {
        const paymentUrl = res.data;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          toast.error("Payment URL not found!");
        }
      }
    } catch (e) {
      console.log("error", e);
      const error = e as IApiErrorResponse;

      const errorMessage = error?.data?.message || "An unknown error occurred!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-0">
      <CommonButton
        title={isLoading ? "Booking..." : "Book Now"}
        onClick={handlePayment}
        disabled={
          event.maxParticipants <= event.totalParticipants ||
          event.status !== "UPCOMING"
            ? true
            : false
        }
      />
    </div>
  );
};

export default BookEvent;
