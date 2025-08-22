import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HospitalMap() {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        async function fetchHospitals() {
            const query = `
        [out:json];
        node["amenity"="hospital"](around:2000,22.5726,88.3639);
        out;
      `;
            const res = await fetch(
                "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query)
            );
            const data = await res.json();
            setHospitals(data.elements);
        }
        fetchHospitals();
    }, []);

    return (
        <MapContainer
            center={[22.5726, 88.3639]}
            zoom={14}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {hospitals.map((h, i) => (
                <Marker key={i} position={[h.lat, h.lon]}>
                    <Popup>{h.tags.name || "Unnamed Hospital"}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
