import { resolve } from 'path';
import {config }from '../config';
import { database } from '../database';

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

export class AuthService{
    public async findUser(email):Promise<INewUser>{
        if(!email) throw new Error('user email is missing');

        return new Promise((resolve,reject)=>{
            database.query(`SELECT * from users WHERE mailid = "${email}"`,(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }else{
                    resolve(result[0]);
                }
            })
        })
    }

    public async verifyToken(mailid):Promise<string>{
        return new Promise((resolve,reject)=>{
            database.query(`SELECT reset_token from resetdetails WHERE mailid = "${mailid}" `,(err,result)=>{
                if(err){
                    console.log(err);
                    reject(false)
                }else{
                    resolve(result[0])
                }
            })
        })
    }

    public async resolveToken(mailid):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            database.query(`DELETE from resetdetails where mailid="${mailid}"`,(err)=>{
                if(err){
                    console.log(err)
                    reject(false)
                }else{
                    resolve(true)
                }
            })
        })
    }

    public async resetDetails(mailid,token):Promise<string>{
        return new Promise((resolve,reject)=>{
            database.query(`INSERT into resetdetails VALUES(?,?)`,[mailid,token],(err)=>{
                if(err){
                    console.log(err);
                    reject(err)
                }else{
                    resolve('resetdetials set')
                }
            })
        })
    }

    public async updatePassword(email,newpassword):Promise<string>{
        return new Promise((resolve,reject)=>{
            database.query(`UPDATE users SET password=? WHERE mailid=?`,[newpassword,email],(err,ersult)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }else{

                    resolve('password updated successfully')
                }
            })
        })
    }
}