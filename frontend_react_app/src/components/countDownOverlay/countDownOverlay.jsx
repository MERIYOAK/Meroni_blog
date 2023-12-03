
// CountdownOverlay.jsx
import React from 'react';
import './countDownOverlay.css';

function CountdownOverlay({ countdown }) {

    return (
        <div className='countdown-container'>
            Please wait for {Math.floor(countdown / 60)}:{countdown % 60} minutes before trying again.
        </div>
    );
};

export default CountdownOverlay;
