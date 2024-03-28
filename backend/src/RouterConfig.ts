import { AuthRoute } from "./routes/AuthRoute";
import { UserRoute } from "./routes/UserRoute";

export type Routers = AuthRoute | UserRoute;

interface IRoutesConfiguration{
    path:string,
    router:Routers
}

export const routes:IRoutesConfiguration[] = [
    {
        path:'/auth',
        router:new AuthRoute()
    },{
        path:'/user',
        router:new UserRoute()
    }
]