"use client"

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"; // CSS de Leaflet
import "./InteractiveGeoLocation.css";

// Cargar componentes de react-leaflet dinámicamente para evitar SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });

// Lista de departamentos con intervención actual y futura
const currentIntervention = ["Estelí", "Jinotega", "Matagalpa", "Nueva Segovia", "Madriz"];
const futureIntervention = ["Boaco", "León"];

// Datos estáticos como respaldo (los mismos que tenías originalmente)
const staticGeoJsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Estelí", status: "actual" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-86.4, 13.2], [-86.2, 13.2], [-86.2, 13.0], [-86.4, 13.0], [-86.4, 13.2]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Jinotega", status: "actual" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-86.0, 13.3], [-85.8, 13.3], [-85.8, 13.1], [-86.0, 13.1], [-86.0, 13.3]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Matagalpa", status: "actual" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-85.9, 13.0], [-85.7, 13.0], [-85.7, 12.8], [-85.9, 12.8], [-85.9, 13.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Nueva Segovia", status: "actual" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-86.5, 13.5], [-86.3, 13.5], [-86.3, 13.3], [-86.5, 13.3], [-86.5, 13.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Madriz", status: "actual" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-86.3, 13.4], [-86.1, 13.4], [-86.1, 13.2], [-86.3, 13.2], [-86.3, 13.4]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Boaco", status: "futuro" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-85.6, 12.5], [-85.4, 12.5], [-85.4, 12.3], [-85.6, 12.3], [-85.6, 12.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "León", status: "futuro" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-86.9, 12.5], [-86.7, 12.5], [-86.7, 12.3], [-86.9, 12.3], [-86.9, 12.5]
          ]
        ]
      }
    }
  ]
};

// Función para asignar el estado (actual o futuro) a cada departamento
const addStatusToGeoJson = (geoJson) => {
  return {
    ...geoJson,
    features: geoJson.features.map((feature) => {
      // Usar NAME_1 para GeoJSON real, o name para datos estáticos
      const deptName = feature.properties.NAME_1 || feature.properties.name;
      let status = "ninguno"; // Por defecto
      if (currentIntervention.includes(deptName)) {
        status = "actual";
      } else if (futureIntervention.includes(deptName)) {
        status = "futuro";
      }
      return {
        ...feature,
        properties: {
          ...feature.properties,
          name: deptName, // Aseguramos que siempre haya un "name"
          status: status
        }
      };
    })
  };
};

// Estilo para los polígonos (colores según el estado)
const style = (feature) => ({
  fillColor: feature.properties.status === "actual" ? "#ff9999" : feature.properties.status === "futuro" ? "#cccccc" : "transparent",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7
});

// Mostrar un popup al hacer clic en un departamento
const onEachFeature = (feature, layer) => {
  const statusText = feature.properties.status === "actual" ? "actual" : feature.properties.status === "futuro" ? "futuro" : "ninguno";
  layer.bindPopup(`<b>${feature.properties.name}</b><br>Estado: ${statusText}`);
};

export default function InteractiveGeoLocation() {
  const position = [12.8654, -85.2072]; // Centro de Nicaragua
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores

  // Cargar el GeoJSON solo en el cliente (opcional, ya que usamos datos estáticos)
  useEffect(() => {
    fetch("/data/gadm36_NIC_1.geojson")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo cargar el archivo GeoJSON. Usando datos estáticos como respaldo.");
        }
        return res.json();
      })
      .then((data) => {
        const processedData = addStatusToGeoJson(data);
        setGeoJsonData(processedData);
      })
      .catch((error) => {
        console.error("Error cargando el GeoJSON:", error);
        setError(error.message);
        // Usar datos estáticos como respaldo si el fetch falla
        const processedStaticData = addStatusToGeoJson(staticGeoJsonData);
        setGeoJsonData(processedStaticData);
      });
  }, []);

  return (
    <section className="geo-location-section">
      <div className="geo-container">
        <div className="geo-map">
          {error && (
            <div style={{ color: "red", padding: "10px" }}>
              {error}
            </div>
          )}
          {!geoJsonData ? (
            <div style={{ padding: "20px" }}>Cargando mapa...</div>
          ) : (
            <MapContainer center={position} zoom={7} style={{ height: "600px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <GeoJSON data={geoJsonData} style={style} onEachFeature={onEachFeature} />
            </MapContainer>
          )}
        </div>
        <div className="geo-info">
          <h2 className="geo-title">Área de Influencia de la Cooperativa Las Diosas</h2>
          <div className="geo-legend">
            <h3>Leyenda</h3>
            <ul>
              <li><span className="legend-color current"></span> Departamentos con intervención actual</li>
              <ul>
                <li>Estelí</li>
                <li>Jinotega</li>
                <li>Matagalpa</li>
                <li>Nueva Segovia</li>
                <li>Madriz</li>
              </ul>
              <li><span className="legend-color future"></span> Departamentos con intervención a futuro</li>
              <ul>
                <li>Boaco</li>
                <li>León</li>
              </ul>
            </ul>
            <p className="geo-scale">Escala: Aproximada</p>
            <p className="geo-credits">Capa de servicio: OpenStreetMap contributors</p>
            <p className="geo-date">01:07 AM CST, 21 de Mayo 2025</p>
          </div>
          <p className="geo-description">
            La Central de Cooperativas Las Diosas opera en el norte de Nicaragua, con intervención actual en Estelí, Jinotega, Matagalpa, Nueva Segovia y Madriz, y planea expandirse a Boaco y León en el futuro. Este mapa interactivo muestra su área de influencia.
          </p>
        </div>
      </div>
    </section>
  );
}