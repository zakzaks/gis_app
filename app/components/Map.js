"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Map({ geojson }) {
	const pointToLayer = (feature, latlng) => {
		const props = feature.properties || {};

		// Custom icon configuration based on properties
		if (props.icon) {
			const customIcon = L.icon({
				iconUrl: props.icon,
				iconSize: props.iconSize || [25, 41],
				iconAnchor: props.iconAnchor || [12, 41],
				popupAnchor: props.popupAnchor || [1, -34],
				shadowSize: props.shadowSize || [41, 41],
			});
			return L.marker(latlng, { icon: customIcon });
		}

		// Default marker
		return L.marker(latlng);
	};
	const onEach = (feature, layer) => {
		const props = feature.properties || {};
		const html = Object.entries(props)
			.map(([k, v]) => `<b>${k}</b>: ${String(v)}`)
			.join("<br/>");
		if (html && layer.bindPopup) layer.bindPopup(html);
	};

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			<MapContainer
				center={[-6.2, 106.85]} // Jakarta
				zoom={12}
				style={{ height: "100%", width: "100%" }}
			>
				{/* Base layer: Esri World Imagery */}
				<TileLayer
					attribution="© Esri — Source: Esri, Maxar, Earthstar Geographics"
					url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
				/>

				{/* Optional local GeoJSON overlay */}
				{geojson && (
					<GeoJSON
						data={geojson}
						onEachFeature={onEach}
						pointToLayer={pointToLayer}
					/>
				)}
			</MapContainer>
		</div>
	);
}
