import express,{Express} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { routes } from './RouterConfig';

export class App{
    private app:Express;

    constructor(){
        this.app = express();
        this.initMiddleWares();
        this.initRoutes();
    }
   
    private initMiddleWares(){
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors({
            origin:'http://127.0.0.1:5173',
            credentials:true
        }));
       
    }

    private initRoutes() {
        // Initialize the routers
        routes.forEach((config) => {
            this.app.use(config.path, config.router.getRouter());
        });
    }
   
    public start(){
        this.app.listen(config.port,()=>{
            console.log(`app listening in port ${config.port}`)
        })
    }

    public getAppInstance():Express{
        return this.app;
    }
}