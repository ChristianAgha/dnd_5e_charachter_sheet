import React from 'react';
import { getModifier}  from './getModifier';

const AbilityScore = (props) => {
    const { ability, score } = props;
    return (
        <div className='stats'>
            <p className='stats-key'>{ability}</p>
            <p className='stats-score'>{score}</p>
            <p className='stats-modifier'>{getModifier(score)}</p>
        </div> 
    );
}

export default AbilityScore;  