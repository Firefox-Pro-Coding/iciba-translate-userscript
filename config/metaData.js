// ==UserScript==
// @name               iciba划词翻译
// @namespace          noe132.com
// @author             noe132
// @include            http://*
// @include            https://*
// @include            file://*
// @exclude            http://www.iciba.com*
// @grant              GM_xmlhttpRequest
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_registerMenuCommand
// @grant              GM.xmlHttpRequest
// @grant              GM.getValue
// @grant              GM.setValue
// @grant              unsafeWindow
// @icon               http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version            {{ version }}
// @supportURL         https://github.com/Firefox-Pro-Coding/iciba-translate-userscript
// @description        简单好用的划词查词翻译。支持iciba，google字典，google翻译，百度翻译等多种接口
// ==/UserScript==

// this file was compiled by webpack.

// corejs@3 polyfill bug in tampermonkey env
if (!window.Symbol) {
  window.Symbol = unsafeWindow.Symbol
}
