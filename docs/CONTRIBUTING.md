Contribution
--------------
工程使用 `typescript` 编写，使用 `vue` 作为前端框架，用 `webpack` 打包成最后的输出文件。
## 构建步骤
### 安装依赖
```shell
yarn install
```

### 编译
```
yarn build
```

### 开启开发服务器
```
yarn dev
```
默认监听在 3000 和 3001 端口。
使用 tampermonkey require local 来实现自动更新。参考[http://tampermonkey.net/index.php#development](http://tampermonkey.net/index.php#development) 中 Rapid development 一节

### Hot Reload
Hot Reload 使用 Websocket 来通讯。所以在CSP严格的页面(e.g. github.com)，hmr不会起作用。

## troubleshooting
分析包大小
```shell
yarn a
# or
yarn analyze
```
