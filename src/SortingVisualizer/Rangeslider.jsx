import React, { useState } from 'react';

function RangeSlider() {
    const [value, setValue] = useState(50); // Default slider value

    // Handle slider change
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className="slider"
            />
            
        </div>
    );
}

export default RangeSlider;