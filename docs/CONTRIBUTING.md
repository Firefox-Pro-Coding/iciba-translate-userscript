Contribution
--------------
## 概览
项目使用了 `typescript` 和 `vue` ，用 `webpack` 打包成最后的输出文件。

## 构建步骤
```shell
# 安装依赖
yarn install

# 构建并 lint
yarn build

# 开启开发服务器
yarn dev
```

dev server 默认监听在 13333 端口。  
dev server 开启了自动保存到磁盘，在脚本 metadata 中添加  
```js
// @require   file:///path/to/repo/iciba-translate-userscript/dist/iciba.user.js
```
刷新页面即会使用新的文件。  
dev 模式下，已经打开的页面会向 dev server 建立 weboscket 链接，有 hot update 时会自动更新。  

### Hot Reload
采用了 `webpack-hot-client` 而非 `webpack-dev-middleware`。  
Hot Reload 使用 Websocket 来通讯。所以在CSP严格的页面(e.g. github.com)不会起作用。

## 项目结构
```bash
+-- build       # 构建相关命令
+-- config      # 构建相关配置
+-- lintRules   # lint规则
+-- utils       # 相关工具函数
+-- src               # 源码
    +-- assets            # css和图片资源
    +-- components        # 组件
    +-- plugins           # 自定义插件
    +-- provider          # 翻译provider
    +-- service           # 全局服务
    +-- store             # store
    +-- types             # typescript types
    +-- util              # 工具函数
```

### svg
使用[https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/)压缩
