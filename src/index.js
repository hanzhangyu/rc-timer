import React, {PropTypes} from 'react';

export default class Timer extends React.Component {
    static propTypes = {
        onTrigger: PropTypes.func.isRequired, // 定时器执行trigger函数
        timeout: PropTypes.number, // 定时器时间
        step: PropTypes.number, // 更新剩余时间的时间间隔
        enabled: PropTypes.bool, // 是否启用
        pause: PropTypes.bool, // 是否停止
        sync: PropTypes.bool, // 忽略trigger函数是否执行完成
        immediate: PropTypes.bool, // 首次是否立即执行
        renderChild: PropTypes.func, // 渲染的子节点默认为无，当此函树存在的时会启用setTnterval对setTimeout拆分，并计入每一个step的剩余时间
    };

    static defaultProps = {
        timeout: 10000,
        enabled: true,
        pause: false,
        sync: true,
        immediate: true,
        step: 1000,
        renderChild: undefined
    };

    constructor(props) {
        super(props);

        this.state = {
            leftTime: props.timeout
        };

        this.pause = () => {
            this.clearTimer();
        };
        this.recover = () => {
            this.combineEvent(false);// 恢复没有立刻执行这一说法
        };
        this.stop = () => {
            this.resetTimer();
        };
        this.restart = () => {
            this.combineEvent();
        };
        this.restartImmediate = () => {
            this.combineEventAsync();
        };
    }

    componentDidMount() {
        const {immediate, enabled, pause} = this.props;
        if (enabled && !pause) {
            if (!immediate) {
                this.combineEvent();
                return;
            }
            this.combineEventAsync();
        }
    }

    componentWillReceiveProps(nextProps) {
        // 重启
        if (!nextProps.enabled && this.props.enabled) {
            this.stop();
        } else if (nextProps.enabled && !this.props.enabled) {
            this.restart();
        }

        // 暂停
        if (nextProps.pause && !this.props.pause) {
            this.pause();
        } else if (!nextProps.pause && this.props.pause) {
            this.recover();
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    resetTimer = (resetState = true, callback = () => undefined) => {
        if (resetState) {
            this.setState({leftTime: this.props.timeout - 1000}, () => {
                this.clearTimer();
                callback();
            });
            return;
        }
        this.clearTimer();
        callback();
    };

    clearTimer = () => {
        if (this.timer) {
            clearInterval(this.timer);
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    };

    combineEvent = () => {
        if (this.props.renderChild) {
            this.loopCalcLeftTime();
            return;
        }
        this.timer = setTimeout(this.combineEventAsync, this.state.leftTime);
    };

    combineEventAsync = (resetState) => {
        const {onTrigger, sync} = this.props;
        const _trigger = onTrigger();
        this.resetTimer(resetState, () => {
            if (_trigger && typeof _trigger.then === 'function') {
                _trigger.then(() => {
                    this.combineEvent();
                });
            } else if (sync) {
                this.combineEvent();
            }
        });
    };

    loopCalcLeftTime = () => {
        const step = this.props.step;
        this.timer = setInterval(() => {
            const prevLeftTime = this.state.leftTime;
            if (prevLeftTime <= 0) {
                this.combineEventAsync(true);// 注意这个同步的函数必须放在这个定时器中，不能分开写一个setTimeout，别忘了settimeout是不等于setinterval总和的
                // prevLeftTime = this.props.timeout;
            } else {
                this.setState({leftTime: prevLeftTime - step});
            }
        }, step);
    };

    render() {
        const {renderChild} = this.props;
        const child = renderChild && renderChild(this.state.leftTime);
        return child || null;
    }
}
