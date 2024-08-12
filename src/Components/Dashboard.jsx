import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Switch, FormControlLabel } from '@mui/material';

const Dashboard = ({ bannerContent, setBannerContent, bannerVisible, setBannerVisible }) => {
    const [localContent, setLocalContent] = useState(bannerContent);
    const apiUrl = process.env.REACT_APP_API_URL;
    const handleUpdateBanner = () => {
        // Update the banner on the server
        axios.put((apiUrl+'/1'), {
            is_visible: bannerVisible,
            description: localContent.description,
            timer_seconds: localContent.timerSeconds, // Ensure this matches the backend naming
            link: localContent.link,
        })
        .then((response) => {
            console.log('Banner updated successfully:', response.data);
            // Toggle the visibility state
            setBannerVisible(prev => !prev);
            
            // Fetch the updated banner data
            axios.get(apiUrl)
                .then((response) => {
                    const data = response.data;
                    const isVisible = typeof data.is_visible === 'boolean' ? data.is_visible : true;

                    setBannerContent(response.data);
                    setBannerVisible(response.data.is_visible); // Update visibility based on the fetched data
                })
                .catch((error) => {
                    console.error('Error fetching updated banner:', error);
                });
        })
        .catch((error) => {
            console.error('Error updating banner:', error);
        });
    };

    return (
        <Box sx={{ mt: 4 }}>
            <FormControlLabel
                control={<Switch checked={bannerVisible} onChange={() => setBannerVisible(!bannerVisible)} />}
                label="Show Banner"
            />
            <TextField
                label="Banner Description"
                fullWidth
                margin="normal"
                value={localContent.description}
                onChange={(e) => setLocalContent({ ...localContent, description: e.target.value })}
            />
            <TextField
                label="Timer (seconds)"
                type="number"
                fullWidth
                margin="normal"
                value={localContent.timerSeconds}
                onChange={(e) => setLocalContent({ ...localContent, timerSeconds: e.target.value })}
            />
            <TextField
                label="Link"
                fullWidth
                margin="normal"
                value={localContent.link}
                onChange={(e) => setLocalContent({ ...localContent, link: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateBanner}>
                Update Banner
            </Button>
        </Box>
    );
};

export default Dashboard;
