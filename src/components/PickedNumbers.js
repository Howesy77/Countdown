import React from 'react';
import PropTypes from 'prop-types';

const PickedNumbers = ({ numbers }) => {   
    var paddedNumbers = numbers.slice();
    for (var i = numbers.length; i < 6; i++) paddedNumbers.push('');

    return <div className='flex-container'>
        {
            paddedNumbers.sort((a, b) => { return a - b }).reverse().map((number, index) => {
                return <div className='pickcard' key={index}>
                    <label className='pickcardLabel'>{ number }</label> 
                </div>   
            })
        }
    </div>
}

PickedNumbers.propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default PickedNumbers;
