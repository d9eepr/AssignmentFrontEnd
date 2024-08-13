import React, { useEffect,useState } from 'react';
import { Container, Box, Typography, Switch, Button } from '@mui/material';
import Banner from './Components/Banner';
import axios from 'axios';
import Dashboard from './Components/Dashboard';
import UpdateBanner from './Components/UpdateBanner';


const App = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerContent, setBannerContent] = useState({
      description: 'Welcome to our website!',
      timerSeconds: 8,
      link: 'https://example.com',
  });

  useEffect(() => {
      // Fetch the banner data on initial load
      console.log(apiUrl)
      axios.get(apiUrl,config)
          .then((response) => {
              setBannerContent(response.data);
              setBannerVisible(response.data.is_visible); // Set visibility based on fetched data
              console.log(response.data);
          })
          .catch((error) => {
              console.error('Error fetching banner:', error);
          });
  }, []);

  

  return (
      <Container>
          <Box sx={{ my: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                  Take U Forward Assignment
              </Typography>

              {bannerVisible && (
                  <Banner
                      content={bannerContent}
                      setVisible={setBannerVisible}
                  />
              )}

              <Dashboard
                  bannerContent={bannerContent}
                  setBannerContent={setBannerContent}
                  bannerVisible={bannerVisible}
                  setBannerVisible={setBannerVisible}
              />
          </Box>
      </Container>
  );
};

export default App;
