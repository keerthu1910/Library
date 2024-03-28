import { Request,Response } from "express";
import { UserService } from "../services/UserService";
import bcrypt from 'bcryptjs';
interface INewUser{
    libraryid:String,
    firstname:String,
    lastname:String,
    mailid:String,
    password:String,
    phonenumber:Number,
    address:String,
    DOB:Date,
    gender:String,
    membership:String
}

export class UserController{
    private userService:UserService;
    constructor(){
        this.userService = new UserService();
    }
    public addprofile = async(req:Request,res:Response)=>{
        const userdata  = req.body.data;
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(userdata.password,salt);
        
        try{
            const newuser = await this.userService.userdetails({
                libraryid:userdata.libraryid,
                firstname:userdata.firstname,
                lastname:userdata.lastname,
                mailid:userdata.mailid,
                password:hashedpassword,
                phonenumber:userdata.phonenumber,
                address:userdata.address,
                DOB:userdata.dob,
                gender:userdata.gender,
                membership:userdata.membership
            });
            if(newuser){
                res.status(200).send('new user details added successfully')
            }
        }catch(err){
            res.send({message:'unable to add new user'})
        }
    }
}