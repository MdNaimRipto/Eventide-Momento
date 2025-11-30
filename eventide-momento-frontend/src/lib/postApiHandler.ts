/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IApiErrorResponse,
  IApiSuccessResponse,
} from "@/types/apiResponseTypes";
import { toast } from "sonner";

export const postApiHandler = async ({
  mutateFn,
  options,
  setIsLoading,
  optionalTasksFn,
}: {
  mutateFn: any;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  options: any;
  optionalTasksFn?: any;
}) => {
  try {
    setIsLoading(true);

    const res: IApiSuccessResponse = await mutateFn(options).unwrap();
    if (res.success === true) {
      toast.success(res.message);
      if (optionalTasksFn) {
        optionalTasksFn();
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

/***
 * Example
 * await postApiHandler({
      mutateFn: uploadBook,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
 * **/
