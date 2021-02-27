const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

const course = JSON.parse(fs.readFileSync(path.resolve(__dirname, './models/goods.json')).toString())
const allData = []
course.tags.forEach(key => {
  course.data[key].forEach(cor => {
    allData.push(cor)
  })
})
const mongo = require('./models/db')

require("./models/init");
router.get('./', async (ctx, next) => {
  ctx.body = 'hello world'
})



router.get('/api/top', async (ctx, next) => {
  const allData  = await mongo.col("goods").find().toArray()
  const newData = [...allData]
  newData.sort((a, b) => {
    return b.solded - a.solded
  })
  ctx.body = {
    code: 0, 
    data: newData.slice(0, 5)
  }
})

router.get("/api/goods", async (ctx) => {
  const allData = await mongo.col("goods").find().toArray()
  const page = ctx.query.page || 1
  const start = (page - 1) * 10
  const end = start + 10
  ctx.body = {
    code: 0,
    data: allData.slice(start, end)
  }
})

router.get('/api/detail', async (ctx) => {

  const { id } = ctx.query
  course.tags.forEach(key => {
    course.data[key].forEach(cor => {
      console.log(cor.id, id)
      if (cor.id == id) {
        cor.desc = `北京开课吧科技有限公司，简称开课吧，是慧科集团旗下高端互联网职业教育平台。
          作为互联网从业者职业成长平台，开课吧致力于高效连接人与职业，
          基于创新科技提供智慧学习服务，通过线上班级在 kaikeba.com 的交付，
          用一线企业的实效实战教育产品，为互联网人提供职业成长服务。
          目前推出在线课程有:
          《Web全栈架构师》《JavaEE企业级分布式高级架构师》《百万年薪架构师》
          《Python爬虫商业项目班》《UXD全栈设计师》《产品经理特训营》《机器学习特训营》`
        ctx.body = {
          code: 0,
          data: {
            detail: cor,
          }
        }
      }
    })
  })
})

router.post('/api/login', (ctx) => {
  const { username, passwd } = ctx.request.body
  console.log(username, passwd)
  if (username == 'kaikeba' && passwd == "123") {
    ctx.body = {
      code: 0,
      data: {
        token: 'kaikebaisgood',
        role: 'admin',
        balance: 1000,
        username: "kaikeba"
      }
    }
  } else if (username == 'dasheng' && passwd == "123") {
    ctx.body = {
      code: 0,
      data: {
        token: 'kaikebaisgood',
        role: 'user',
        balance: 100,
        username: 'dasheng'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '密码错误'
    }
  }
})

module.exports = router
