import React, {PropTypes, cloneElement, Component} from "react"

export default class Timer extends Component {
    static propTypes = {
        onTrigger: PropTypes.func.isRequired, // 定时器执行trigger函数
        timeout: PropTypes.number, // 定时器时间
        step: PropTypes.number, // 更新剩余时间的时间间隔
        running: PropTypes.bool, // 是否继续运行
        async: PropTypes.bool, // 忽略trigger函数是否执行完成
        immediate: PropTypes.bool, // 首次是否立即执行
        renderChild: PropTypes.func, // 渲染的子节点默认为无，当此函树存在的时会启用setTnterval对setTimeout拆分，并计入每一个step的剩余时间
    };

    static defaultProps = {
        timeout: 10000,
        running: true,
        pause: false,
        async: true,
        immediate: true,
        step: 1000,
    };

    constructor(props) {
        super(props);

        this.state = {
            leftTime: props.timeout
        }

        this.pause = () => {
            this.clearTimer();
        }
        this.recover = () => {
            this.combineEvent(false);// 恢复没有立刻执行这一说法

        }
        this.stop = () => {
            this.resetTimer();
        }
        this.reStart = () => {
            this.startTimer();
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        // console.warn('nextState',nextState)
        // console.warn('nextState',this.state)
        // 重启
        if (!nextProps.running && this.props.running) {
            this.stop();
        } else if (nextProps.running && !this.props.running) {
            this.reStart();
        }

        // 暂停
        if (nextProps.pause && !this.props.pause) {
            this.pause();
        } else if (!nextProps.pause && this.props.pause) {
            this.recover();
        }
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    startTimer = () => {
        this.props.immediate ? this.combineEventAsync() : this.combineEvent();
    }

    resetTimer = (callback, resetState) => {
        if (resetState) {
            // console.warn('this.props.timeout',this.props.timeout)
            this.setState({leftTime: this.props.timeout}, () => {
                this.clearTimer();
                callback();
            });
            return;
        }
        // console.warn('keepState',keepState)
        console.warn('this.state.leftTime', this.state.leftTime)
        this.clearTimer();
    }

    clearTimer = () => {
        this.timer && clearInterval(this.timer);
        this.timer && clearTimeout(this.timer);
    };

    combineEvent = (resetState = true) => {
        this.resetTimer(() => {
            if (this.props.renderChild) {
                this.loopCalcLeftTime();
                return;
            }
            this.timer = setTimeout(this.combineEventAsync, resetState ? this.props.timeout : this.state.leftTime)
            console.warn('commint')
        }, resetState);
    }

    combineEventAsync = () => {
        const {onTrigger, async} = this.props;
        const _triger = onTrigger();
        if (_triger && typeof _triger.then === 'function') {
            _triger.then(() => {
                this.combineEvent();
            })
        } else {
            async && this.combineEvent();
        }
    }

    loopCalcLeftTime = () => {
        const step = this.props.step;
        this.timer = setInterval(() => {
            let prevLeftTime = this.state.leftTime;
            if (prevLeftTime <= 0) {
                this.combineEventAsync();// 注意这个同步的函数必须放在这个定时器中，不能分开写一个setTimeout，别忘了settimeout是不等于setinterval总和的
                prevLeftTime = this.props.timeout;
            }
            console.warn('val', prevLeftTime - step)
            this.setState({leftTime: prevLeftTime - step})
        }, step)
    }

    render() {
        const {renderChild} = this.props;
        const child = renderChild && renderChild(this.state.leftTime);
        return child || null;
    }
}
