import connectDB from "./Config/DataBase";
import app from "./app";
import {config} from "./Config/config"

(async (): Promise<void> => {
    try {                

        await connectDB()
        app.listen(config.port,() => { 
            console.info(`Server spinning at port ${config.port}`)
        })
    } catch (error) {
        console.error(`App exited with error: ${error}`);        
        process.exit(1);
    }
})();