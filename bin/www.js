import http from 'http';
import app from '../app.js';
import env from '../env.js';

const server = http.createServer(app);

server.listen(env.PORT,()=>{
    console.log('Server Started.');
})

server.on('error',(error)=>{
    console.log(error);
});