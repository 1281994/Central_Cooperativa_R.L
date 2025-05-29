"use client"

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "./InteractiveGeoLocation.css";

// Cargar componentes de react-leaflet dinámicamente
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });

// Lista de departamentos con intervención actual y futura
const currentIntervention = ["Estelí", "Jinotega", "Matagalpa", "Nueva Segovia", "Madriz"];
const futureIntervention = ["Boaco", "León"];

// Datos estáticos como respaldo
const staticGeoJsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Estelí", status: "actual" },
      geometry: { type: "Polygon", coordinates: [[[-86.4, 13.2], [-86.2, 13.2], [-86.2, 13.0], [-86.4, 13.0], [-86.4, 13.2]]] }
    },
    {
      type: "Feature",
      properties: { name: "Jinotega", status: "actual" },
      geometry: { type: "Polygon", coordinates: [[[-86.0, 13.3], [-85.8, 13.3], [-85.8, 13.1], [-86.0, 13.1], [-86.0, 13.3]]] }
    },
    {
      type: "Feature",
      properties: { name: "Matagalpa", status: "actual" },
      geometry: { type: "Polygon", coordinates: [[[-85.9, 13.0], [-85.7, 13.0], [-85.7, 12.8], [-85.9, 12.8], [-85.9, 13.0]]] }
    },
    {
      type: "Feature",
      properties: { name: "Nueva Segovia", status: "actual" },
      geometry: { type: "Polygon", coordinates: [[[-86.5, 13.5], [-86.3, 13.5], [-86.3, 13.3], [-86.5, 13.3], [-86.5, 13.5]]] }
    },
    {
      type: "Feature",
      properties: { name: "Madriz", status: "actual" },
      geometry: { type: "Polygon", coordinates: [[[-86.3, 13.4], [-86.1, 13.4], [-86.1, 13.2], [-86.3, 13.2], [-86.3, 13.4]]] }
    },
    {
      type: "Feature",
      properties: { name: "Boaco", status: "futuro" },
      geometry: { type: "Polygon", coordinates: [[[-85.6, 12.5], [-85.4, 12.5], [-85.4, 12.3], [-85.6, 12.3], [-85.6, 12.5]]] }
    },
    {
      type: "Feature",
      properties: { name: "León", status: "futuro" },
      geometry: { type: "Polygon", coordinates: [[[-86.9, 12.5], [-86.7, 12.5], [-86.7, 12.3], [-86.9, 12.3], [-86.9, 12.5]]] }
    }
  ]
};

// Función para asignar el estado a cada departamento
const addStatusToGeoJson = (geoJson) => {
  return {
    ...geoJson,
    features: geoJson.features.map((feature) => {
      const deptName = feature.properties.NAME_1 || feature.properties.name;
      let status = "ninguno";
      if (currentIntervention.includes(deptName)) {
        status = "actual";
      } else if (futureIntervention.includes(deptName)) {
        status = "futuro";
      }
      return {
        ...feature,
        properties: { ...feature.properties, name: deptName, status }
      };
    })
  };
};

// Estilo para los polígonos, ajustado para mejor visibilidad
const style = (feature, mapType) => ({
  fillColor: feature.properties.status === "actual" ? "#ff3333" : feature.properties.status === "futuro" ? "#999999" : "transparent",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: mapType === "satellite" || mapType === "hybrid" ? 0.9 : 0.7
});

// Popup y resaltado en departamentos
const onEachFeature = (feature, layer, mapType) => {
  const statusText = feature.properties.status === "actual" ? "actual" : feature.properties.status === "futuro" ? "futuro" : "ninguno";
  layer.bindPopup(`<b>${feature.properties.name}</b><br>Estado: ${statusText}`);
  layer.on({
    mouseover: (e) => {
      e.target.setStyle({ weight: 5, color: "#666", fillOpacity: 0.9 });
    },
    mouseout: (e) => {
      e.target.setStyle(style(feature, mapType));
    }
  });
};

export default function InteractiveGeoLocation() {
  const [mapType, setMapType] = useState('roadmap');
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [terrainError, setTerrainError] = useState(false);
  const position = [12.8654, -85.2072]; // Centro de Nicaragua

  // Configurar datos estáticos al montar el componente
  useEffect(() => {
    const processedStaticData = addStatusToGeoJson(staticGeoJsonData);
    setGeoJsonData(processedStaticData);
  }, []);

  // Función para obtener la URL del tile layer según el tipo de mapa
  const getMapTileUrl = () => {
    if (mapType === 'terrain' && terrainError) {
      return 'https://tile.openstreetmap.de/{z}/{x}/{y}.png'; // Respaldo para terreno
    }
    switch (mapType) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'; // OpenTopoMap
      case 'hybrid':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  // Función para obtener la atribución según el tipo de mapa
  const getMapAttribution = () => {
    if (mapType === 'terrain' && terrainError) {
      return '© <a href="https://www.openstreetmap.de">OpenStreetMap Germany</a>';
    }
    switch (mapType) {
      case 'satellite':
        return '© <a href="https://www.esri.com">Esri</a> — Source: Esri';
      case 'terrain':
        return '© <a href="https://www.opentopomap.org">OpenTopoMap</a> (CC BY-SA)';
      case 'hybrid':
        return '© <a href="https://www.esri.com">Esri</a> & <a href="https://www.openstreetmap.org">OpenStreetMap</a>';
      default:
        return '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }
  };

  // Definir los límites de Nicaragua
  const nicaraguaBounds = [
    [14.5, -87.7], // Noroeste
    [11.0, -83.0]  // Sureste
  ];

  return (
    <section className="geo-location-section">
      <div className="map-type-buttons">
        <button
          onClick={() => setMapType('roadmap')}
          className={mapType === 'roadmap' ? 'active' : ''}
        >
          Mapa de Rutas
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className={mapType === 'satellite' ? 'active' : ''}
        >
          Satélite
        </button>
        <button
          onClick={() => {
            setMapType('terrain');
            setTerrainError(false); // Resetear error al intentar cargar terreno
          }}
          className={mapType === 'terrain' ? 'active' : ''}
        >
          Terreno
        </button>
        <button
          onClick={() => setMapType('hybrid')}
          className={mapType === 'hybrid' ? 'active' : ''}
        >
          Híbrido
        </button>
      </div>

      <div className="geo-container">
        <div className="geo-map">
          {terrainError && mapType === 'terrain' && (
            <div style={{ color: "orange", padding: "10px" }}>
              No se pudo cargar el mapa de terreno. Usando respaldo.
            </div>
          )}
          {!geoJsonData ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>Cargando mapa...</p>
            </div>
          ) : (
            <MapContainer
              center={position}
              zoom={6}
              style={{ height: "600px", width: "100%" }}
              maxBounds={nicaraguaBounds}
              maxBoundsViscosity={1.0}
              minZoom={6}
              maxZoom={10}
            >
              {mapType === 'hybrid' && (
                <>
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="© Esri — Source: Esri"
                    minZoom={6}
                    maxZoom={10}
                  />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    minZoom={6}
                    maxZoom={10}
                    opacity={0.5}
                  />
                </>
              )}
              {mapType !== 'hybrid' && (
                <TileLayer
                  url={getMapTileUrl()}
                  attribution={getMapAttribution()}
                  minZoom={6}
                  maxZoom={10}
                  eventHandlers={{
                    tileerror: () => {
                      if (mapType === 'terrain' && !terrainError) {
                        console.warn("OpenTopoMap falló, usando respaldo.");
                        setTerrainError(true);
                      }
                    }
                  }}
                />
              )}
              <GeoJSON
                data={geoJsonData}
                style={(feature) => style(feature, mapType)}
                onEachFeature={(feature, layer) => onEachFeature(feature, layer, mapType)}
              />
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
              <li>Tipos de Mapa:</li>
              <ul>
                <li>Mapa de Rutas: Vista estándar de calles y rutas</li>
                <li>Satélite: Imágenes satelitales</li>
                <li>Terreno: Mapa físico con información topográfica</li>
                <li>Híbrido: Combinación de satélite y rutas</li>
              </ul>
            </ul>
            <p className="geo-scale">Escala: Aproximada</p>
            <p className="geo-credits">Capa de servicio: {getMapAttribution()}</p>
            <p className="geo-date">12:24 AM CST, 24 de Mayo 2025</p>
          </div>
          <p className="geo-description">
            La Central de Cooperativas Las Diosas opera en el norte de Nicaragua, con intervención actual en Estelí, Jinotega, Matagalpa, Nueva Segovia y Madriz, y planea expandirse a Boaco y León en el futuro. Este mapa interactivo muestra su área de influencia.
          </p>
        </div>
      </div>
    </section>
  );
}