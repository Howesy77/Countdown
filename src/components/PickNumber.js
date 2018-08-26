import React from 'react';
import './PickNumber.css';

const onClick = (index, callback) => () => callback(index);

const PickNumber = ({ digit, index, selected, onNumberClick }) => 
    <div className='pickcard' onClick={onClick(index, onNumberClick)}>
        { selected ? <label class='pickcardLabel'>{ digit }</label> : null }
    </div>        

export default PickNumber;
