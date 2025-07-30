import bcrypt from 'bcryptjs'

export async function hashPassword (password: string): Promise<string>{

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword
}

export async function validatePassword(hashedPassword: string, actualPassword: string): Promise<boolean>{

    const isCorrect = await bcrypt.compare(hashedPassword,actualPassword);
    return isCorrect
}