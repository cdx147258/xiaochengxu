##小程序开发
1.app.js
    默认传的是第一个云环境，如果有两个环境需要指定环境id
    env:表示环境id
    traceUser:是否在将用户访问记录到用户管理中，在控制台中可见
```
wx.cloud.init({
    traceUser:true,
    env:applet-cheng-v6dkh
})
```