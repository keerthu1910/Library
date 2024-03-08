import express,{Express} from 'express';
import cors from 'cors';
import { config } from './config';

export class App{
    private app:Express;

    constructor(){
        this.app = express();
        this.initMiddleWares();
    }

    private initMiddleWares(){
        this.app.use(express.json());
        this.app.use(cors());
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