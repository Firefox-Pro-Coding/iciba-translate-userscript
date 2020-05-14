Contribution
--------------
## 概览
项目使用了 `typescript` 和 `vue`，用 `webpack` 打包成最后的输出文件。

## 构建步骤
```shell
# 安装依赖
yarn install

# 构建并 lint
yarn build

# 开启开发服务器
yarn dev
```

### Hot Reload
`yarn dev` 会运行 `webpack-dev-server`，dev server 会监听在 13333 端口。  
dev server 开启了 `writeToDisk`，使用 tampermonkey 并在脚本 metadata 中添加下面代码，刷新页面就会使用新的文件。
```js
// @require   file:///path/to/repo/iciba-translate-userscript/dist/iciba.user.js
```

> 无法在 @require 里用 http 协议，因为chrome会对文件缓存，刷新后仍为老版本

dev 模式下，已经打开的页面会向 dev server 建立 weboscket 链接，有 hot update 时会自动更新。  

> Hot Reload 使用 Websocket 来通讯。所以在CSP严格的页面(e.g. github.com)不会起作用。


### svg
使用[https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/)压缩
