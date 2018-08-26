import React, { Component } from 'react';
import './TargetNumber.css'

class TargetNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            target: 0,   
            interval: null,
            timerInterval: 100
        };
      
        this.generate = () => {         
            if (this.state.interval === null) this.startGenerateNumber();
            else this.stopGenerateNumber();
        };
    }

    toString() {     
        return String(this.state.target).padStart(3, '0');
    }

    startGenerateNumber() {
        const timer = setInterval(() => {
            this.setState({ target: Math.floor(Math.random() * 900) + 100 });
        }, this.state.timerInterval);

        this.setState({ interval: timer });
    }

    stopGenerateNumber() {
        clearInterval(this.state.interval);
        this.setState({ interval: null });

        const { onTargetChange } = this.props;
        onTargetChange(this.state.target);
    }

    render() {
        return (
            <div className='flex-container'>
                <div className={'target ' + (this.props.canGenerate ? 'generate ' : '') + (this.state.interval !== null ? 'generating' : '')}
                     onClick={ this.props.canGenerate ? this.generate : null }>
                        <label className='targetLabel'>{ this.toString() }</label>
                </div>                
            </div>            
        );
    }
}

export default TargetNumber;
