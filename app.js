import { ok } from "assert";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from "crypto"
  // import {bot} from "./bot.js";
     import {botToken} from "./bot.js";

  //  const express = require('express');
   
  //  const cors = require('cors');

   

   const app = express();

   //  const corsOptions = {
   //   origin: 'https://miniappbote.onrender.com',

   //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

   //   allowedHeaders: 'Content-Type,Authorization',
   // };

// app.use(express.json());// ОНа берет текст каторый прелетает на сервер и из нее фармулирует текст

 const port = 3000;
// bot.command("start", (ctx) => ctx.reply("hello user")); 
//  console.log("d");
 app.use('/css', express.static('css'));
 app.use('/js', express.static('js'));
 app.use('/images',express.static('images'))
 app.get('/', (req, res) => {
 res.sendFile('index.html', {root: '.'})
 });



 app.post("/api/initData", (req, res) => {
   const check_initdata = req.body;
   
   const decoded = decodeURIComponent(check_initdata); 

   console.log("initdate:   " + decoded);
    // res.send("ok")

    const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken);

    const arr = decoded.split('&');
    const hashIndex = arr.findIndex(str => str.startsWith('hash='));
    const hash = arr.splice(hashIndex)[0].split('=')[1];

    arr.sort((a, b) => a.localeCompare(b));

    const dataCheckString = arr.join('\n');

    const _hash = crypto
    .createHmac('sha256', secret.digest())
    .update(dataCheckString)
    .digest('hex');

    if(_hash === hash){
     console.log("подпись проверена")
    }
 })


 app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
//  bot.start();
 });




// "query_id=AAGFrV43AAAAAIWtXjf6BsIS&user=%7B%22id%22%3A928951685%2C%22first_name%22%3A%22%D0%94%D0%B0%D0%BC%D0%B8%D1%80%22%2C%22last_name%22%3A%22%D0%A2%D0%B0%D1%82%D0%B0%D1%80%D0%BE%D0%B2%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1721317700&hash=817b6e69de31ad08e1cf362df714581e92f5d2ee84d93a35b91d0f6727781f64"