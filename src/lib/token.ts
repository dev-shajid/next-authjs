import { getVerificationTokenByEmail } from "@/actions/verificationToken.controler"
import ApiResponse from "./ApiResponse"
import { db } from "./db"
import {v4 as uuidv4} from 'uuid'
import { getPasswordResetTokenByEmail } from "@/actions/resetPassword.controler"

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 1000 * 3600)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if(existingToken.success){
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.data.id
            }
        })
    }

    const passwordToken = await db.passwordResetToken.create({
        data: {
            token,
            email,
            expires
        }
    })

    return passwordToken?.token
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 1000 * 3600)

    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken.success){
        await db.verificationToken.delete({
            where: {
                id: existingToken.data.id
            }
        })
    }

    await db.verificationToken.create({
        data: {
            token,
            email,
            expires
        }
    })

    return token
}