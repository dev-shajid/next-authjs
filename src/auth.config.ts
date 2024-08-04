import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "./schema/login.schema";

import bcrypt from "bcryptjs";
import { db } from "./lib/db";
import { sendVerificationEmail } from "./lib/mail";
import { generateVerificationToken } from "./lib/token";

export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                if(!credentials?.email) throw new Error("No email provided");
                // const { data, success } = LoginSchema.safeParse(credentials);

                // if (!success) {
                //     throw new Error("Invalid credentials");
                // }

                const user = await db.user.findFirst({
                    where: {
                        email: credentials.email!,
                    },
                })

                // if (!user || !user.password) {
                //     throw new Error("No user found");
                // }

                // const isValid = await bcrypt.compare(data.password, user.password);

                // if (!isValid) {
                //     throw new Error("Incorrect password");
                // }

                // if (!user.emailVerified) {
                //     await db.verificationToken.findFirst({
                //         where: {
                //             email: user.email,
                //         },
                //     })

                //     const verificationToken = await generateVerificationToken(user.email)

                //     const mailData = await sendVerificationEmail(user.email, verificationToken)

                //     if(!mailData.success) throw new Error(mailData.message || "Please check Email for verification");
                // }

                return user;
            },
        }),

    ],
} as NextAuthConfig;