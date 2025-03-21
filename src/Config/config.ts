import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';


const envResult = dotenv.config({ path: '.env' });

if (envResult.error) {
  throw new Error("Couldn't load environment variables");
}

const parsedEnv = dotenvParseVariables(envResult.parsed || {});

export const config	 = {	
	port: parsedEnv.PORT as number,
	database: {
		connectionURI:parsedEnv.MONGO_DB_URI as string
	},
	jwt: {
		secret: parsedEnv.JWT_SECRET as string,
		expiresIn: parsedEnv.JWT_EXPIRES_IN as number,
	},
};
