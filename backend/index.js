// backend/index.js
import express from "express";
import { session } from "express-session";
import { bodyParser } from "body-parser";
import { cors } from "cors";
import bcrypt from "bcrypt";
import db from "./config/db";

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

// 받은 메시지를 echo 필드에 담아 응답합니다.
app.post("/echo", (req, res) => {
    const message = req.body.message; 
    res.json({ echo: message }); 
});

// 받은 메시지를 echo 필드에 담아 응답합니다.
app.get("/api/echo/:message", (req, res) => {
    res.json({ echo: req.params.message });
}); 

if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.onMessage
) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        asyncFunction(request).then((result) => {
        sendResponse(result);
    });

    // 이벤트 핸들러가 비동기 응답을 반환하므로 true를 반환합니다.
    return true;
    });
}

const port = process.env.PORT || 5001; // 백엔드 서버 포트

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
