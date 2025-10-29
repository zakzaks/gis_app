import { NextResponse } from "next/server";
import geojson from "@/app/data/geo.json";

export async function GET() {
	return NextResponse.json(geojson, {
		headers: { "Cache-Control": "no-store" },
	});
}
