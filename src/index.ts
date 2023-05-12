import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from 'router';

const app = express();

/** 处理跨域资源共享（CORS）问题，允许跨域请求 */
app.use(cors({credentials: true}));

/** 压缩HTTP响应的内容，以减少传输的数据量 */
app.use(compression());

/** 解析HTTP请求的cookie */
app.use(cookieParser());

/** 解析HTTP请求的消息体，支持JSON、urlencoded和multipart格式 */
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});

const MONGO_URL = 'mongodb+srv://fantienan:723561807780@cluster0.cehgben.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', err => console.error(err));

app.use('/', router());