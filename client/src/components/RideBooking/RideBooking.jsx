import React from "react";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { motion } from 'framer-motion'
import Button from "../Button/Button";

const RideBooking = () => {

    const center = { lat: 48.8584, lng: 2.2945 }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        libraries: ['places'],
    })

    if (!isLoaded) {
        return <div>Loading</div>
    }
    return (
        <section >
            <GoogleMap
                center={center}
                zoom={13}
                mapContainerStyle={{ width: '100%', height: '100vh' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                <Marker position={center} />
            </GoogleMap>

            <motion.div
                initial={{ x: '-10vw', opacity: 0 }}
                animate={{ x: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 50, delay: .4 }}


                className='mainCard xs:w-96 p-10 bg-white  rounded'>
                <motion.div
                    initial={{ y: '-10vw', opacity: 0 }}
                    animate={{ y: 1, opacity: 1 }}
                    transition={{ type: "Tween", stiffness: 1, delay: .6 }}
                    className='flex justify-around  '>
                    <h1 className='text-2xl btmBorder'>Ride</h1>
                    <h1 className='text-2xl'>Drive</h1>
                </motion.div>
                <motion.div
                    initial={{ y: '-10vw', opacity: 0 }}
                    animate={{ y: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 60, delay: .6 }}
                    className='flex justify-center align-middle mt-10'>
                    <h1 className='text-3xl font-semibold'>Request a ride now</h1>
                </motion.div>
                <motion.div
                    initial={{ y: '-10vw', opacity: 0 }}
                    animate={{ y: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 60, delay: .9 }}
                    className='mt-10'>
                    <Autocomplete>
                        <input
                            type="text"
                            className=" border border-grey bg-slate-200 w-full p-3 rounded mb-4"
                            placeholder='Enter you start in location' />
                    </Autocomplete>
                    <Autocomplete>

                        <input
                            type="text"
                            className=" border border-grey bg-slate-200 w-full p-3 rounded mb-4"
                            placeholder='Enter your destination' />
                    </Autocomplete>
                </motion.div>
                <motion.div
                    initial={{ y: '-10vw', opacity: 0 }}
                    animate={{ y: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 60, delay: 1 }} >
                    <Button stlye={" text-center py-2 px-3 rounded bg-yellow-400  my-1 font-semibold"} title={"Request Now"} />
                </motion.div>
            </motion.div>
        </section>

    )
}

export default RideBooking



// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import LeafletRouting from "./leafletRouting";

// const RideBooking = () => {
//     const position = [51.505, -0.09]
//     return (
//         <MapContainer  center={position} zoom={13} scrollWheelZoom={false}>
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {/* <Marker position={position}>
//                 <Popup>
//                     A pretty CSS3 popup. <br /> Easily customizable.
//                 </Popup>
//             </Marker> */}
//             <LeafletRouting/>
//         </MapContainer>
//     )
// }



// export default RideBooking