import React from 'react';
import PropTypes from 'prop-types';
import './PickNumber.css';

const onClick = (index, callback) => () => callback(index);

const PickNumber = ({ digit, index, selected, onNumberClick }) => 
    <div className='pickcard' onClick={onClick(index, onNumberClick)}>
        { selected ? <label className='pickcardLabel'>{ digit }</label> : null }
    </div>        

PickNumber.propTypes = {
    digit: PropTypes.number.isRequired,
    index: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onNumberClick: PropTypes.func.isRequired
}

export default PickNumber;
