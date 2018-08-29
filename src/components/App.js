import React, { Component } from 'react';
import TargetNumber from './TargetNumber';
import PickNumbers from './PickNumbers';
import PickedNumbers from './PickedNumbers';
import Solution from './Solution';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
            target: null,
            numbers: []
      }
    
      this.onTarget = (value) => {
            this.setState({ target: value });
      }

      this.OnNumber = (value) => {
            this.setState({ numbers: [...this.state.numbers, value] });       
      }

      this.onReset = () => {
            window.location.reload();
      }
  }

  render() {
      return (
            <div className='app'>
                <div>
                    <div className='app-panel'>
                        <TargetNumber onTargetChange={this.onTarget} canGenerate={this.state.numbers.length === 6 && !this.state.target} />
                        <PickedNumbers numbers={this.state.numbers}/>
                    </div>
                    {this.state.numbers.length < 6 ? <PickNumbers onNumberAdded={this.OnNumber} allowSelection={this.state.numbers.length < 6} /> : null}    
                    {this.state.numbers.length === 6 && this.state.target ? <Solution numbers={this.state.numbers} target={this.state.target} /> : null}
                    <div className='reset' onClick={this.onReset}>Start Over</div>
                </div>                                  
          </div>
      );
    }
}

export default App;
