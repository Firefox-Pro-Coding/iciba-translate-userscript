// ==UserScript==
// @name               iciba划词翻译
// @namespace          noe132.com
// @author             noe132
// @include            http://*
// @include            https://*
// @exclude            http://www.iciba.com*
// @grant              GM_xmlhttpRequest
// @grant              GM_addStyle
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_registerMenuCommand
// @icon               http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @require            https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.min.js
// @version            3.3.1
// @supportURL         http://tieba.baidu.com/f?kw=firefox
// ==/UserScript==


/* ------------------ changelog -------------------
 * update INFO:
 * update 2017/05/09 : bug fix
 * update 2017/04/20 : 添加鼠标悬浮触发查词
 * update 2017/04/19 : 终于搞明白怎么定位了
 * update 2017/04/18 : 添加最大选择数设置和默认行为设置，优化样式
 * update 2017/04/12 : 添加了百度翻译谷歌翻译按钮
 * update 2017/04/12 : 搞了个字符串压缩~解压字符串速度还可以
 * update 2017/04/11 : bug fix，重写鼠标事件定位方法
 * update 2017/03/24 : 添加鼠标事件10ms延迟
 * update 2017/03/24 : 用babel翻译async function，可以支持到chrome33
 * update 2017/03/23 : 使用百度翻译API，iciba的程序员不更新api
 * update 2016/12/23 : trim查询字符串，更新版本号到3
 * update 2016/09/23 : mouseClick只能左键触发
 * update 2016/08/19 : 不知为何connect属性未加上
 * update 2016/05/30 : 样式修改
 * update 2016/05/03 : 解释处理修改
 * update 2016/05/02 : 样式修改
 * update 2016/05/01 : 样式修改
 * update 2016/04/22 : 老版本浏览器兼容性修复
 * update 2016/04/17 : 样式修改
 * update 2016/04/17 : 重写
 * update 2016/04/09 : 样式小改
 * update 2016/03/27 : 紧急修复。。。
 * update 2016/03/16 : 样式修正
 * update 2016/03/05 : 样式小改
 * update 2015/07/31 : 貌似之前的wordpress判断不太给力，干脆带wp-admin的都干掉
 * update 2015/07/12 : 去除wp-admin/post.php页面，防止wordpress编辑文章自动添加div
 * update 2015/05/19 : 设置查词默认为小写
 * update 2015/05/09 : 按Ctrl可以使小蓝圈隐藏起来（暂时）
 * update 2015/01/03 : 样式全加了 !important 提高优先级
 * update 2014/12/24 : 添加设置选项（可当且仅当按住ctrl键显示翻译按钮）
 * update 2014/12/20 : 修正语法错误。。。
 * update 2014/12/19 : 搜词BUG修复，修正点击定位~
 * update 2014/12/10 : 严格模式'use strict'，提高性能
 * update 2014/12/04  : 贴吧图册预览修正
 * update 2014/11/16 : 更换mouseClick的触发条件为mouseup
 * update 2014/11/14 : 添加输入框查词，修正定位不正确。
 * ------------------------------------------------ */

'use strict'

let Iciba = function() {
  this.init()
}

Iciba.prototype.auto_active = 1 //没用~
Iciba.prototype.ctrlKey_actived = null

// init 初始化对象 插入样式 读取设置 绑定事件
Iciba.prototype.init = function() {
  let _this = this
  let style = '#icibaCirclePointer{font-family:"Microsoft Yahei",serif,sans-serif!important;display:block!important;z-index:10000!important;overflow:hidden!important;width:20px!important;height:20px!important;border:1px solid #555!important;border-radius:100px!important;background:#ABD!important;box-shadow:0 0 3px #111!important;opacity:.7!important;transition:.05s!important;box-sizing:border-box!important;-moz-box-sizing:border-box!important}#icibaCirclePointer:hover{opacity:1!important}#icibaCirclePointer:active{border:1px solid #353535!important;background:#90a2c4!important;box-shadow:0 0 3px #222!important}#icibaResultContainer{z-index:10000!important;width:auto!important;height:auto!important;max-width:320px!important;border:none!important;background:#EEE!important;box-shadow:0 0 8px 1px #999!important;letter-spacing:0!important}#icibaResultContainer *{box-sizing:border-box!important;-moz-box-sizing:border-box!important}#iciba_search_box{display:block!important;margin:0!important;padding:0!important;width:100%!important;border-bottom:1px solid #CCC!important;font-size:0!important;letter-spacing:0!important;word-spacing:0!important}#icibaResultContainer input{position:static!important;margin:0!important;border-radius:0!important;box-shadow:none!important;box-sizing:border-box!important;-moz-box-sizing:border-box!important;display:inline-block!important;vertical-align:middle!important;float:none!important}#iciba_search_box>#icibaSearchInput{padding:0 7px!important;width:calc(100% - 87px)!important;border:none!important;height:28px!important;line-height:28px!important;background:white!important;color:#666!important;font-size:14px!important;letter-spacing:0!important;font-family:"Microsoft Yahei",serif,sans-serif!important}#icibaSearchInput:hover,#icibaSearchInput:focus{box-shadow:0 0 3px 0 #CCC inset!important;color:#222!important}.icibaSearchButton{padding:0!important;width:29px!important;height:28px!important;border-radius:0!important;background-color:#EEE!important;background-repeat:no-repeat!important;border:none!important;border-left:1px solid #CCC!important}.icibaSearchButton:hover{background-color:#fafafa!important}.icibaSearchButton:active{background-color:#e5e5e5!important;box-shadow:0 0 2px #888 inset!important}#icibaSearchButton{background-image:url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTYuOTY2IDU2Ljk2NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTYuOTY2IDU2Ljk2NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogICAgPHBhdGgKICAgICAgICBkPSJNNTUuMTQ2LDUxLjg4N0w0MS41ODgsMzcuNzg2YzMuNDg2LTQuMTQ0LDUuMzk2LTkuMzU4LDUuMzk2LTE0Ljc4NmMwLTEyLjY4Mi0xMC4zMTgtMjMtMjMtMjNzLTIzLDEwLjMxOC0yMywyMyBzMTAuMzE4LDIzLDIzLDIzYzQuNzYxLDAsOS4yOTgtMS40MzYsMTMuMTc3LTQuMTYybDEzLjY2MSwxNC4yMDhjMC41NzEsMC41OTMsMS4zMzksMC45MiwyLjE2MiwwLjkyIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyBzLTE3LTcuNjI2LTE3LTE3UzE0LjYxLDYsMjMuOTg0LDZ6IiBzdHlsZT0iZmlsbDogcmdiKDE4NywgMTg3LCAxODcpOyI+PC9wYXRoPgo8L3N2Zz4K")!important;background-position:center!important;background-size:15px 15px!important}#icibaSearchButtonTranslateGoogle{background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNzAgNzAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CiAgICA8cGF0aAogICAgICAgIGZpbGw9IiM0Mjg1RjQiCiAgICAgICAgZD0iTTM1LjI5IDQxLjQxVjMySDY3Yy4zMSAxLjY0LjQ3IDMuNTguNDcgNS42OCAwIDcuMDYtMS45MyAxNS43OS04LjE1IDIyLjAxLTYuMDUgNi4zLTEzLjc4IDkuNjYtMjQuMDIgOS42NkMxNi4zMiA2OS4zNS4zNiA1My44OS4zNiAzNC45MS4zNiAxNS45MyAxNi4zMi40NyAzNS4zLjQ3YzEwLjUgMCAxNy45OCA0LjEyIDIzLjYgOS40OWwtNi42NCA2LjY0Yy00LjAzLTMuNzgtOS40OS02LjcyLTE2Ljk3LTYuNzItMTMuODYgMC0yNC43IDExLjE3LTI0LjcgMjUuMDMgMCAxMy44NiAxMC44NCAyNS4wMyAyNC43IDI1LjAzIDguOTkgMCAxNC4xMS0zLjYxIDE3LjM5LTYuODkgMi42Ni0yLjY2IDQuNDEtNi40NiA1LjEtMTEuNjVsLTIyLjQ5LjAxeiIvPgo8L3N2Zz4K")!important;background-size:15px 15px!important;background-position:center!important}#icibaSearchButtonTranslateBaidu{background-image:url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iOTBweCIgaGVpZ2h0PSI5MHB4IiB2aWV3Qm94PSIwIDAgOTAgOTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDkwIDkwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQoJPHBhdGggaWQ9IkJhaWR1IiBkPSJNMjQuMDEyLDMzLjU4OGMwLjUzNSw3LjY1LTMuNjExLDE0LjE3My05LjI2NCwxNC41N0M5LjA5Nyw0OC41NTUsNC4wODEsNDIuNjc1LDMuNTQ2LDM1LjAyMyAgIGMtMC41MzUtNy42NSwzLjYxMS0xNC4xNzQsOS4yNjQtMTQuNTcxQzE4LjQ2MiwyMC4wNTYsMjMuNDc4LDI1LjkzNywyNC4wMTIsMzMuNTg4eiBNNjIuOTM4LDEuODc0ICAgYy01LjQ5MS0xLjQwMS0xMS40NzQsMy40ODktMTMuMzYyLDEwLjkyMWMtMS44OTUsNy40MzIsMS4wMjMsMTQuNTkyLDYuNTE0LDE1Ljk5M2M1LjQ5LDEuNCwxMS40NzYtMy40ODgsMTMuMzY1LTEwLjkyMSAgIEM3MS45MTQsOC4xOTQsNjQuMjUzLDIuMjA4LDYyLjkzOCwxLjg3NHogTTc1LjgxMiwyNi45MjVjLTUuNzc1LDAuMDg2LTEwLjM1OSw1LjU3OS0xMC4yMzIsMTQuMDg4ICAgYzAuMTI3LDguNTA4LDQuOTA0LDEyLjM4NywxMC42ODUsMTIuMzAxYzUuNzcyLTAuMDg2LDEwLjM1OC00LjEwMywxMC4yMzMtMTIuNjE0Qzg2LjMzLDI5LjYyNiw3Ny4xOTUsMjYuOTA1LDc1LjgxMiwyNi45MjV6ICAgIE0zMy45NjUsMGMtNS40OTYsMC05Ljk1MSw2LjE2LTkuOTUxLDEzLjc1NmMwLDcuNTk2LDQuNDU1LDEzLjc1Myw5Ljk1MSwxMy43NTNjNS40OTYsMCw5Ljk1Mi02LjE1Nyw5Ljk1Mi0xMy43NTMgICBDNDMuOTE3LDYuMTYsMzkuNDYxLDAsMzMuOTY1LDB6IE0zMi42OTMsNDIuNzJjLTMuMTc1LDQuNTYtNi43NzUsOS4wMTEtMTMuNzYyLDE0Ljg0M2MtNi45ODgsNS44MzItOS45NTIsOS44NTgtOS45NTIsMTUuNzk1ICAgYzAsNS45MzYsMy4zODgsMTUuNzk1LDEzLjAyMiwxNS43OTVjOS42MzQsMCwxNC4yOTItMi4xMjEsMjEuOTE1LTIuMTIxYzcuNjIzLDAsMTIuNzA3LDIuOTY5LDIyLjMzOSwyLjk2OSAgIGM5LjYzNSwwLDEzLjY1OC05LjExNywxMy42NTgtMTUuMDUzYzAtNS45MzctMS42NzItOS4yOTctOS4zOTEtMTYuMDcyYy00Ljk0NS00LjM0Ni05LjEzOC03Ljg4NS0xNS43MDItMTcuMDAyICAgYy0zLjI0NS00LjUwOC02Ljk4Ny01LjA4OC0xMC45MDQtNS4wODhDMzkuOTk5LDM2Ljc4NSwzNS44NywzOC4xNjMsMzIuNjkzLDQyLjcyeiIgc3R5bGU9ImZpbGw6IHJnYigzNSwgMzUsIDIyMCk7Ij48L3BhdGg+DQo8L3N2Zz4NCg==")!important;background-size:auto 15px!important;background-position:center!important}#icibaResultTextBox{margin:0!important;padding:10px 10px 0 10px!important;color:#222!important;text-align:left!important;font-size:14px!important;font-family:Arial,Helvetica,sans-serif!important;background:#fbfbfb!important;max-height:250px!important;overflow-x:hidden!important;overflow-y:auto!important}#icibaResultTextBox::after{content:""!important;display:block!important;background:transparent!important;height:10px!important}.icIBahyI-new_word{display:none!important}.icIBahyI-label_list>LABEL{display:inline!important}#icibaResultTextBox div,#icibaResultTextBox ul,#icibaResultTextBox li,#icibaResultTextBox p,#icibaResultTextBox form,#icibaResultTextBox input,#icibaResultTextBox label{margin:0!important;padding:0!important;font-weight:normal!important}#icibaResultTextBox input,#icibaResultTextBox button,#icibaResultTextBox textarea{font-weight:inherit!important;font-style:inherit!important;font-size:inherit!important;font-family:Arial,Helvetica,sans-serif!important}#icibaResultTextBox ul,#icibaResultTextBox li{list-style:none!important}#icibaResultTextBox a:focus{outline:none!important}#icibaResultTextBox img{border:0!important}#icibaResultTextBox strong{font-weight:100!important;font-family:"Segoe UI",Verdana,Lucida Sans Regular,Lucida Sans Unicode,Arial,sans-serif!important}#icibaResultTextBox .icIBahyI-dictbar{font-size:12px!important}#icibaResultTextBox .icIBahyI-register,#icibaResultTextBox .icIBahyI-right_bg,#icibaResultTextBox .icIBahyI-up,#icibaResultTextBox .icIBahyI-down{float:right!important}#icibaResultTextBox .icIBahyI-register{padding-left:25px!important}#icibaResultTextBox a.icIBahyI-text_black,#icibaResultTextBox .icIBahyI-nav_list strong{color:#333!important}#icibaResultTextBox a{color:#236fd4!important;text-decoration:underline!important}#icibaResultTextBox a:hover{color:#236fd4!important}#icibaResultTextBox .icIBahyI-handwrite,#icibaResultTextBox .icIBahyI-handwrite_over,#icibaResultTextBox .icIBahyI-drop_down{position:absolute!important;width:16px!important;height:16px!important;cursor:pointer!important}#icibaResultTextBox .icIBahyI-handwrite{top:14px!important;right:130px!important;background-position:0 -70px!important}#icibaResultTextBox .icIBahyI-handwrite_over{top:14px!important;right:130px!important;background-position:-18px -70px!important}#icibaResultTextBox #icIBahyI-dict_main{padding:0!important;text-align:left!important}#icibaResultTextBox .icIBahyI-dictbar{display:block!important;padding:0!important;height:auto!important;line-height:1.2!important}#icibaResultTextBox .icIBahyI-title{position:relative!important;padding:16px 17px 0 18px!important;color:#333!important;font-weight:bold!important;font-size:24px!important;font-family:arial,sans-serif!important;line-height:32px!important;word-break:break-all!important}#icibaResultTextBox .icIBahyI-dict_title{color:#333!important;font-weight:bold!important;font-family:arial,sans-serif!important}#icibaResultTextBox .icIBahyI-prons{display:block!important;padding:0!important;height:auto!important;white-space:normal!important;font-weight:700!important}#icibaResultTextBox .icIBahyI-dictbar .icIBahyI-fl{vertical-align:middle!important;font-size:12px!important;line-height:normal!important}#icibaResultTextBox .icIBahyI-dictbar .icIBahyI-fl *{font-size:12px!important}#icibaResultTextBox .icIBahyI-ico_sound{text-decoration:none!important;border:none!important;display:inline-block!important;overflow:hidden!important;margin:0!important;width:16px!important;height:16px!important;background:url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjMyLjE1MyAyMzIuMTUzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMzIuMTUzIDIzMi4xNTM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KCTxnIGlkPSJQbGF5Ij4KCQk8cGF0aAoJCQlzdHlsZT0iZmlsbC1ydWxlOiBldmVub2RkOyBjbGlwLXJ1bGU6IGV2ZW5vZGQ7IGZpbGw6IHJnYig4MCwgMTMwLCAyMjApOyIKCQkJZD0iTTIwMy43OTEsOTkuNjI4TDQ5LjMwNywyLjI5NGMtNC41NjctMi43MTktMTAuMjM4LTIuMjY2LTE0LjUyMS0yLjI2NiAgIGMtMTcuMTMyLDAtMTcuMDU2LDEzLjIyNy0xNy4wNTYsMTYuNTc4djE5OC45NGMwLDIuODMzLTAuMDc1LDE2LjU3OSwxNy4wNTYsMTYuNTc5YzQuMjgzLDAsOS45NTUsMC40NTEsMTQuNTIxLTIuMjY3ICAgbDE1NC40ODMtOTcuMzMzYzEyLjY4LTcuNTQ1LDEwLjQ4OS0xNi40NDksMTAuNDg5LTE2LjQ0OVMyMTYuNDcxLDEwNy4xNzIsMjAzLjc5MSw5OS42Mjh6Ij48L3BhdGg+Cgk8L2c+Cjwvc3ZnPgo=")!important;transition:0s!important;vertical-align:middle!important}#icibaResultTextBox .icIBahyI-ico_sound:hover{opacity:.7!important}#icibaResultTextBox .icIBahyI-ico_sound:active{opacity:.9!important}#icibaResultTextBox .icIBahyI-eg,#icibaResultTextBox .icIBahyI-us{padding-top:0!important;font-family:"lucida sans unicode",arial!important;display:block!important}#icibaResultTextBox .icIBahyI-new_word{float:left!important;padding-top:2px!important}#icibaResultTextBox .icIBahyI-new_word a{display:block!important;padding:3px 10px 0 20px!important;width:35px!important;height:17px!important;background-position:-274px 0!important;color:#999!important;font-weight:100!important;font-family:"Microsoft Yahei"!important}#icibaResultTextBox .icIBahyI-new_word a.icIBahyI-new_word2{background-position:-274px -19px!important}#icibaResultTextBox .icIBahyI-usually,#icibaResultTextBox .icIBahyI-prons{color:#666!important;font-weight:100!important}#icibaResultTextBox .icIBahyI-simple{margin:5px 0 5px 0!important}#icibaResultTextBox .icIBahyI-group_prons{clear:both!important;margin:0!important}#icibaResultTextBox .icIBahyI-group_prons .icIBahyI-second{float:none!important;padding-top:0!important}#icibaResultTextBox .icIBahyI-group_prons .icIBahyI-second .icIBahyI-eg{height:24px!important}#icibaResultTextBox .icIBahyI-group_pos{clear:both!important;overflow:hidden!important;color:#222!important;font-size:14px!important}#icibaResultTextBox .icIBahyI-group_pos *{font-size:14px!important}#icibaResultTextBox .icIBahyI-group_pos p:not(:last-of-type){margin-bottom:5px!important}#icibaResultTextBox .icIBahyI-label_list{float:left!important;padding-bottom:9px!important;width:87%!important;text-align:left!important}#icibaResultTextBox .icIBahyI-cn .icIBahyI-group_pos{color:#333!important}#icibaResultTextBox .icIBahyI-group_pos strong{color:#8d8d8d!important}#icibaResultTextBox .icIBahyI-margin_top{padding-top:6px!important}#icibaResultTextBox .icIBahyI-part_list a,#icibaResultTextBox .icIBahyI-tab_list li a,#icibaResultTextBox .icIBahyI-new_word a,#icibaResultTextBox .icIBahyI-part_main h3 a{text-decoration:none!important}#icibaResultTextBox .icIBahyI-tab_list{display:none!important}#icibaResultTextBox .icIBahyI-title{padding:13px 10px 1px!important;font-size:14px!important}#icibaResultTextBox .icIBahyI-group_pos{font-size:14px!important}#icibaResultTextBox .icIBahyI-group_pos .icIBahyI-fl{padding:0 6px 0 0!important;color:#999!important}#icibaResultTextBox .icIBahyI-group_pos span{vertical-align:baseline!important;line-height:normal!important;float:none!important;display:inline!important;padding:0!important}#icibaResultTextBox .icIBahyI-synon{color:#333!important;line-height:28px!important}#icibaResultTextBox .icIBahyI-suggest,#icibaResultTextBox .icIBahyI-suggest2{padding:0 0 3px 0!important;color:#333!important;word-wrap:break-word!important;font-size:14px!important;line-height:22px!important}#icibaResultTextBox .icIBahyI-suggest ul{padding:7px 0 4px!important;line-height:155%!important}#icibaResultTextBox .icIBahyI-suggest li{padding-left:14px!important;background-position:-134px -304px!important}#icibaResultTextBox .icIBahyI-suggest p{line-height:250%!important}#icibaResultTextBox .icIBahyI-suggest .icIBahyI-pr a{padding-right:3px!important}#icibaResultTextBox .icIBahyI-suggest p.icIBahyI-pr{margin-top:3px!important;line-height:18px!important}#icibaResultTextBox .icIBahyI-suggest .icIBahyI-pr a{display:inline-block!important;padding-right:10px!important}#icibaResultTextBox .icIBahyI-footer{padding:0!important;width:auto!important;color:#999!important;text-align:right!important;font-size:12px!important;line-height:18px!important}#icibaResultTextBox .icIBahyI-footer a{border:none!important;text-decoration:none!important;padding:0 3px 0 0!important;background:none!important;color:#236fd4!important;text-decoration:none!important;font-size:12px!important;line-height:18px!important}#icibaResultTextBox .icIBahyI-footer a:hover{color:#236fd4!important}#icibaResultTextBox .icIBahyI-text_blue{color:#236fd4!important}#icibaResultTextBox .icIBahyI-list li{padding:0 15px!important}#icibaResultTextBox .icIBahyI-li_dt,.icIBahyI-li_dd{display:inline!important;line-height:24px!important}#icibaResultTextBox .icIBahyI-li_dt{padding-right:5px!important;color:#232323!important}#icibaResultTextBox .icIBahyI-li_dd{color:#777!important}#ICIBA_TOO_LONG{padding-top:10px!important;padding-left:10px!important;font-size:12px!important}'
  GM_addStyle(style)
  GM_registerMenuCommand('iciba划词翻译设置(ctrl键查词设置)', () => _this.openSetting_ctrl())
  GM_registerMenuCommand('iciba划词翻译设置(设置最大查词长度)', () => _this.openSetting_length())
  GM_registerMenuCommand('iciba划词翻译设置(默认查词引擎)', () => _this.openSetting_default())
  GM_registerMenuCommand('iciba划词翻译设置(小蓝圈查词行为)', () => _this.openSetting_click_or_over())
  _this.loadSetting()
  _this.eventBinding()
}

// loadSetting 读取设置
Iciba.prototype.loadSetting = function() {
  // Ctrl键触发
  let _this = this
  _this.ctrlKey_actived = parseInt(GM_getValue('ctrlKey_actived') || '0')
  _this.maxSelectlength = GM_getValue('maxSelectlength') || '150'
  _this.defaultBehavior = GM_getValue('defaultBehavior') || '0'
  _this.mouseoverRatherThanClick = GM_getValue('mouseoverRatherThanClick') || '0'
  GM_setValue('ctrlKey_actived', _this.ctrlKey_actived)
  GM_setValue('maxSelectlength', _this.maxSelectlength)
  GM_setValue('defaultBehavior', _this.defaultBehavior)
  GM_setValue('mouseoverRatherThanClick', _this.mouseoverRatherThanClick)
}

// eventBinding 绑定事件
Iciba.prototype.eventBinding = function() {
  let _this = this
  window.addEventListener('mouseup', function(e) {
    setTimeout(() => {
      _this._mouseClick(e, _this)
    }, 10)
  }, false)
  window.addEventListener('keydown', function(e) {
    _this._keyDown(e, _this)
  }, false)
}

// openSetting_ctrl ctrl设置对话框
Iciba.prototype.openSetting_ctrl = function() {
  let _this = this
  _this.ctrlKey_actived = confirm('按住ctrl键（当且仅当）开启翻译？') ? 1 : 0
  GM_setValue('ctrlKey_actived', _this.ctrlKey_actived)
}

// openSetting_length 最大取词长度设置对话框
Iciba.prototype.openSetting_length = function() {
  let _this = this
  let len = prompt(`最大划词翻译长度（留空为默认值150字，当前为 ${_this.maxSelectlength}）？`) || '150'
  try {
    len = parseInt(Number(len))
  } catch (e) {
    alert('输入数据无效，操作取消！')
    return
  }
  let confirm_len = true
  if (len < 10) {
    confirm_len = confirm(`你确定要设置一个这么小的数值(${len})？`)
  }
  if (!confirm_len) {
    return
  }
  _this.maxSelectlength = len
  GM_setValue('maxSelectlength', _this.maxSelectlength)
}

// openSetting_default 默认行为设置对话框
Iciba.prototype.openSetting_default = function() {
  let _this = this
  let behavior = prompt(`点击蓝色小圆圈后的默认行为（输入相应的数值，当前为 ${_this.defaultBehavior}）？(0:默认iciba划词翻译 , 1:百度翻译 , 2:谷歌翻译)'`) || '0'
  if (behavior === '0') {
    _this.defaultBehavior = '0'
  } else if (behavior === '1') {
    _this.defaultBehavior = '1'
  } else if (behavior === '2') {
    _this.defaultBehavior = '2'
  } else {
    alert('输入数据无效，操作取消！')
  }
  GM_setValue('defaultBehavior', _this.defaultBehavior)
}

// openSetting_ctrl ctrl设置对话框
Iciba.prototype.openSetting_click_or_over = function() {
  let _this = this
  _this.mouseoverRatherThanClick = confirm('是否将「鼠标点击小蓝圈」 打开查词框行为改为「鼠标移至小蓝圈」打开查词框？') ? '1' : '0'
  GM_setValue('mouseoverRatherThanClick', _this.mouseoverRatherThanClick)
}

// showIcibaCirclePointer 显示并定位小圆点
Iciba.prototype.showIcibaCirclePointer = function(e) {
  let _this = this

  let de = _this.getPosition(e)
  _this.icibaCirclePointer = document.createElement('div')
  _this.icibaCirclePointer.id = 'icibaCirclePointer'
  _this.icibaCirclePointer.style.position = 'absolute'
  _this.icibaCirclePointer.style.top = (de.re.offsetTop + 7) + 'px'
  _this.icibaCirclePointer.style.left = (de.re.offsetLeft + 5) + 'px'
  _this.icibaCirclePointer.setAttribute('keyword', window.getSelection().toString().toLowerCase().trim())

  let mouseoverTimout = 0
  if (_this.mouseoverRatherThanClick === '1') {
    _this.icibaCirclePointer.addEventListener('mouseenter', e => {
      mouseoverTimout = setTimeout(() => {
        _this.showContainer(e, _this)
      }, 100) // 100ms delay prevents accident mouseover
    }, false)
    _this.icibaCirclePointer.addEventListener('mouseleave', () => {
      clearTimeout(mouseoverTimout)
    }, false)
  } else {
    _this.icibaCirclePointer.addEventListener('click', e => {
      _this.showContainer(e, _this)
    }, false)
  }

  document.body.appendChild(_this.icibaCirclePointer)
}

// removeCirclePointer 去除小圆点
Iciba.prototype.removeCirclePointer = function() {
  let _this = this
  if (_this.icibaCirclePointer) {
    document.body.removeChild(_this.icibaCirclePointer)
  }
  _this.icibaCirclePointer = null
}

// showContainer 显示并定位查词框
Iciba.prototype.showContainer = function(e, _this) {
  let word = _this.icibaCirclePointer.getAttribute('keyword')
  _this.removeCirclePointer()
  _this.createContainer(e)
  _this.containerLoadData(word, 'auto')

  // getData(word,e,bodyClientHeight,bodyClientWidth,windowinnerHeight,windowinnerWidth,htmlClientHeight,htmlClientWidth)
}

// createContainer 创建查词框
Iciba.prototype.createContainer = function(e) {
  let _this = this

  _this.icibaResultContainer = document.createElement('div')
  _this.icibaResultContainer.id = 'icibaResultContainer'
  _this.icibaResultContainer.style.position = 'absolute'
  _this.icibaResultContainer.innerHTML = '\
    <div id="iciba_search_box">\
        <input id="icibaSearchInput" type="text" />\
        <input id="icibaSearchButtonTranslateBaidu" class="icibaSearchButton" type="button" />\
        <input id="icibaSearchButtonTranslateGoogle" class="icibaSearchButton" type="button" />\
        <input id="icibaSearchButton" class="icibaSearchButton" type="button" />\
    </div>\
    <div id="icibaResultTextBox"></div>'

  _this.icibaResultTextBox = _this.icibaResultContainer.querySelector('#icibaResultTextBox')
  _this.icibaSearchInput = _this.icibaResultContainer.querySelector('#icibaSearchInput')
  _this.icibaSearchButton = _this.icibaResultContainer.querySelector('#icibaSearchButton')
  _this.icibaSearchButtonTranslateBaidu = _this.icibaResultContainer.querySelector('#icibaSearchButtonTranslateBaidu')
  _this.icibaSearchButtonTranslateGoogle = _this.icibaResultContainer.querySelector('#icibaSearchButtonTranslateGoogle')

  // bind events
  _this.icibaSearchInput.addEventListener('keypress', function(e) {
    if (e.target === _this.icibaSearchInput) {
      if (e.keyCode != 13) {
        return
      }
    }
    _this.containerLoadData(_this.icibaSearchInput.value, 'auto')
  }, false)
  _this.icibaSearchButton.addEventListener('click', function() {
    _this.containerLoadData(_this.icibaSearchInput.value, 'iciba')
  }, false)
  _this.icibaSearchButtonTranslateBaidu.addEventListener('click', function() {
    _this.containerLoadData(_this.icibaSearchInput.value, 'baidu')
  }, false)
  _this.icibaSearchButtonTranslateGoogle.addEventListener('click', function() {
    _this.containerLoadData(_this.icibaSearchInput.value, 'google')
  }, false)

  _this.containerSetPosition(e)
  document.body.appendChild(_this.icibaResultContainer)
}

// removeContainer 去除查词框
Iciba.prototype.removeContainer = function() {
  let _this = this
  if (_this.icibaResultContainer) {
    document.body.removeChild(_this.icibaResultContainer)
    _this.icibaResultContainer = null
    _this.icibaResultTextBox = null
    _this.icibaSearchInput = null
    _this.icibaSearchButton = null
  }
}

// containerSetPosition 定位查词框
Iciba.prototype.containerSetPosition = function(e) {
  let _this = this
  let de = _this.getPosition(e)
  if (de.re.detectHeight - de.re.offsetTop < 220 || de.window.innerHeight - e.clientY < 180) {
    // TODO using bottom position
    _this.icibaResultContainer.style.top = 'auto'
    _this.icibaResultContainer.style.bottom = (de.re.positionHeight - de.re.offsetTop) + 'px'
  } else {
    _this.icibaResultContainer.style.top = de.re.offsetTop + 'px'
    _this.icibaResultContainer.style.bottom = 'auto'
  }

  if (de.re.detectWidth - de.re.offsetLeft < 220 || de.window.innerWidth - e.clientY < 180) {
    // using right position
    _this.icibaResultContainer.style.left = 'auto'
    _this.icibaResultContainer.style.right = (de.re.positionWidth - de.re.offsetLeft) + 'px'
  } else {
    _this.icibaResultContainer.style.left = de.re.offsetLeft + 'px'
    _this.icibaResultContainer.style.right = 'auto'
  }
  _this.icibaResultContainer.style.display = ''
}

// containerLoadData 获取数据查词
Iciba.prototype.containerLoadData = function(word, engine) {
  let _this = this
  _this.icibaResultTextBox.innerHTML = 'Loading......'
  _this.icibaSearchInput.value = word
  engine = engine === 'auto' ? { 0: 'iciba', 1: 'baidu', 2: 'google' }[_this.defaultBehavior] : engine
  let get_iciba_result = async function(word) {
    let result = await got({
      method: 'GET',
      referer: 'http://www.iciba.com/',
      url: 'http://open.iciba.com/huaci/dict.php?word=' + word,
      timeout: 10000
    })
    let text = result.replace(/\\/g, '')
    text = text.match(/dict\.innerHTML='(.*)'/)[1]
    text = text.replace(/icIBahyI-'ico_sound'/g, '"icIBahyI-ico_sound"')
    return text
  }
  let get_lang_detect = async function(word) {
    let formdata = new FormData()
    formdata.append('query', encodeURIComponent(Array.from(word).splice(0, 25).join('')))
    let lang_detect = await got({
      method: 'POST',
      referer: 'http://fanyi.baidu.com',
      url: 'http://fanyi.baidu.com/langdetect',
      data: formdata,
      timeout: 5000,
    })
    let result = JSON.parse(lang_detect)
    if (result.error === 0) {
      return result.lan
    } else {
      throw new Error('翻译文本语言未知！')
    }
  }
  let get_baidu_translation_result = async function(lang_detect, target_lang, word) {
    let translation_formData = new FormData()
    translation_formData.append('from', lang_detect)
    translation_formData.append('to', target_lang)
    translation_formData.append('query', word)
    translation_formData.append('transtype', 'translang')

    let result = await got({
      method: 'POST',
      referer: 'http://fanyi.baidu.com',
      url: 'http://fanyi.baidu.com/v2transapi',
      data: translation_formData,
      timeout: 5000
    })

    result = JSON.parse(result)
    if (result.trans_result.type === 2 && result.trans_result.status === 0) {
      return result.trans_result.data[0].dst
    } else {
      throw new Error('翻译出错！')
    }
  }
  let get_google_translation_result = async function(word, tl = 'zh-CN', override = 0) {
    let token = (await _this.get_google_translate_token(word)).value
    let url = 'https://translate.google.cn/translate_a/single?'
    let query_string = `client=t&sl=auto&tl=${tl}&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&tk=${token}`
    let result = await got({
      method: 'POST',
      headers: {
        'Referer': 'https://translate.google.cn/',
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
      },
      url: url + query_string,
      data: `q=${word}`,
      timeout: 5000
    })
    result = JSON.parse(result)
    // detected language
    if (result[8][0][0] === 'zh-CN' && override === 0) {
      return get_google_translation_result(word, tl = 'en', 1)
    } else {
      return result[0].map(v => v[0] ? v[0] : '').join('')
    }
  }


  let get_translation = async function(word, engine) {
    if (engine === 'iciba') {
      let iciba_result = await get_iciba_result(word)
      _this.icibaResultTextBox.innerHTML = iciba_result
      let playbtn = document.querySelectorAll('.icIBahyI-ico_sound')
      if (playbtn.length != 0) {
        for (let i = 0; i < playbtn.length; i++) {
          playbtn[i].setAttribute('mp3', playbtn[i].getAttribute('onclick').match(/asplay_hanci\('(.*)'\)/)[1])
          playbtn[i].removeAttribute('onclick')
          playbtn[i].addEventListener('click', _this.playSound, false)
        }
      }
    } else if (engine === 'baidu') {
      let lang_detect = (await get_lang_detect(word))
      let target_lang = lang_detect === 'zh' ? 'en' : 'zh'
      let baidu_translation_result = await get_baidu_translation_result(lang_detect, target_lang, word)
      _this.icibaResultTextBox.innerHTML = baidu_translation_result
    } else if (engine === 'google') {
      let google_translation_result = await get_google_translation_result(word)
      _this.icibaResultTextBox.innerHTML = google_translation_result
    }
  }

  get_translation(word, engine).catch((err) => {
    _this.icibaResultTextBox.innerHTML = err.message
  })
}

// https://github.com/matheuss/google-translate-token
// get_google_translate_token 获取google translate token
Iciba.prototype.get_google_translate_token = function(word) {
  window.TKK = GM_getValue('TKK') || '0'
  /* eslint-disable */
  // BEGIN
  function sM(a) {
    var b
    if (null !== yr)
      b = yr
    else {
      b = wr(String.fromCharCode(84))
      var c = wr(String.fromCharCode(75))
      b = [b(), b()]
      b[1] = c()
      b = (yr = window[b.join(c())] || "") || ""
    }
    var d = wr(String.fromCharCode(116)),
      c = wr(String.fromCharCode(107)),
      d = [d(), d()]
    d[1] = c()
    c = "&" + d.join("") + "="
    d = b.split(".")
    b = Number(d[0]) || 0
    for (var e = [], f = 0, g = 0; g < a.length; g++) {
      var l = a.charCodeAt(g)
      128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023),
            e[f++] = l >> 18 | 240,
            e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224,
          e[f++] = l >> 6 & 63 | 128),
        e[f++] = l & 63 | 128)
    }
    a = b
    for (f = 0; f < e.length; f++)
      a += e[f],
      a = xr(a, "+-a^+6")
    a = xr(a, "+-3^+b+-f")
    a ^= Number(d[1]) || 0
    0 > a && (a = (a & 2147483647) + 2147483648)
    a %= 1E6
    return c + (a.toString() + "." + (a ^ b))
  }

  var yr = null
  var wr = function(a) {
      return function() {
        return a
      }
    },
    xr = function(a, b) {
      for (var c = 0; c < b.length - 2; c += 3) {
        var d = b.charAt(c + 2),
          d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d),
          d = "+" == b.charAt(c + 1) ? a >>> d : a << d
        a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
      }
      return a
    }

  // END
  /* eslint-enable */

  function updateTKK() {
    return new Promise(function(resolve, reject) {
      var now = Math.floor(Date.now() / 3600000)
      if (Number(window.TKK.split('.')[0]) === now) {
        resolve()
      } else {
        got({
          method: 'GET',
          url: 'https://translate.google.cn/',
          timeout: 5000,
        }).then((result) => {
          var code = result.match(/TKK=(.*?)\(\)\)'\);/g)
          if (code) {
            eval(code[0])
            /* eslint-disable no-undef */
            if (typeof TKK !== 'undefined') {
              window.TKK = TKK
              GM_setValue('TKK', TKK)
            }
            /* eslint-enable no-undef */
          }
          resolve()
        }).catch(() => {
          reject()
        })
      }
    })
  }

  function get(text) {
    return updateTKK().then(function() {
      var tk = sM(text)
      tk = tk.replace('&tk=', '')
      return { name: 'tk', value: tk }
    }).catch(function(err) {
      throw err
    })
  }
  return get(word)
}

// conflictsResolve 不同网站的冲突解决
Iciba.prototype.conflictsResolve = function() {
  if (window.location.href.indexOf('http://tieba.baidu.com/photo/p?kw=') === 1) {
    GM_addStyle('.af_container{position:relative;}')
  }
}

// playSound 发声
Iciba.prototype.playSound = function(e) {
  let audio = document.createElement('audio')
  let source = document.createElement('source')
  source.type = 'audio/mpeg'
  source.src = e.target.getAttribute('mp3')
  source.autoplay = 'autoplay'
  source.controls = 'controls'
  audio.appendChild(source)
  audio.play()
}

// getPosition 计算鼠标事件对于元素应去的top left值
Iciba.prototype.getPosition = function(e) {
  // e.clienX e.clientY 是相对于浏览器viewport的位置（当前窗口）
  // e.pageX e.pageY 是相对于当前页面的位置（页面最左上角，不考虑 margin）
  // position:absolute 以父元素content-box的左上角定位
  // html 和 body 都为 static 时用 以当前 viewport 的大小的隐形元素 最上面定位 （不考虑 html body margin）
  // html 不为 static 时用 html 的 content-box 定位
  // body 不为 static 时用 body 的 content-box 定位
  // html 和 body 似乎不会发生margin-collapse
  // margin collapse 只发生在 margin-top 和 margin-bottom
  let de = {
    page: {
      offsetTop: e.pageY,
      offsetLeft: e.pageX
    },
    body: {
      rect: document.body.getBoundingClientRect(),
      scrollHeight: document.body.scrollHeight, // inner height of an element in pixels, including padding but not the horizontal scrollbar
      scrollWidth: document.body.scrollWidth, // inner width of an element in pixels. It includes padding but not the vertical scrollbar
      clientTop: document.body.clientTop, // top border width
      clientLeft: document.body.clientLeft, // left border width
      position: document.defaultView.getComputedStyle(document.body)['position'],

    },
    html: {
      rect: document.documentElement.getBoundingClientRect(), // coordinates relative to the viewport origin, of the top of the rectangle box
      scrollHeight: document.documentElement.scrollHeight, // inner height of an element in pixels, including padding but not the horizontal scrollbar
      scrollWidth: document.documentElement.scrollWidth, // inner width of an element in pixels. It includes padding but not the vertical scrollbar
      clientTop: document.documentElement.clientTop, // top border width
      clientLeft: document.documentElement.clientLeft, // left border width
      position: document.defaultView.getComputedStyle(document.documentElement)['position'],
    },
    window: {
      scrollY: window.scrollY, // number of pixels that the document has already been scrolled vertically.
      scrollX: window.scrollX, // number of pixels that the document has already been scrolled horizontally.
      innerHeight: window.innerHeight, // viewport height
      innerWidth: window.innerWidth, // viewport width
    },
    e: e,
    base: 'page',
    get re() {
      return this[this.base]
    }
  }

  de.page.positionHeight = de.window.innerHeight
  de.page.positionWidth = de.window.innerWidth
  de.page.detectHeight = de.html.scrollHeight
  de.page.detectWidth = de.html.scrollHeight

  de.body.positionHeight = de.body.scrollHeight
  de.body.positionWidth = de.body.scrollWidth
  de.body.detectHeight = de.body.scrollHeight
  de.body.detectWidth = de.body.scrollWidth

  de.html.positionHeight = de.html.scrollHeight
  de.html.positionWidth = de.html.scrollWidth
  de.html.detectHeight = de.html.scrollHeight
  de.html.detectWidth = de.html.scrollWidth

  // formula from jquery.offset
  de.body.offsetTop = e.pageY - (de.body.rect.top + de.window.scrollY + de.body.clientTop)
  de.body.offsetLeft = e.pageX - (de.body.rect.left + de.window.scrollX + de.body.clientLeft)
  de.html.offsetTop = e.pageY - (de.html.rect.top + de.window.scrollY + de.html.clientTop)
  de.html.offsetLeft = e.pageX - (de.html.rect.left + de.window.scrollX + de.html.clientLeft)

  if (de.html.position !== 'static') {
    de.base = 'html'
  } else if (de.body.position !== 'static') {
    de.base = 'body'
  }
  return de
}

// _keyDown keydown 事件处理函数
Iciba.prototype._keyDown = function(e, _this) {
  if (e.key === 'Control' && e.keyCode === 17) {
    if (!_this.ctrlKey_actived) {
      _this.removeCirclePointer()
    }
  }
}

// _isInsideOf 判断是否在内部
Iciba.prototype._isInsideOf = function(e, target) {
  // when target is not exist
  if (!target) {
    return false
  }
  let e_target = e.target
  while (e_target != target && e_target) {
    e_target = e_target.parentNode
  }
  if (e_target === target) {
    return true
  } else {
    return false
  }
}

// _mouseClick mousedown 事件处理函数
Iciba.prototype._mouseClick = function(e, _this) {
  // console.log('pageX:' + e.pageX + ',pageY:' + e.pageY + ',clientX:' + e.clientX + ',clientY:' + e.clientY)
  // ignore when click on icibaCirclePointer

  if (e.target.id === 'icibaCirclePointer') {
    return
  }

  if (e.button != 0) {
    return
  }

  // ignore when click insideof icibaResultContainer
  if (_this._isInsideOf(e, _this.icibaResultContainer)) {
    return
  }

  // Ctrl键触发
  if (_this.ctrlKey_actived) {
    if (!(e.ctrlKey === true && e.shiftKey === false && e.altKey === false)) {
      _this.removeCirclePointer()
      _this.removeContainer()
      return
    }
  }

  // remove all things
  if (_this.icibaResultContainer) {
    _this.removeContainer()
  }
  if (_this.icibaCirclePointer) {
    _this.removeCirclePointer()
  }

  // 显示iciba_icon
  if (window.getSelection().toString().length >= _this.maxSelectlength) {
    return // ignore when selection is too loing
  }

  if (window.getSelection().toString().length !== 0) {
    _this.showIcibaCirclePointer(e)
    return
  }

  // 去除iciba_icon
  if (window.getSelection().toString().length === 0) {
    _this.removeCirclePointer()
  }

  return
}

function got(param) {
  return new Promise((rs, rj) => {
    let obj = {
      method: 'GET',
      referer: '',
      url: '',
      timeout: 10000,
      ontimeout() {
        rj(new Error('网络超时！'))
      },
      onerror() {
        rj(new Error('网络错误！'))
      },
      onload(response) {
        if (response.status != 200) {
          rj(new Error('网络错误！'))
        }
        rs(response.responseText)
      }
    }
    for (let x in param) {
      obj[x] = param[x]
    }
    GM_xmlhttpRequest(obj)
  })
}

{
  new Iciba()
}