import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { IPaginationOptions } from "../../../interface/pagination";
import { OrderSearchableFields } from "./order.constant";
import { IOrder, IOrderFilters } from "./order.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma";

const Orders = prisma.order;

const getAllOrders = async (
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions,
  accessToken: string
) => {
  // verify token
  jwtHelpers.jwtVerify(accessToken, config.jwt_access_secret);

  const { searchTerm, ...filterData } = filters;
  const AND: any[] = [];

  if (searchTerm) {
    AND.push({
      OR: OrderSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })) as any,
    });
  }

  if (Object.keys(filterData).length > 0) {
    AND.push({
      ...filterData,
    });
  }

  const where: any = AND.length > 0 ? { AND } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const orderBy: Prisma.OrderOrderByWithRelationInput | undefined =
    sortBy && sortOrder
      ? { [sortBy]: sortOrder.toLowerCase() as "asc" | "desc" }
      : undefined;

  const result = await Orders.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });

  const total = await Orders.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getUserOrders = async (accessToken: string) => {
  const { id } = jwtHelpers.jwtVerify(
    accessToken,
    config.jwt_access_secret
  ) as any;
  const result = await Orders.findMany({
    where: { userId: id },
    include: {
      event: true,
    },
  });
  return result;
};

const updateOrder = async (id: string, payload: Partial<IOrder>) => {
  const result = await Orders.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const getOrdersOverview = async (accessToken: string) => {
  const { id } = jwtHelpers.jwtVerify(
    accessToken,
    config.jwt_access_secret
  ) as any;

  // total orders for this host
  const totalOrders = await Orders.count({
    where: { hostId: id },
  });

  // total revenue for this host
  const totalRevenueResult = await Orders.aggregate({
    _sum: {
      paidAmount: true,
    },
    where: {
      hostId: id,
    },
  });

  const totalAmount = totalRevenueResult._sum.paidAmount || 0;

  return {
    totalOrders,
    totalAmount,
  };
};

export const OrderService = {
  getAllOrders,
  getUserOrders,
  updateOrder,
  getOrdersOverview,
};
