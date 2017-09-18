import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Timer from '../lib';

const styles = {
    btnWrap: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    spanWrap: {
        fontSize: 24,
        marginTop: 20
    },
    span: {
        color: 'red',
        fontWeight: 'bold'
    }
};

class Test1 extends Component {
    constructor() {
        super();
        this.state = {
            pause: false,
            enabled: true,
        };
    }

    handlePause = () => {
        this.refs.timer.pause();
    };
    handleRecover = () => {
        this.refs.timer.recover();
    };
    handleStop = () => {
        this.refs.timer.stop();
    };
    handleReStart = () => {
        this.refs.timer.restart();
    };
    handleReStartImmediate = () => {
        this.refs.timer.restartImmediate();
    };
    handleCheckPause = (e) => {
        this.setState({pause: e.target.checked});
    };
    handleCheckEnabled = (e) => {
        this.setState({enabled: e.target.checked});
    };

    render() {
        const {pause, enabled} = this.state;
        const timerProps = {
            pause,
            enabled,
            timeout: 4000,
            ref: 'timer',
            onTrigger: () => new Promise(resolve => setTimeout(() => {
                console.log('done');
                resolve();
            }, 2000)),
            renderChild: val => (
                <div style={styles.spanWrap}>There is <span style={styles.span}>{val}</span> ms left.</div>
            )
        };
        return (
            <div>
                <h1>Welcome to Timer`s demo</h1>
                <h3>state</h3>
                <div>
                    <input type="checkbox" onClick={this.handleCheckPause} id="pause" />
                    <label htmlFor="pause">pause</label>
                </div>
                <div>
                    <input type="checkbox" onClick={this.handleCheckEnabled} defaultChecked id="enabled" />
                    <label htmlFor="enabled">enabled</label>
                </div>
                <h3>action</h3>
                <div style={styles.btnWrap}>
                    <button onClick={this.handlePause}>pause</button>
                    <button onClick={this.handleRecover}>recover</button>
                    <button onClick={this.handleStop}>stop</button>
                    <button onClick={this.handleReStart}>restart</button>
                    <button onClick={this.handleReStartImmediate}>restartImmediate</button>
                </div>
                <Timer {...timerProps} />
            </div>
        );
    }
}


ReactDOM.render(<Test1 />,
    document.querySelector('#root')
);
