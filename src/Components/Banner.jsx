import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';
import TimeLeft from './TimeLeft';


const Banner = ({ content, setVisible }) => {
    console.log(content)
    const [timeLeft, setTimeLeft] = useState(0);
    const timerId = useRef(null); // To store the timer ID

    useEffect(() => {
        const newTimeLeft = parseInt(content.timer_seconds, 10);
    
        // Clear any existing timer
        if (timerId.current) {
          clearInterval(timerId.current);
        }
    
        // Check if newTimeLeft is a valid number
        if (!isNaN(newTimeLeft) && newTimeLeft > 0) {
          setTimeLeft(newTimeLeft);
    
          // Set up the new timer
          timerId.current = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev <= 1) {
                clearInterval(timerId.current);
                setVisible(false);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
    
        // Cleanup function to clear the timer when the component unmounts or the effect re-runs
        return () => {
          if (timerId.current) {
            clearInterval(timerId.current);
          }
        };
      }, [content.timer_seconds, setVisible]);

    return (
        <Card sx={{ my: 2, backgroundColor: '#f8bbd0' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {content.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Disappears in: <TimeLeft initialTime={content.timer_seconds}/> 
                </Typography>
                <Link href={content.link} target="_blank" rel="noopener">
                    Click here for more details
                </Link>
            </CardContent>
        </Card>
    );
};

export default Banner;
