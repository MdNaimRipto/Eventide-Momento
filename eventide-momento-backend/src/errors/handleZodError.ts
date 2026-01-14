import { ZodError } from "zod";
import {
  IGenericErrorMessages,
  IGenericErrorResponse,
} from "../interface/error";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const errors: IGenericErrorMessages[] = error.issues.map((issue) => ({
    path: String(issue.path[issue.path.length - 1]),
    message: issue.message,
  }));
  return {
    statusCode: statusCode,
    message: "Zod Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;
