```javascript
// /ttranslatev3?isVertical=1& 
RichTranslateHelper.getInstEndPointUrl = g(n, t, i) => {
  return n + ("&IG=" + _G.IG + (t.length > 0 ? "&IID=" + t + "." + i : ""))
}

// apple
var i = transDom.input.textArea.value.replace(/\"/g, '\\"').replace(/\n/g, "\r\n")

// &fromLang=auto-detect&text=apple&to=en
var t = "&fromLang=" + transDom.input.langSelect.value + "&text=" + encodeURIComponent(i) + "&to=" + transDom.output.langSelect.value, n;

vt && (t += "&isVoice=1");
n = sj_gx();
iid = $('[data-iid]').dataset.iid
n.open("POST", RichTranslateHelper.getInstEndPointUrl(oi, transDom.iid, nu++), !0);
n.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
n.onreadystatechange = function() {
n.readyState === 4 && au(n)
}
;
n.send(t)
```
