const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const db = require('./config/keys').mongoURL
const router = new Router()



// 初始化实例
const app = new koa()
// 插件配置
app.use(bodyParser())

// 引入user.js
const users = require('./routes/api/users')
router.use('/api/users', users)

app.use(router.routes())
.use(router.allowedMethods())


// 配置路由地址localhost:5000/api/users



// 连接数据库
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log(err)
  })

// mongoose.connection.once("open", () => {
//     console.log('数据库已成功连接111')
// })


// mongoose.connection.once("close", () => {
//     console.log('数据库已断开连接222')
// })

// setTimeout(() => {
//   mongoose.disconnect()
// },6000)





// router.post('/abc', async ctx => {
//   console.log(ctx)
//   ctx.body = {msg: 'hello koa,good!'}
// })


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started on ${port}`)
})

