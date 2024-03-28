import { database } from "../database";

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

export class UserService{

    public async userdetails({
        libraryid,
        firstname,
        lastname,
        mailid,
        password,
        phonenumber,
        address,
        DOB,
        gender,
        membership
    }:INewUser):Promise<string>{
        return new Promise((resolve,reject)=>{
            database.query(
                `INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?)`,[
                    libraryid,
                    firstname,
                    lastname,
                    mailid,
                    password,
                    phonenumber,
                    address,
                    DOB,
                    gender,
                    membership
                ], (err) => {
                    if(err){
                        console.log(err);
                        reject(err)
                    }else{
                        console.log('resolved')
                        resolve('new user detail added successfully')
                    }
                }
            )
        })
    }
}