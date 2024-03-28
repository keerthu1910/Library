import {Router} from 'express';
import { UserController } from '../controllers/UserController';
export class UserRoute {
   private router:Router = Router();
    private userController = new UserController();
   constructor(){
    this.router.post('/newuser',this.userController.addprofile);
   }
   public getRouter():Router{
    return this.router;
   }
}