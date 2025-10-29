"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Page() {
	const [data, setData] = useState(null);
	const [err, setErr] = useState(null);

	useEffect(() => {
		fetch("/api/geojson", { cache: "no-store" })
			.then(async (r) => (r.ok ? r.json() : Promise.reject(await r.json())))
			.then(setData)
			.catch((e) => setErr(e?.error || "Failed to load GeoJSON"));
	}, []);

	if (err) return <div style={{ padding: 16 }}>Error: {err}</div>;
	return <Map geojson={data} />;
}
