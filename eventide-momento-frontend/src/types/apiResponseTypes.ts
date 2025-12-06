/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiErrorResponse {
  data: {
    success: boolean;
    statusCode: number;
    message: string;
    errorMessages: Array<{
      path: string;
      message: string;
    }>;
  };
}

export interface IAuthApiSuccessResponse {
  data: {
    token: string;
    userData: string;
  } | null;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IApiSuccessResponse {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IFilterApiSuccessResponse {
  message: string;
  statusCode: number;
  success: boolean;
  data: {
    data: any;
    meta: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
