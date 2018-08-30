import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickNumber from './PickNumber';
import './PickNumbers.css';

class PickNumbers extends Component {
    constructor(props) {
        super(props);

        var large = [25, 50, 75, 100];
        var small = [
            1,
            1,
            2,
            2,
            3,
            3,
            4,
            4,
            5,
            5,
            6,
            6,
            7,
            7,
            8,
            8,
            9,
            9,
            10,
            10
        ];

        this.state = {
            large: this.shuffle(large).map((element, index) => {
                return {
                    digit: element,
                    index: index,
                    selected: false
                };
            }),
            small: this.shuffle(small).map((element, index) => {
                return {
                    digit: element,
                    index: index,
                    selected: false
                };
            })
        };
    }

    onNumberClick = index => {
        const { allowSelection } = this.props;
        if (!allowSelection) return;

        const value = parseInt(index.substring(1), 10);
        var digit = null;

        if (index[0] === 'l') {
            const items = this.state.large;
            if (items[value].selected) return;

            items[value].selected = true;
            digit = items[value].digit;

            this.setState({ items });
        } else {
            const items = this.state.small;
            if (items[value].selected) return;

            items[value].selected = true;
            digit = items[value].digit;

            this.setState({ items });
        }

        const { onNumberAdded } = this.props;
        onNumberAdded(digit);
    };

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    render() {
        const largeNumbers = this.state.large.map(element => {
            return (
                <PickNumber
                    digit={element.digit}
                    key={element.index}
                    index={'l' + element.index}
                    selected={element.selected}
                    onNumberClick={this.onNumberClick}
                />
            );
        });

        const smallNumbers = Array.apply(null, Array(4)).map((obj, index) => {
            return (
                <div className="flex-container" key={index}>
                    {this.state.small
                        .slice(index * 5, index * 5 + 5)
                        .map(element => {
                            return (
                                <PickNumber
                                    digit={element.digit}
                                    key={element.index}
                                    index={'s' + element.index}
                                    selected={element.selected}
                                    onNumberClick={this.onNumberClick}
                                />
                            );
                        })}
                </div>
            );
        });

        return (
            <div>
                <div className="flex-container">{largeNumbers}</div>
                {smallNumbers}
            </div>
        );
    }
}

PickNumbers.propTypes = {
    allowSelection: PropTypes.bool.isRequired,
    onNumberAdded: PropTypes.func.isRequired
};

export default PickNumbers;
