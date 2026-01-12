import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  costOfLiving: number;
}

interface GoogleMapProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

const GoogleMap = ({ cities, onCitySelect, selectedCity }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      });

      try {
        await loader.load();

        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center: { lat: 48, lng: 15 },
            zoom: 4,
            styles: [
              {
                elementType: "geometry",
                stylers: [{ color: "#1a1f2c" }],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#1a1f2c" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#8E9196" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#0EA5E9" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#2d3748" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
            ],
            disableDefaultUI: true,
            zoomControl: true,
          });

          setMap(newMap);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!map) return;

    markers.forEach((marker) => marker.setMap(null));

    const newMarkers = cities.map((city) => {
      const getCostColor = (cost: number) => {
        if (cost < 60) return "#10b981";
        if (cost < 75) return "#eab308";
        return "#ef4444";
      };

      const marker = new google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map: map,
        title: `${city.name}, ${city.country}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: getCostColor(city.costOfLiving),
          fillOpacity: 0.9,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });

      marker.addListener("click", () => {
        onCitySelect(city);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, cities, onCitySelect]);

  useEffect(() => {
    if (map && selectedCity) {
      map.panTo({ lat: selectedCity.lat, lng: selectedCity.lng });
      map.setZoom(8);
    }
  }, [map, selectedCity]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMap;
