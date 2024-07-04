import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { Bot, Context, InlineKeyboard, Keyboard } from "grammy";
import {writeFile,createWriteStream} from "fs";
import { Readable } from "stream";

const bot = new Bot("6345823380:AAEtun0-VQyxFCXYBPqtZHw6PK0Rcz-VXbU");

const app = express();
const port = 3000;

bot.command("start", (ctx) => ctx.reply("hello user"));

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/images',express.static('images'))

app.get('/', (req, res) => {

res.sendFile('index.html', {root: '.'})

});

app.listen(port, () => {

console.log(`Example app listening on port ${port}`) 

bot.start(); 

});