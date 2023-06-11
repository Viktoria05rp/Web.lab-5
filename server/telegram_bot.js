const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

module.exports = async (app, emitter) => {
 const router = await bot.createWebhook({
  domain: process.env.BASE_URL
 });

 bot.start((ctx) => {
  ctx.reply('Welcome, use command "/login" to use your auth token\n\nExample: /login 12345-54645-564564...');
 });

 bot.command('login', (ctx) => {
  const [command, id] = ctx.message.text.split(' ');
  const eventName = `login-${id}`;
  console.log(`Try to login id:${id}`);
  const userInfo = {
   firstName: ctx.from.first_name,
   lastName: ctx.from.last_name || '',
  };

  // if (!ctx.from.first_name && !ctx.from.last_name) {
  // }

  // if (!userInfo.firstName && !userInfo.lastName) {
  // }

  // Object.values(userInfo) => [<first name value>, <last name value>]
  if (!Object.values(userInfo).find(e => e.length)) {
   userInfo.firstName = ctx.from.username || ctx.from.id;
  }

  emitter.emit(eventName, userInfo);
 });

 app.use(router);
};