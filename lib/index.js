'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timer = function (_React$Component) {
    _inherits(Timer, _React$Component);

    function Timer(props) {
        _classCallCheck(this, Timer);

        var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

        _this.startTimer = function () {
            var _this$props = _this.props,
                immediate = _this$props.immediate,
                enabled = _this$props.enabled,
                pause = _this$props.pause;

            if (enabled && !pause) {
                if (!immediate) {
                    _this.combineEvent();
                    return;
                }
                _this.combineEventAsync();
            }
        };

        _this.resetTimer = function () {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
                return undefined;
            };
            var resetState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (resetState) {
                _this.setState({ leftTime: _this.props.timeout - 1000 }, function () {
                    _this.clearTimer();
                    callback();
                });
                return;
            }
            _this.clearTimer();
            callback();
        };

        _this.clearTimer = function () {
            if (_this.timer) {
                clearInterval(_this.timer);
                clearTimeout(_this.timer);
                _this.timer = undefined;
            }
        };

        _this.combineEvent = function (resetState) {
            _this.resetTimer(function () {
                if (_this.props.renderChild) {
                    _this.loopCalcLeftTime();
                    return;
                }
                _this.timer = setTimeout(_this.combineEventAsync, resetState ? _this.props.timeout : _this.state.leftTime);
            }, resetState);
        };

        _this.combineEventAsync = function () {
            var _this$props2 = _this.props,
                onTrigger = _this$props2.onTrigger,
                sync = _this$props2.sync;

            var _triger = onTrigger();
            if (_triger && typeof _triger.then === 'function') {
                _triger.then(function () {
                    _this.combineEvent();
                });
            } else if (sync) {
                _this.combineEvent();
            }
        };

        _this.loopCalcLeftTime = function () {
            var step = _this.props.step;
            _this.timer = setInterval(function () {
                var prevLeftTime = _this.state.leftTime;
                if (prevLeftTime <= 0) {
                    _this.combineEventAsync(); // 注意这个同步的函数必须放在这个定时器中，不能分开写一个setTimeout，别忘了settimeout是不等于setinterval总和的
                    prevLeftTime = _this.props.timeout;
                }
                _this.setState({ leftTime: prevLeftTime - step });
            }, step);
        };

        _this.state = {
            leftTime: props.timeout
        };

        _this.pause = function () {
            _this.clearTimer();
        };
        _this.recover = function () {
            _this.combineEvent(false); // 恢复没有立刻执行这一说法
        };
        _this.stop = function () {
            _this.resetTimer();
        };
        _this.restart = function () {
            _this.combineEvent();
        };
        _this.restartImmediate = function () {
            _this.combineEventAsync();
        };
        return _this;
    }

    _createClass(Timer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.startTimer();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
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
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearTimer();
        }
    }, {
        key: 'render',
        value: function render() {
            var renderChild = this.props.renderChild;

            var child = renderChild && renderChild(this.state.leftTime);
            return child || null;
        }
    }]);

    return Timer;
}(_react2['default'].Component);

Timer.propTypes = {
    onTrigger: _react.PropTypes.func.isRequired, // 定时器执行trigger函数
    timeout: _react.PropTypes.number, // 定时器时间
    step: _react.PropTypes.number, // 更新剩余时间的时间间隔
    enabled: _react.PropTypes.bool, // 是否启用
    pause: _react.PropTypes.bool, // 是否停止
    sync: _react.PropTypes.bool, // 忽略trigger函数是否执行完成
    immediate: _react.PropTypes.bool, // 首次是否立即执行
    renderChild: _react.PropTypes.func // 渲染的子节点默认为无，当此函树存在的时会启用setTnterval对setTimeout拆分，并计入每一个step的剩余时间
};
Timer.defaultProps = {
    timeout: 10000,
    enabled: true,
    pause: false,
    sync: true,
    immediate: true,
    step: 1000,
    renderChild: undefined
};
exports['default'] = Timer;