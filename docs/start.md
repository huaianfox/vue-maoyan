
## 缘起

- 前公司一直是传统的开发模式，目前的主流的前端框架在项目中没有使用过，加之入行前端不久（截止2019也就一年半时间），主要精力放在前端基础的学习上
虽然对vue、react、angular等一直有关注，但也只是停留在看看文档，写写demo的阶段。是时候输出一个小项目了，不然出门都不好意思说自己是一个前端啦^_^!!，本着好记性不如烂笔头，记录开发过程中踩的坑和解决思路做一个总结，也可以给其他入门前端开发的朋友一些借鉴（：逃。

- 本项目尚未完结，将会继续增加页面，引入登录权限控制的后台，目标完整实现猫眼电影的全部逻辑，在写本文档的时候也是技术复盘和检查页面实现逻辑的错漏的时机，代码和文档一直在变动，行文有错漏、代码有bug或者其他疑问和好的建议欢迎点击右上角进入本人github提issue，共同探讨进步。如果本项目对于您有所帮助，到[github](https://github.com/huaianfox/vue-maoyan ':target=_blank') [star](https://github.com/huaianfox/vue-maoyan ':target=_blank') 一下，也是极好的！！！^_^

## Vue、React技术选型

Vue、React用哪个都是随便啦，vue更简单文档也相对齐全，能快速出效果，于是先用vue一个练练手，抽时间再用react实现

## 技术栈

Vue2.5 + Vuex + Vue Router + axios + ES6 + scss + flex + LocalStorge + Webpack + ESlint + git

## 数据接口
数据都来自猫眼电影线上接口，尽量以猫眼线上移动版为原型开发，部分页面样式少许改动

## 心得体会

设计合理的数据结构，真是简化业务逻辑复杂度的不二法门，特别是针对数据驱动视图的现代前端框架，个人感悟，有待商榷。

## 已开发页面

- [x] 热门电影
- [x] 即将上映
- [x] 城市列表
- [x] 搜索页面
- [x] 影院页面
- [x] 电影-影院
- [x] 影院-电影
- [x] 电影详情
- [x] 个人中心

## 都包含什么
- 数据结构设计
- 合理的项目目录规划
- Flex布局项目中使用
- iconfont使用
- 移动端点击穿透
- 图片懒加载
- 基础组件库如topbar、loading、弹出框、城市选择组件的封装
- 接口合并
- Promise
- axios获取数据
- Vuex的使用
- LocalStorge本地存储
- 开发和生成接口的设置
- 异步组件
- ......