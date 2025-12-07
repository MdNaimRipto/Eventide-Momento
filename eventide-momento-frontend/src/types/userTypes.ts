export type roleEnums = "USER" | "ADMIN" | "HOST";
export type accountStatusEnums = "ACTIVE" | "FREEZE";

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  contactNumber: string;
  profileImage: string;
  location: string;
  activeStatus: boolean;
  accountStatus: accountStatusEnums;
  role: roleEnums;
  bio: string;
  interests: Array<string>;
  ratingCount: number;
  ratingAvg: number;
  createdAt: Date;
  updatedAt: Date;
  IsFirstTimeUpdated: boolean;
}
