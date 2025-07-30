import { Request, Response } from 'express'
import { hashPassword,validatePassword } from '../utils/hash'
import {Staffs} from '../models/staff.model'
import {signToken,verifyToken  } from '../utils/genToken'

export const registerUser = async (req: Request, res: Response) =>{
    try {
        const user = await Staffs.findOne({email: req.body.email})
        if (user){
            res.status(409).json({message: "user already exist"})
            return;
        }

        const hashedPass = await hashPassword(req.body.password);
        let newUser = await Staffs.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        let accessToken = signToken(newUser.email, newUser.username);
        res.cookie('accessToken', accessToken,{httpOnly: true})
        res.status(201).json({ 
            username: newUser.username,
            email: newUser.email
        })

    } catch (error) {
        res.status(500).json({ Error: (error as Error).message})
        console.log(error)
        return;
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await Staffs.findOne({email: req.body.email});

        if (!user){
            res.status(404).json("user not found") 
            return;
        }

        const givenPassword = req.body.password
        const passwordVerification = await validatePassword(givenPassword, user.password)

        if (!passwordVerification){
            res.status(401).json({message: "invalid username or password"})
            return;
        }
        let token = signToken(user.email, user.username);
        res.cookie('accessToken', token,{httpOnly:true})
        res.status(200).json({message: "login okay"}) 

    } catch (error) {
        res.status(500).json({Error: (error as Error).message})
        console.log(error)
        return;
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('accessToken').status(200).json({message: "logout okay"})           
    } catch (error) {
        res.status(500).json((error as Error).message)
        return;
    }
}