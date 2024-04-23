"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import dynamic from "next/dynamic";
import AddressSearchBar from "./AddressSearchBar";

const defaultCoords = [41.91946055, -87.69612918];

// SSR must be disabled explicity or webpack throws a reference error
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function ProjectMap({
  geoJSON,
  searchParams,
}: {
  geoJSON: any;
  searchParams?: { lat?: string; long?: string };
}) {
  const [selectedFeature, setSelectedFeature] = useState(null);
  //If there are search params for the centering coordinates, use them
  const [lat, long] =
    searchParams?.lat && searchParams?.long
      ? [+searchParams.lat, +searchParams.long]
      : defaultCoords;

  function onEachFeature(feature: any, layer: any) {
    if (feature.properties) {
      // bind the tooltip only if it's a desktop viewport
      const isDesktop = window.innerWidth > 768;
      if (isDesktop) {
        const { item, year, cost, ward } = feature.properties;
        let formattedCost = new Intl.NumberFormat("en-US").format(
          Math.round(cost)
        );
        layer.bindTooltip(
          `${item}<br>Ward ${ward} - ${year}<br>$${formattedCost}`,
          {
            sticky: true,
          }
        );
      }

      layer.on({
        click: () => {
          setSelectedFeature(feature.properties);
        },
      });
    }
  }

  return (
    <>
      <AddressSearchBar />
      <div className="w-full h-full z-0">
        <Map
          geoJSON={geoJSON}
          onEachFeature={onEachFeature}
          center={[lat, long]}
          zoomLevel={14}
        />
      </div>
      {selectedFeature && <ProjectCard project={selectedFeature} />}
    </>
  );
}
