
# rc-timer

Create a timed task in react.

> travis is comming soon

# 1. install

```sh
npm install --save rc-timer
```

How to run the demo:

```sh
git clone git@github.com:hanzhangyu/rc-timer.git

npm install

npm start
```

then open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in your browser. 

# 2. usage

```js
<Timer {...{
    timeout:3000,
    ref:"timer",
    pause:this.props.pause,
    renderChild:(val)=><span>{val}</span>,
    onTrigger:this.props.onTrigger
}}/>;
```

# 3. props

# 4. LICENSE

MIT@[PaulHan](https://github.com/hanzhangyu).


