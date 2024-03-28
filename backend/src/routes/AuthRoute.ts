import {Router} from 'express';
import { AuthController } from '../controllers/AuthController';
export class AuthRoute {
   private router:Router = Router();
    private authController = new AuthController();
   constructor(){
    this.router.post('/login',this.authController.login);
    this.router.get('/logout',this.authController.logout);
    this.router.post('/resetpassword',this.authController.resetpassword);
    this.router.post('/mailresetpassword',this.authController.resetpasswordusingmail);
    this.router.post('/forgotpassword',this.authController.forgotPassword);
   }
   public getRouter():Router{
    return this.router;
   }
}