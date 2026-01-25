"use client";

import { useEffect, useRef, useState } from "react";
import { load_google_maps } from "../lib/google_maps";
import OpacitySlider from "./opacity";
import Sidebar from "../app/sidebar";

export default function Home() {
  const map_ref = useRef<HTMLDivElement>(null);
  const [map, set_map] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    // Check if API key is loaded (for debugging)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ Google Maps API key is missing!");
    } else {
      console.log("✅ Google Maps API key is loaded");
    }
    
    load_google_maps();
    async function init_map() {
      try {
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { ColorScheme } = (await google.maps.importLibrary("core")) as google.maps.CoreLibrary;

      if (map_ref.current) {
        const new_map = new Map(map_ref.current, {
          center: { lat: 35.6205, lng: -117.6718 },
          zoom: 12,
          colorScheme: ColorScheme.LIGHT,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
        });
        set_map(new_map);
        console.log("✅ Google Maps initialized successfully");
      }
      } catch (error) {
        console.error("❌ Failed to load Google Maps:", error);
      }
    }
    init_map();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Sidebar map={map} />
      <OpacitySlider map={map} />
      <div ref={map_ref} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}
