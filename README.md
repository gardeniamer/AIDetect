# AIDetect
该页面主要用来检测文本的AI概率。

AIDetect前端的主要技术栈是Vue3 + Vite + Pinia + VueRouter + ElementPlus。

VueRouter主要用来进行单页面的实现，Pinia用来存储主要数据（文件的各个信息，单个组件显示前提等等），实现组件间数据的互通。

前后端交互使用了Axios工具，跨域问题是在vite.config.js中对proxy进行了配置，相当于进行了跨域代理。

AI检测数据后不同段落显示不同颜色主要机理是：根据后端返回的parts属性进行分段判断，之后利用v-for遍历parts将每段渲染在页面上，之后每一段通过后端返回的每一段的AI概率，前端通过v-bind绑定动态class进行判断

AI检测中上一个和下一个主要依靠的时页面传参，每次都传入下一个（上一个）文件的id，之后再进行页面的重新渲染（通过跳转到loading页面再跳转回来）。

文件上传主要是依靠了ElementPlus的UpLoad组件，对上传的文件进行具体处理（使用了FileReader构造函数和mammoth组件得到文件的具体内容），之后利用axios交互后端得到具体数据。

文本上传同理，并没有依靠ElementPlus的UpLoad组件，直接进行处理。

文件的显示主要依靠了Pinia，对数据进行统一管理，之后利用v-for遍历数据即可。
