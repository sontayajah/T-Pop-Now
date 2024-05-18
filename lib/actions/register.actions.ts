"use server";
import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/lib/validator";

import db from "@/lib/prisma";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // await db.user.create({
  //   data: { email, password: hashedPassword },
  // });

  return { success: "Email sent!" };
};