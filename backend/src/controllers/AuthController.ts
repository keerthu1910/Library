import { AuthService } from "../services/AuthService";
import {Request,Response} from 'express';
import { config } from "../config";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Mailservice } from "../services/Mailservice";

interface INewUser{
    libraryid:string,
    firstname:string,
    lastname:string,
    mailid:string,
    password:string,
    phonenumber:Number,
    address:string,
    DOB:Date,
    gender:string,
    membership:string
}

export class AuthController {
    private authservice:AuthService;
    private mailservice:Mailservice;

    constructor(){
        this.authservice = new AuthService();
        this.mailservice = new Mailservice();
    }

    public logout = async(req:Request,res:Response)=>{
        res.clearCookie('accesstoken');
        res.status(200).send({message:'logged out'})
    }

    public forgotPassword = async(req:Request,res:Response) => {
        const mailid = req.body.mailid;
        try{
            const user:INewUser = await this.authservice.findUser(mailid);
            if(!user){
                res.status(404).send({message:'user does not exist'})
            }else{
                const data = {
                    time:new Date(),
                    mail:mailid
                }
                const token = await jwt.sign(data,config.jwt.secret);
                const setResetDetails = await this.authservice.resetDetails(mailid,token);
                let resetURL = `http://127.0.0.1:5173/resetmailpassword?token=${token}`;
                const mailOptions = {
                    from:'wisdomwell_admin',
                    to:mailid,
                    subject:'reset password link',
                    text:resetURL
                }
                if(setResetDetails){
                    const isMailSent = await this.mailservice.sendMail(mailOptions);
                    if(isMailSent){
                        res.status(200).send({message:'reset link has been sent to your mail'})
                    }
                }
            }
        }catch(err){
            res.send(err)
        }

    }
    public resetpasswordusingmail = async(req:Request,res:Response) => {
        let token = req.body.token;
       let resetpassword = req.body.resetpassword;
        try{
            const decodedtoken = jwt.decode(token,config.jwt.secret);
            const isValidToken = await this.authservice.verifyToken(decodedtoken.mail);
            if(isValidToken['reset_token'] === token){
                let validuser = await this.authservice.resolveToken(decodedtoken.mail);
                if(validuser){
                    const salt = await bcrypt.genSalt(10);
                    const new_password = await bcrypt.hash(resetpassword,salt);
                    const updatedPassword = await this.authservice.updatePassword(decodedtoken.mail,new_password);
                    if(updatedPassword){
                        res.status(200).send({message:'password reset successful'})
                    }
                   
                }else{
                    res.status(404).send({message:'user details not found'})
                }
            }
    }catch(err){
        res.status(401).send({message:'link has expired'})
    }
    }
    public resetpassword = async(req:Request,res:Response)=>{
        let token = req.cookies.accesstoken;
        const salt = await bcrypt.genSalt(10);
        const new_password = await bcrypt.hash(req.body.newpassword,salt);
       try{
            const verify_id  = jwt.verify(token,config.jwt.secret);
            const isUpdated = await this.authservice.updatePassword(verify_id,new_password);
            if(isUpdated){
                res.status(200).send({message:'password changed successfully'})
            }else{
                res.status(401).send({message:'unauthorized request'})
            }
        }
        catch(err){
            res.send({message:'cannot be updated'})
        }
        
    }
    public login = async(req:Request,res:Response) => {
        const {email,password} = req.body;
        try{
            const user:INewUser = await this.authservice.findUser(email);
            if(!user){
               if(email === config.admin.admin_id && password === config.admin.admin_password){
                res.status(200).send({message:'admin login successful',role:'admin'})
               }else{
                res.status(404).send({message:'user does not exist'})
               }
            }else{
                const isValidUser = await bcrypt.compare(password,user.password);
                if(isValidUser){
                    const token = jwt.sign(user.mailid,config.jwt.secret);
                    res.cookie('accesstoken',token,{httpOnly:true,sameSite:'none',path:'/',maxAge:24*60*60,secure:true});
                    res.status(200).send({message:'user login successful',username:user.firstname,role:'user'});
                }else{
                    res.status(401).send({message:'Invalid Credentials'})
                }
            }
        }
        catch(err){
            res.status(500).send({message:'mail id not permitted'})
        }
    }
}