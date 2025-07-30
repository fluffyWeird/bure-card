import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function signToken(email: string, username: string, role='doc'): string{
    const payload = {
        userEmail: email,
        userName: username,
        userRole: role
    }

    const token = jwt.sign(payload,process.env.access_Token!)
    return token
}

export function verifyToken(token: string): string | jwt.JwtPayload{
    try {
        const decoded = jwt.verify(token,process.env.access_Token!)
        return decoded
    } catch (error) {
        throw new Error('Invalid Token')
    }
}