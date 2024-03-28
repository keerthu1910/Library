import nodemailer,{Transporter} from 'nodemailer';
import {config} from '../config';

export class Mailservice{
    private transporter:Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            
                service:'gmail',
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                auth:{
                    user:config.admin.admin_email,
                    pass:config.admin.admin_mailpassword
                }
            
        })
    }
    public async sendMail(mailOptions):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            this.transporter.sendMail(mailOptions,(err)=>{
                if(err){
                    reject(false)
                }else{
                    resolve(true)
                }
            })
        })
}
}