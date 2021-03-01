# umi

## 加速编译

.umirc.ts

```js
export default{
    nodeModulesTransform{
        type:'none',
        exclude:[],
    },
    routes:[
        {path: '/',component:"@/pages/index"}
    ]
}
```

## shell命令

* umi g page user/index --typescript --less

## 文件快捷命令

* rfch快速创建react模板

## 配置子路由

```js
export default{
    routes:[
        {path:'login',component:'@/pages/login'},
        // 增加layout组件
        {path:'/',component:'@/layout/index',
        routes:[
            {path:'list',component:'list'},
            {path:'/admin',component:'admin'}
        ]
        },
    ]
}
```

## tsx语法

```js
import React,{useEffect} from 'react';
interface BassicLayoutProps {}

const BassicLayout:React.FC<BasicLayoutProps> =props =>{
    const {children} = props;
    useEffect(()=>{},[]);
    return (
        <div></div>
    )
}

export default BasicLayout;
``` 