## 一个标准的docker应用实例，包含前端后端
使用说明：
开发机器（本地）：
1.开发本项目
2.前端代码frontend需要在本地打包后推送dist目录，个人认为不需要构建docker
开发完成后推送
（未验证）
服务器：
1.安装docker环境，拉取镜像
2.拉取代码
3.安装依赖
npm install
npm install pm2 -g
3.docker-compose up -d --force-recreate --build
build每次重新构建镜像
d后台运行
docker-compose down 关闭容器运行
4.启动webhooks
pm2 start webhooks.js --watch
5.后续只要更新代码并推送，服务端就能自动更新