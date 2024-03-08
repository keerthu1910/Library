import dotenv from 'dotenv';

if(dotenv) dotenv.config();

export const config = {
    port:process.env.PORT || 3001
}