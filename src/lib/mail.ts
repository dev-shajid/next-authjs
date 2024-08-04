import { Resend } from 'resend';
import ApiError, { ApiErrorType } from './ApiError';
import ApiResponse, { ApiResponseType } from './ApiResponse';

export const resend = new Resend(process.env.RESENT_API_KEY);

export async function sendPasswordResetEmail(
    email: string,
    token: string
): Promise<ApiResponseType | ApiErrorType> {
    try {
        const confirmLink = `${process.env.CLIENT_URL}/auth/new-password?token=${token}`;
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset your password',
            // react: VerificationEmail({username, otp}),
            html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
        });

        if (error) throw new Error(error.message);

        return ApiResponse(200, "Please check Email for verification");
    } catch (error:any) {
        console.log("Error sending email: ", error);
        return ApiError(500, error?.message) || "Error sending email";
    }
}

export async function sendVerificationEmail(
    email: string,
    token: string
): Promise<ApiResponseType | ApiErrorType> {
    try {
        const confirmLink = `${process.env.CLIENT_URL}/auth/verification?token=${token}`;
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            // react: VerificationEmail({username, otp}),
            html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
        });

        if (error) throw new Error(error.message);

        return ApiResponse(200, "Please check Email for verification");
    } catch (error:any) {
        console.log("Error sending email: ", error);
        return ApiError(500, error?.message) || "Error sending email";
    }
}