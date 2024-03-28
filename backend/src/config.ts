import dotenv from 'dotenv';

if(dotenv) dotenv.config();

export const config = {
    port:process.env.PORT || 3001,
    admin:{
        admin_id:process.env.ADMIN_ID,
        admin_password:process.env.ADMIN_PASSWORD,
        admin_email:process.env.ADMIN_EMAIL,
        admin_mailpassword:process.env.ADMIN_EMAIL_PASSWORD
    },
    database:{
        host:process.env.HOST,
        port:parseInt(process.env.DATABASE_PORT || '3306'),
        username:process.env.DATABASE_USERNAME,
        password:process.env.DATABASE_PASSWORD,
        db:process.env.DATABASE_NAME
    },
    jwt:{
        secret:process.env.JWT_SECRET
    }
}