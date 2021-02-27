// 数据库配置，mongo取自docker-compose.yml中mongo服务
module.exports = {
  url: 'mongodb://mongo:27017',
  // url: 'mongodb://localhost:27017', // 本地测试
  dbName: 'mydockerapp1'
}