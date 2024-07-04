import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { bot } from "./bot.js";


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