import { Response } from "express";
import httpStatus from "http-status";

type IResponseType<T> = {
  success?: boolean;
  statusCode?: number;
  message?: string | null;
  data: T;
};

const sendResponse = <T>(res: Response, data: IResponseType<T>): void => {
  res.status(httpStatus.OK).send({
    success: data.success || true,
    statusCode: data.statusCode || httpStatus.OK,
    message: data.message,
    data: data.data || null,
  });
};

export default sendResponse;
