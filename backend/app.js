const http = require('http');
const Koa = require('koa');
const staticFiles = require('koa-static');
const koaBody = require('koa-body');
const router = require('./router')

const app = new Koa();
app.use(staticFiles('static'))
app.use(koaBody())
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});
app.use(router.routes())

app.listen(3000, () => {
  console.log('dock backend app is running on 3000')
})

