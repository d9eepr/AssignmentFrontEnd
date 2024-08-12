import React, { useEffect, useState } from 'react';

const TimeLeft = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState(isNaN(initialTime) ? 0 : initialTime);
    console.log(initialTime)
    useEffect(() => {
        setTimeLeft(isNaN(initialTime) ? 0 : initialTime); // Reset timeLeft whenever initialTime changes
    }, [initialTime]); // Dependency on initialTime

    useEffect(() => {
        let timerId;

        if (timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [timeLeft]);

    return <span>{timeLeft} </span>;
};

export default TimeLeft;
