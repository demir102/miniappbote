import { Bot, Context } from "grammy";
import { writeFile, createWriteStream } from "fs";
import { Readable } from "stream";

let botToken = process.env.BOT_TOKEN2


let bot = new Bot(botToken);

export { bot };
export { botToken };
