import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

interface Location {
  name: string;
  full_address: string;
  phone_number: string;
  rating: number;
  place_link?: string;
  photos?: { src: string }[]; // Optional photos array
}

const MapContainer = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [lonLocation, setLonLocation] = useState<number | null>(null);
  const [latLocation, setLatLocation] = useState<number | null>(null);

  useEffect(() => {
    const fetchLocationAndData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            setLatLocation(lat);
            setLonLocation(lon);
            await fetchData(lat, lon);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Unable to get your current location.");
          }
        );
      } else {
        console.error("Geolocation is not supported.");
        alert("Geolocation is not supported by this browser.");
      }
    };

    fetchLocationAndData();
  }, []);

  const fetchData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        "https://maps-data.p.rapidapi.com/nearby.php",
        {
          params: {
            query: "Hospital",
            lat,
            lng: lon,
            limit: "20",
            country: "in",
            lang: "en",
            offset: "0",
            zoom: "12",
          },
          // headers: {
          //   "X-RapidAPI-Key":
          //     "99dc1000cemsh291549447bf7633p17db69jsn43e644ed846c",
          //   "X-RapidAPI-Host": "maps-data.p.rapidapi.com",
          // },
        }
      );
      const data = response.data.data;
      const filteredLocations = data.filter(
        (location: Location) => location.rating && location.phone_number
      );
      setLocations(filteredLocations);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      alert("Error fetching hospital data.");
    }
  };

  return (
    <div className="p-2 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Nearby Hospitals</h2>
      <div className="p-2 w-full  h-[90vh] overflow-auto space-y-4 hidden-scrollbar">
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <div
              key={index}
              className="bg-slate-100 shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              {location.photos && location.photos.length > 0 && (
                <div className="flex-shrink-0 w-full sm:w-40 h-40 rounded-lg overflow-hidden">
                  <img
                    src={location.photos[0].src} // Use the first photo's src as the image
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-x-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {location.name}
                  </h3>
                  <p className="text-gray-700 mb-2 w-full xl:w-[800px]">
                    {location.full_address}
                  </p>
                  <p className="text-gray-600">Rating: {location.rating}/5</p>
                </div>
                <div className="flex space-x-6 items-center">
                  {location.place_link && (
                    <Link
                      href={location.place_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 text-white py-[8px] px-[15px] flex items-center justify-center gap-x-4 rounded  hover:bg-blue-600"
                    >
                      <FaMapMarkerAlt className="w-5 h-5 text-white" />
                      <span>Location</span>
                    </Link>
                  )}
                  <a
                    href={`tel:${location.phone_number}`}
                    className="bg-black text-white py-[8px] px-[15px] flex items-center justify-center gap-x-4 rounded  hover:bg-slate-900"
                  >
                    <FaPhone className="w-5 h-5 text-white" />
                    <span>{location.phone_number}</span>
                  </a>
                </div>
                s
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No hospitals found near your location.
          </p>
        )}
      </div>
    </div>
  );
};

export default MapContainer;
