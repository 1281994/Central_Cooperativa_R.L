"use client"

import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./InteractiveGeoLocation.css";

// Datos de ejemplo para los departamentos de Nicaragua (coordenadas aproximadas)
const geoJsonData = {
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

// Estilo para los polígonos (colores según el estado)
const style = (feature) => ({
  fillColor: feature.properties.status === "actual" ? "#ff9999" : "#cccccc",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7
});

// Mostrar un popup al hacer clic en un departamento
const onEachFeature = (feature, layer) => {
  layer.bindPopup(`<b>${feature.properties.name}</b><br>Estado: ${feature.properties.status}`);
};

export default function InteractiveGeoLocation() {
  const position = [12.8654, -85.2072]; // Centro de Nicaragua

  return (
    <section className="geo-location-section">
      <div className="geo-container">
        <div className="geo-map">
          <MapContainer center={position} zoom={7} style={{ height: "600px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={geoJsonData} style={style} onEachFeature={onEachFeature} />
          </MapContainer>
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
            <p className="geo-date">11:43 PM CST, 20 de Mayo 2025</p>
          </div>
          <p className="geo-description">
            La Central de Cooperativas Las Diosas opera en el norte de Nicaragua, con intervención actual en Estelí, Jinotega, Matagalpa, Nueva Segovia y Madriz, y planea expandirse a Boaco y León en el futuro. Este mapa interactivo muestra su área de influencia.
          </p>
        </div>
      </div>
    </section>
  );
}