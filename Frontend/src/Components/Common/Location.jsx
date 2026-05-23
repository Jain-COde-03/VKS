import React, { useState } from 'react'
import { MdLocationOn, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Slide from '@mui/material/Slide'
import { MyContext } from '../../App'
import Search from './Search'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const Location = () => {
    const { countryList, selectedCountry, setSelectedCountry, cityList, setCityList, fetchAdress } = React.useContext(MyContext)

    const [drop, setdrop] = useState(false)
    const [loc, setloc] = useState(() => {
        try {
            const stored = localStorage.getItem('userLocation')
            if (stored) {
                const parsed = JSON.parse(stored)
                if (parsed.address) return parsed.address
                if (parsed.coords) {
                    const { lat, lon } = parsed.coords
                    return `Lat: ${Number(lat).toFixed(4)}, Lon: ${Number(lon).toFixed(4)}`
                }
            }
        } catch (e) {
            console.error('Failed to read stored location', e)
        }
        return ''
    })
    const [selectedCity, setSelectedCity] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [countrySearch, setCountrySearch] = useState('')
    const [citySearch, setCitySearch] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleClose = () => {
        setdrop(false)
        setErrorMessage('')
    }

    const location = () => {
        if (!navigator.geolocation) {
            setErrorMessage('Geolocation is not supported by your browser.')
            return
        }

        const stored = localStorage.getItem('userLocation')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (parsed.address) {
                    setloc(parsed.address)
                    setErrorMessage('')
                    return
                }
            } catch (e) {
                console.error('Error reading stored userLocation', e)
            }
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                const coordsLabel = `Lat: ${Number(lat).toFixed(4)}, Lon: ${Number(lon).toFixed(4)}`

                try {
                    const address = await fetchAdress(lon, lat)
                    if (address) {
                        setloc(address)
                        localStorage.setItem('userLocation', JSON.stringify({ address }))
                    } else {
                        setloc(coordsLabel)
                        localStorage.setItem('userLocation', JSON.stringify({ coords: { lat, lon } }))
                    }
                    setErrorMessage('')
                } catch (error) {
                    console.error('Error fetching address from reverse geocode', error)
                    setloc(coordsLabel)
                    setErrorMessage('Unable to get address; showing coordinates instead.')
                }

                setDeliveryAddress('')
            },
            (error) => {
                console.error('Geolocation error', error)
                setErrorMessage('Unable to retrieve your location. Please allow location access and try again.')
                setloc('')
            }
        )
    }

    React.useEffect(() => {
        if (!loc) {
            const timer = setTimeout(() => {
                location()
            }, 0)
            return () => clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const countries = countryList
    const cities = cityList

    const handleCityListItemClick = (city) => {
        setSelectedCity(city)
        setloc(`${city}, ${selectedCountry}`)
        setDeliveryAddress('')
        setCitySearch('')
    }

    const handleListItemClick = (country) => {
        setSelectedCountry(country)
        setSelectedCity('')
        setDeliveryAddress('')
        setloc(country)
        setCityList([])
        setCitySearch('')
    }

    const handleCountryChange = () => {
        setSelectedCountry(null)
        setSelectedCity('')
        setCityList([])
        setDeliveryAddress('')
        setloc('')
        setCitySearch('')
    }

    const handleDeliveryAddressChange = (value) => {
        setDeliveryAddress(value)
        setloc(value ? `${value}, ${selectedCity}, ${selectedCountry}` : `${selectedCity}, ${selectedCountry}`)
    }

    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase()))
    const filteredCities = selectedCountry ? cities.filter((city) => city.toLowerCase().includes(citySearch.toLowerCase())) : []

    return (
        <div className='flex min-w-0 w-full items-center gap-2 rounded-[24px] border border-emerald-100 bg-white/95 px-2 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:w-auto sm:gap-3 sm:rounded-full sm:px-2.5 sm:py-1.5'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-primary sm:h-11 sm:w-11'>
                <MdLocationOn className='text-xl sm:text-2xl' />
            </div>

            <div className='flex min-w-0 flex-1 flex-col items-start sm:flex-initial'>
                <Typography variant='caption' className='!text-[10px] !font-semibold !uppercase !tracking-[0.14em] !text-gray-400'>
                    Deliver to
                </Typography>
                <Button
                    size='small'
                    color='success'
                    onClick={() => setdrop(true)}
                    sx={{ textTransform: 'none', minWidth: 0, width: '100%', justifyContent: 'space-between', padding: 0 }}
                    className='min-w-0 !justify-between !font-semibold !text-gray-800'
                >
                    <span className='block max-w-full truncate pr-2 text-left text-[13px] sm:max-w-44'>
                        {loc ? (loc.length > 38 ? `${loc.substring(0, 38)}...` : loc) : 'Select delivery location'}
                    </span>
                    <MdOutlineKeyboardArrowDown className='ml-1 shrink-0 text-lg' />
                </Button>
            </div>

            {countries.length > 0 && (
                <Dialog
                    open={drop}
                    onClose={handleClose}
                    fullWidth
                    slots={{ transition: Transition }}
                    transitionDuration={200}
                    PaperProps={{
                        sx: {
                            m: { xs: 1.5, sm: 2 },
                            width: 'calc(100% - 24px)',
                            maxWidth: '680px',
                            maxHeight: 'calc(100% - 24px)',
                            borderRadius: { xs: 4, sm: 6 },
                            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fff8 100%)',
                            boxShadow: '0 30px 80px rgba(15, 23, 42, 0.18)',
                        },
                    }}
                >
                    <DialogTitle sx={{ pb: 1, px: { xs: 2, sm: 3 }, pt: { xs: 2.5, sm: 3 } }}>
                        <Typography variant='h5' component='div' fontWeight={700} sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                            Select your location
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Choose a precise delivery spot so we can get your order to you faster.
                        </Typography>
                    </DialogTitle>

                    <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
                        <Box className='flex flex-col items-start gap-4'>
                            <Box className='w-full rounded-[20px] border border-emerald-100 bg-white p-3 shadow-sm sm:rounded-[24px] sm:p-4'>
                                <Typography variant='subtitle2' gutterBottom className='!mb-3 !text-sm !font-semibold !text-gray-700'>
                                    {selectedCountry ? (!selectedCity ? `Choose a city in ${selectedCountry}` : 'Add your delivery address') : 'Choose a country'}
                                </Typography>

                                {selectedCountry && (
                                    <Box display='flex' gap={1} flexWrap='wrap' mb={2}>
                                        <Chip label={selectedCountry} color='success' size='small' />
                                        {selectedCity && <Chip label={selectedCity} variant='outlined' size='small' />}
                                    </Box>
                                )}

                                {!selectedCountry ? (
                                    <Search value={countrySearch} onChange={setCountrySearch} placeholder='Search country' width='w-full' />
                                ) : !selectedCity ? (
                                    <Search value={citySearch} onChange={setCitySearch} placeholder='Search city' width='w-full' />
                                ) : null}

                                {selectedCity && (
                                    <TextField
                                        fullWidth
                                        size='small'
                                        margin='normal'
                                        label='Street / apartment / landmark'
                                        placeholder='Enter precise delivery address'
                                        value={deliveryAddress}
                                        onChange={(event) => handleDeliveryAddressChange(event.target.value)}
                                        helperText='Add street, house number, apartment or landmark for accurate delivery.'
                                    />
                                )}

                                {errorMessage && (
                                    <Alert severity='error' variant='filled' sx={{ mt: 2, borderRadius: 3 }}>
                                        {errorMessage}
                                    </Alert>
                                )}
                            </Box>

                            <List className='!w-full !rounded-[20px] !border !border-emerald-100 !bg-white !p-2 shadow-sm sm:!rounded-[24px]'>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={location} sx={{ borderRadius: 4 }}>
                                        <ListItemAvatar sx={{ minWidth: { xs: 44, sm: 56 } }}>
                                            <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.12)', color: 'success.main' }}>
                                                <MdLocationOn />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary='Use current location' secondary={loc || 'Allow access to detect your location'} />
                                    </ListItemButton>
                                </ListItem>
                            </List>

                            <Divider sx={{ my: 1, width: '100%' }} />

                            <List className='!w-full !pt-0'>
                                {selectedCountry ? (
                                    <>
                                        <ListItem disablePadding sx={{ mb: 1 }}>
                                            <ListItemButton onClick={handleCountryChange} sx={{ borderRadius: 4, backgroundColor: 'rgba(76, 175, 80, 0.08)' }}>
                                                <ListItemAvatar sx={{ minWidth: { xs: 44, sm: 56 } }}>
                                                    <Avatar sx={{ bgcolor: 'success.main' }}>
                                                        <MdOutlineKeyboardArrowDown />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary='Choose another country' secondary={`Current: ${selectedCountry}`} />
                                            </ListItemButton>
                                        </ListItem>

                                        {selectedCity && (
                                            <ListItem disablePadding sx={{ mb: 1 }}>
                                                <ListItemButton sx={{ borderRadius: 4, backgroundColor: '#f6fff7' }}>
                                                    <ListItemText primary='Location set' secondary={deliveryAddress || `${selectedCity}, ${selectedCountry}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        )}

                                        {!selectedCity &&
                                            (filteredCities.length > 0 ? (
                                                filteredCities.map((city) => (
                                                    <ListItem disablePadding key={city} sx={{ mb: 1 }}>
                                                        <ListItemButton
                                                            onClick={() => handleCityListItemClick(city)}
                                                            sx={{ borderRadius: 4, backgroundColor: '#ffffff', border: '1px solid #e8f5e9' }}
                                                        >
                                                            <ListItemText primary={city} secondary={selectedCountry} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))
                                            ) : (
                                                <ListItem disablePadding>
                                                    <ListItemText
                                                        primary={citySearch ? 'No cities match your search' : `Loading cities for ${selectedCountry}...`}
                                                        className='rounded-2xl border border-dashed border-emerald-100 bg-white px-4 py-6 text-center'
                                                    />
                                                </ListItem>
                                            ))}
                                    </>
                                ) : (
                                    filteredCountries.map((country) => (
                                        <ListItem disablePadding key={country.name} sx={{ mb: 1 }}>
                                            <ListItemButton
                                                onClick={() => handleListItemClick(country.name)}
                                                sx={{ borderRadius: 4, backgroundColor: '#ffffff', border: '1px solid #e8f5e9' }}
                                            >
                                                <ListItemAvatar sx={{ minWidth: { xs: 44, sm: 56 } }}>
                                                    <Avatar src={country.flag} alt={country.name} />
                                                </ListItemAvatar>
                                                <ListItemText primary={country.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2.5, sm: 3 } }}>
                        <Button
                            onClick={handleClose}
                            color='success'
                            variant='contained'
                            sx={{ borderRadius: 999, px: 3, width: { xs: '100%', sm: 'auto' }, textTransform: 'none', fontWeight: 700 }}
                        >
                            Save location
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    )
}

export default Location
