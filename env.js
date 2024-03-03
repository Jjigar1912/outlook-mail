import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT : process.env.PORT,
    clientID : process.env.clientID , 
    clientSecret : process.env.clientSecret 
}