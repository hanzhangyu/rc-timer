
# rc-timer

Create a timed task in react. Uninstall automatically when component is unmounted.

[![NPM version](https://img.shields.io/npm/v/rc-timer.svg?style=flat)](https://npmjs.org/package/rc-timer)
[![Build Status](https://www.travis-ci.org/hanzhangyu/rc-timer.svg?branch=master)](https://www.travis-ci.org/hanzhangyu/rc-timer)
[![Coverage Status](https://coveralls.io/repos/github/hanzhangyu/rc-timer/badge.svg?branch=master)](https://coveralls.io/github/hanzhangyu/rc-timer?branch=master)
[![NPM downloads](http://img.shields.io/npm/dm/rc-timer.svg?style=flat)](https://npmjs.org/package/rc-timer)

# 1. Install

```sh
npm install --save rc-timer
```

#### How to run the demo:

```sh
git clone git@github.com:hanzhangyu/rc-timer.git

npm install

npm start
```

then open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in your browser. 

#### How to run the test:

```sh
npm run test
```


# 2. Usage  

根据 `onTrigger` 与 `sync` 配合使用一共可以得到三种用法：

#### 首先第一种用法是传入一个简单的同步函数。
```js
let i=0;
const timerProps={
     onTrigger:()=>{
         i++;
     }
 };

<Timer {...timerProps}/>;
```
> 这是请保持 `Timer` 的 `sync` 这个props为初始值（true），`Timer` 就会正常的loop。


#### 那么 `onTrigger` 是一个异步呢？所以第二种用法是，当传入的是一个 `Promise` 或者 `async/await` 对象时。

```js
const timerProps={
     onTrigger:()=>{
         return new Promise(resolve=>{
             setTimeout(()=>{
                 resolve();
             },3000)
         })
     }
 };

<Timer {...timerProps}/>;
```
> 在第一轮计时器结束之后，`Timer` 会等待 `Promise` 对象 `resolve` ，才开始下一轮的loop。

#### 当你是一个普通的异步函数，或者是通过订阅模式用同步触发的异步，`Timer` 是捕获不到的。这时候就可以使用第三种用法，手动去干预 `Timer` 的运行：
```js
class Test extends Compenont{
    constructor(){
        super();
        this.state={
            asyncIsRun:false,
        }
    }
    
    handleTrigger=()=>{
        this.setState({asyncIsRun:true});// 异步开始关闭定时器
        setTimeout(() => {
            this.setState({asyncIsRun:false});// 异步结束后重启定时器
        }, 3000)
    }
    
    render(){
        const timerProps = {
            sync:false,
            running:!asyncIsRun,
            onTrigger: this.handleTrigger,
        };
        
       return  <Timer {...timerProps}/>;
    }
}
```
> 当Timer的running这个props变化的时刻会触发Timer的stop()和restart()。



# 3. Props

| 名称        | 描述                        |
| ----------- | --------------------------- |
| timeout     | 定时任务的周期              |
| running     | 定时器是否运行              | 
| pause       | 定时器是否暂停              |
| sync        | onTrigger是否为同步函数     |
| immediate   | 初次是否立即执行onTrigger   |
| step        | 统计剩余时长的周期          |
| renderChild | 子节点                      |

#### 备注：
1. `running` :变化的时刻会触发Timer的stop()和restart()
2. `pause` :变化的时刻会触发Timer的pause()和recover()
3. `sync` :当设置为false的时候只有触发Timer的action或者onTrigger为Promise是才能继续运行
4. `renderChild` :未设置该属性是Timer将采用setTimeout的方式工作

# 4. Action

当为 `Timer` 设置了 `ref` 的时候。可以直接调用 `Timer` 的 `action` 函数。

| 名称        | 描述                        |
| ----------- | --------------------------- |
| pause()     | 暂停Timer，保留状态              |
| recover()     | 恢复Timer              | 
| stop()       | 停止Timer，重置状态             |
| restart()        | 重启Timer   |
| restartImmediate()| 重启Timer并立即执行onTrigger    |

# 5. Desc

对于`generator`函数请自行使用`thunk`函数进行封装，或者使用类似 [co](https://github.com/tj/co) 的模块返回`Promise`对象。

# 6. LICENSE

MIT@[PaulHan](https://github.com/hanzhangyu).


