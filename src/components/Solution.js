import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Solution.css';

class Solution extends Component {
    constructor(props) {
        super(props);

        this.closestResult = 9999;
        this.closestSteps = [];
        this.resultSteps = [];

        this.state = {
            solution: [],
            type: '',
            display: false,
            calculating: false
        };
    }

    showSolution = e => {
        if (this.state.calculating) return;
        else this.setState({ calculating: true }, this.doSolve);
    };

    doSolve() {
        setTimeout(() => {
            this.solve(this.props.numbers.slice(), []);

            this.setState({
                display: true,
                solution: this.resultSteps.length
                    ? this.resultSteps
                    : this.closestSteps,
                type: this.resultSteps.length
                    ? 'The solution is:'
                    : `This can't be solved (closest ${
                          this.closestResult
                      } away): `
            });
        }, 1000);
    }

    solve(numbers, steps) {
        numbers.sort((a, b) => b - a);

        // Check to see if we have the solution.
        if (numbers.some(value => value === this.props.target)) {
            if (this.resultSteps.length === 0) this.resultSteps = steps;
            else if (steps.length < this.resultSteps.length)
                this.resultSteps = steps;
            return;
        }

        // Don't look at less effiecient routes.
        if (
            this.resultSteps.length !== 0 &&
            steps.length >= this.resultSteps.length
        ) {
            return;
        }

        // Check for the best answer to date.
        numbers.forEach(value => {
            let gap = Math.abs(this.props.target - value);

            if (gap < this.closestResult) {
                this.closestSteps = steps.slice();
                this.closestResult = gap;
            }
        });

        for (let i = 0; i < numbers.length; ++i)
            for (let j = i + 1; j < numbers.length; ++j) {
                let lhs = numbers[i];
                let rhs = numbers[j];

                for (let op = 0; op < 4; ++op) {
                    switch (op) {
                        // Add
                        case 0: {
                            let array = numbers.slice();
                            let currentSteps = steps.slice();
                            array.splice(j, 1);
                            array.splice(i, 1);
                            array.unshift(lhs + rhs);
                            currentSteps.push(`${lhs} + ${rhs} = ${lhs + rhs}`);
                            this.solve(array, currentSteps);
                            break;
                        }

                        // Subtract
                        case 1: {
                            if (lhs > rhs) {
                                let array = numbers.slice();
                                let currentSteps = steps.slice();
                                array.splice(j, 1);
                                array.splice(i, 1);
                                array.unshift(lhs - rhs);
                                currentSteps.push(`${lhs} - ${rhs} = ${lhs - rhs}`);
                                this.solve(array, currentSteps);
                            }

                            break;
                        }

                        // Multiply
                        case 2: {
                            let array = numbers.slice();
                            let currentSteps = steps.slice();
                            array.splice(j, 1);
                            array.splice(i, 1);
                            array.unshift(lhs * rhs);
                            currentSteps.push(`${lhs} x ${rhs} = ${lhs * rhs}`);
                            this.solve(array, currentSteps);
                            break;
                        }

                        // Divide
                        case 3: {
                            if (lhs % rhs === 0) {
                                let array = numbers.slice();
                                let currentSteps = steps.slice();
                                array.splice(j, 1);
                                array.splice(i, 1);
                                array.unshift(lhs / rhs);
                                currentSteps.push(`${lhs} / ${rhs} = ${lhs / rhs}`);
                                this.solve(array, currentSteps);
                            }

                            break;
                        }

                        default: {
                            break;
                        }
                    }
                }
            }
    }

    render() {
        return (
            <div>
                {this.state.display ? (
                    <div className="solution-panel">
                        <div className="solution-title">{this.state.type}</div>
                        {this.state.solution.map((line, index) => {
                            return (
                                <div className="solution-line" key={index}>
                                    {line}
                                </div>
                            );
                        })}
                    </div>
                ) : this.state.calculating ? (
                    <div className="solution-display">Working it Out</div>
                ) : (
                    <div
                        className="solution-display"
                        onClick={this.showSolution}
                    >
                        Get the Solution
                    </div>
                )}
            </div>
        );
    }
}

Solution.propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    target: PropTypes.number.isRequired
};

export default Solution;
