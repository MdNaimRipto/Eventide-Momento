import prisma from "../config/prisma";

export const roleCheck = async (
  email: string,
  id: string,
  roles: string[]
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: { email, id: id },
    select: {
      role: true,
    },
  });
  if (!user) return false;

  return roles.includes(user.role);
};
