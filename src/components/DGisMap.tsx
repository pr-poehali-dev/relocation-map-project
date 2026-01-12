import { useEffect, useRef } from "react";

interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  costOfLiving: number;
}

interface MapProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

declare global {
  interface Window {
    DG: any;
  }
}

const DGisMap = ({ cities, onCitySelect, selectedCity }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://maps.api.2gis.ru/2.0/loader.js?pkg=full";
    script.async = true;
    script.onload = () => {
      if (window.DG && mapRef.current) {
        window.DG.then(() => {
          const map = window.DG.map(mapRef.current, {
            center: [48, 15],
            zoom: 4,
            zoomControl: true,
          });
          mapInstanceRef.current = map;
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      const existingScript = document.querySelector('script[src*="2gis.ru"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.DG) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const getCostColor = (cost: number) => {
      if (cost < 60) return "#10b981";
      if (cost < 75) return "#eab308";
      return "#ef4444";
    };

    cities.forEach((city) => {
      const color = getCostColor(city.costOfLiving);
      const marker = window.DG.marker([city.lat, city.lng], {
        icon: window.DG.divIcon({
          html: `<div style="
            width: 16px;
            height: 16px;
            background: ${color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [16, 16],
        }),
      }).addTo(mapInstanceRef.current);

      marker.bindPopup(`<b>${city.name}</b><br/>${city.country}`);
      marker.on("click", () => onCitySelect(city));
      
      markersRef.current.push(marker);
    });
  }, [cities, onCitySelect]);

  useEffect(() => {
    if (mapInstanceRef.current && selectedCity && window.DG) {
      mapInstanceRef.current.setView([selectedCity.lat, selectedCity.lng], 8);
    }
  }, [selectedCity]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default DGisMap;
