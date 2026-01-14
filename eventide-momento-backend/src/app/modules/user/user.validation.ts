import { z } from "zod";

const usersZodSchema = z.object({
  body: z.object({
    userName: z.string({
      error: "User Name is Required",
    }),
    email: z.string({
      error: "Email is Required",
    }),
    contactNumber: z.string({
      error: "Contact Number is Required",
    }),
    password: z.string({
      error: "Password is Required",
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      error: "Email is Required",
    }),
    password: z.string({
      error: "Password is Required",
    }),
  }),
});

const userUpdateZodSchema = z.object({
  body: z.object({
    userName: z.string().optional(),
    email: z.string().optional(),
    contactNumber: z.string().optional(),
    profileImage: z.string().optional(),
    bio: z.string().optional(),
    interests: z.array(z.string()).optional(),
    location: z.string().optional(), // matches your schema default "Not Updated Yet"
    accountStatus: z.string().optional(),
  }),
});

const updatePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      error: "Current Password is Required",
    }),
    newPassword: z.string({
      error: "New Password is Required",
    }),
    confirmPassword: z.string({
      error: "Confirm Password is Required",
    }),
  }),
});

export const UserValidation = {
  usersZodSchema,
  loginUserZodSchema,
  userUpdateZodSchema,
  updatePasswordZodSchema,
};
