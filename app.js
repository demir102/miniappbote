import express from "express";
// import path from 'path';
// import { fileURLToPath } from 'url';
// import crypto, { checkPrime } from "crypto"
import { checkInitData } from "./js/checkInitData.js";
  // import {bot} from "./bot.js";
     import {botToken} from "./bot.js";

  //  const express = require('express');
   
  //  const cors = require('cors');

   
// const PORT = process.env.PORT || 3000; 
   const app = express();

 const port = 3000;

// bot.command("start", (ctx) => ctx.reply("hello user")); 
//  console.log("d");

// app.use(express.static('public'));
 app.use('/css', express.static('css'));
 app.use('/js', express.static('js'));
 app.use('/images',express.static('images'))
 app.get('/', (req, res) => {
 res.sendFile('index.html', {root: '.'})
 });

 app.get("https://miniappbote.onrender.com/api/initData", (req, res) => {
  console.log("ok");
  
 })

 app.post("https://miniappbote.onrender.com/api/initData", (req, res) => {
  console.log("ok!");
  
  const isValid = checkInitData(req.body.initData, botToken);
  res.json({isValid: isValid,})
})


 app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
  // bot.start();
 });



