const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURL

// 初始化实例
const app = new koa()

const router = new Router()

// 路由
router.get('/', async ctx => {
  ctx.body = {msg: 'hello koa,good!'}
})

// 连接数据库
mongoose.connect(db, 
                 {useNewUrlParser: true, useUnifiedTopology: true})
                 .then(() => {
                   console.log('数据库连接成功')
                 })
                 .catch(err => {
                   console.log(err)
                 })

// 配置路由
app.use(router.routes())
.use(router.allowedMethods())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started on ${port}`)
})

