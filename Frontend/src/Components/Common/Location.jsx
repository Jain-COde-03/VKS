/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { MdLocationOn, MdOutlineKeyboardArrowDown } from "react-icons/md";
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Search from './Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Slide from '@mui/material/Slide';
import { MyContext } from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Location = () => {

  const { countryList, selectedCountry, setSelectedCountry, cityList, setCityList, fetchCity , fetchAdress} = React.useContext(MyContext);

  const [drop, setdrop] = useState(false);
  const [loc, setloc] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setdrop(false);
    setErrorMessage("");
  }

  const location = async () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const address = await fetchAdress(position.coords.longitude, position.coords.latitude);
          setloc(address || "");
          setDeliveryAddress("");
          setErrorMessage("");
        } catch (geoError) {
          console.error("Geolocation address lookup error", geoError);
          setErrorMessage("Unable to resolve your location to an address.");
          setloc("");
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        setErrorMessage("Unable to retrieve your location. Please allow location access and try again.");
        setloc("");
      }
    );
  }

  const countries = countryList;
  const cities = cityList;

  const handleCityListItemClick = (city) => {
    setSelectedCity(city);
    setloc(`${city}, ${selectedCountry}`);
    setDeliveryAddress("");
    setCitySearch("");
  };

  const handleListItemClick = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
    setDeliveryAddress("");
    setloc(country);
    setCityList([]);
    setCitySearch("");
  };

  const handleCountryChange = () => {
    setSelectedCountry(null);
    setSelectedCity("");
    setCityList([]);
    setDeliveryAddress("");
    setloc("");
    setCitySearch("");
  };

  const handleDeliveryAddressChange = (value) => {
    setDeliveryAddress(value);
    setloc(value ? `${value}, ${selectedCity}, ${selectedCountry}` : `${selectedCity}, ${selectedCountry}`);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredCities = selectedCountry
    ? cities.filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
    : [];

  return (
    <div className='flex gap-2 items-center'>
      <IconButton aria-label="Location" color='success'>
        <MdLocationOn />
      </IconButton>
      <div className='flex flex-col items-start w-auto'>
        <Typography variant="caption" color="textSecondary" className='pl-1.5'>
          Deliver To
        </Typography>
        <Button
          size="small"
          color="success"
          onClick={() => setdrop(true)}
          sx={{ textTransform: 'none', minWidth: 170, justifyContent: 'space-between' }}
          className='font-bold'
        >
          {loc ? (loc.length > 22 ? loc.substring(0, 22) + "..." : loc) : "Select delivery location"}
          <MdOutlineKeyboardArrowDown />
        </Button>
      </div>

      {countries.length > 0 && (
        <Dialog open={drop} onClose={handleClose} slots={{
          transition: Transition,
        }} transitionDuration={200}>
          <DialogTitle>
            <Typography variant="h6" component="div">Select Your Location</Typography>
            <Typography variant="body2" color="textSecondary">Please select the precise delivery location for your order.</Typography>
          </DialogTitle>
          <DialogContent>
            <Box className='flex flex-col items-start w-auto' gap={2}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  {selectedCountry ? (!selectedCity ? `Choose a city in ${selectedCountry}` : 'Add your delivery address') : 'Choose a country'}
                </Typography>
                {selectedCountry && (
                  <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                    <Chip label={selectedCountry} color="success" size="small" className='m-2'/>
                    {selectedCity && <Chip label={selectedCity} variant="outlined" size="small" />}
                  </Box>
                )}
                {!selectedCountry ? (
                  <Search
                    value={countrySearch}
                    onChange={setCountrySearch}
                    placeholder="Search country"
                  />
                ) : !selectedCity ? (
                  <Search
                    value={citySearch}
                    onChange={setCitySearch}
                    placeholder="Search city"
                  />
                ) : null}
              </Box>
              {selectedCity && (
                <TextField
                  fullWidth
                  size="small"
                  margin="normal"
                  label="Street / apartment / landmark"
                  placeholder="Enter precise delivery address"
                  value={deliveryAddress}
                  onChange={(event) => handleDeliveryAddressChange(event.target.value)}
                  helperText="Add street, house number, apartment or landmark for accurate delivery."
                />
              )}
              {errorMessage && (
                <Alert severity="error" variant="filled" sx={{ mt: 1 }}>
                  {errorMessage}
                </Alert>
              )}
            </Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={location}>
                  <ListItemAvatar>
                    <MdLocationOn fontSize={30} color='green' />
                  </ListItemAvatar>
                  <ListItemText primary="Use Current Location" secondary={loc || "Unable to retrieve location"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <List sx={{ pt: 0 }}>
              {selectedCountry ? (
                <>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton onClick={handleCountryChange} sx={{ borderRadius: 2, backgroundColor: 'rgba(76, 175, 80, 0.08)' }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <MdOutlineKeyboardArrowDown />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Choose another country" secondary={`Current: ${selectedCountry}`} />
                    </ListItemButton>
                  </ListItem>
                  {selectedCity && (
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemButton sx={{ borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                        <ListItemText primary="Location set" secondary={deliveryAddress || `${selectedCity}, ${selectedCountry}`} />
                      </ListItemButton>
                    </ListItem>
                  )}
                  {!selectedCity && (
                    filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <ListItem disablePadding key={city} sx={{ mb: 1 }}>
                          <ListItemButton onClick={() => handleCityListItemClick(city)} sx={{ borderRadius: 2, backgroundColor: '#fafafa' }}>
                            <ListItemText primary={city} secondary={selectedCountry} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <ListItem disablePadding>
                        <ListItemText primary={citySearch ? 'No cities match your search' : `Loading cities for ${selectedCountry}...`} />
                      </ListItem>
                    )
                  )}
                </>
              ) : (
                filteredCountries.map((country) => (
                  <ListItem disablePadding key={country.name} sx={{ mb: 1 }}>
                    <ListItemButton onClick={() => handleListItemClick(country.name)} sx={{ borderRadius: 2, backgroundColor: '#fafafa' }}>
                      <ListItemAvatar>
                        <Avatar src={country.flag} alt={country.name} />
                      </ListItemAvatar>
                      <ListItemText primary={country.name} />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="success" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default Location
