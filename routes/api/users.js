 const Router = require('koa-router')
 const router = new Router()
 const bodyParser = require('koa-bodyparser')
 const bcrypt = require('bcryptjs')

 // 引入user模板
 const User = require('../../modules/User')

 /** *
  * @route GET api/users/test
  * @desc 测试接口地址
  * @access 接口公开
  * **/
 router.get('/test',async ctx => {
   ctx.status = 200
   ctx.body = {msg: 'users works...'}
 })


 /** *
  * @route GET api/users/register
  * @desc 测试接口地址
  * @access 接口公开
  * **/

  router.post('/register', async ctx => {
    const result =  await User.find({phone: ctx.request.body.phone})
    if(result.length) {
      ctx.status = 200
      ctx.body = {
        code: 500,
        msg: '该用户已存在'
      }
    } else {
      const { name, sex, phone, password} = ctx.request.body
      let newUser = new User({
        name,
        sex,
        phone
      })

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync("password/\/", salt)
      newUser.password = hash
      
      await newUser.save().then(user => {
        console.log('数据添加成功')
       }).catch(err => {
         console.log(err)
         if(err) {throw err}
       })

      // 返回json数据
      ctx.body = {
        code: 200,
        msg: '数据添加成功',
        data: newUser
      }
    }
  })

 module.exports = router.routes()