import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [starting, setStarting] = useState("");
  const [destination, setDestination] = useState("");
  const [startingCoordinates, setStartingCoordinates] = useState();
  const [destinationCoordinates, setDestinationCoordinates] = useState();
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState()

  const createLocationCoordinate = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mapboxUrl = `${import.meta.env.VITE_MAPBOX_PLACE_API_URL
          }/${locationName}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
          }`;
        const response = await fetch(mapboxUrl);
        const data = await response.json();
        const location = data.features[0].center;
        if (location.length) {
          switch (locationType) {
            case `starting`:
              setStartingCoordinates(location);
              break;
            case "destination":
              setDestinationCoordinates(location);
              break;
          }
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        console.log(error.message);
        reject();
      }
    });
  };

  useEffect(() => {
    if (starting && destination) {
      (async () => {
        await Promise.all([
          createLocationCoordinate(starting, "starting"),
          createLocationCoordinate(destination, "destination"),
        ]);
      })();
    } else return;
  }, [starting, destination]);

  return (
    <LocationContext.Provider
      value={{
        starting,
        setStarting,
        destination,
        setDestination,
        startingCoordinates,
        setDestinationCoordinates,
        setStartingCoordinates,
        destinationCoordinates,
        distance,
        setDistance,
        duration,
        setDuration
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
