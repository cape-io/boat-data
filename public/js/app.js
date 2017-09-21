
 // instantiate the map:
const mapEl = L.map('map', { fullscreenControl: true }).setView([39, -102], 3)

// Basemaps:

// Esri tiled maps:
const esriTopo = L.esri.basemapLayer('Topographic').addTo(mapEl)
const esriImagery = L.esri.basemapLayer('Imagery')
const esriImageryLabels = L.esri.basemapLayer('ImageryLabels')
const esriImageryGrp = L.layerGroup([esriImagery, esriImageryLabels]).addTo(mapEl)
const esriOceans = L.esri.basemapLayer('Oceans').addTo(mapEl).bringToBack()
// NOAA WOC:
const wocOSM = L.tileLayer.wms('http://osm.woc.noaa.gov/mapcache?service=wms', {
  layers: 'osm',
  format: 'image/png',
  transparent: false,
  attribution: 'NOAA WOC, Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
}).addTo(mapEl).bringToBack()

// MapQuest
const MapQuestOpen_OSM = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
  type: 'map',
  ext: 'jpg',
  attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: '1234',
})

const MapQuestOpen_Aerial = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
  type: 'sat',
  ext: 'jpg',
  attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
  subdomains: '1234',
})

// Overlays
// a function to wrap adding a DynamicMapLayer and configuring a popup dialog using 'identify'
// parameters: options: array of layer options to pass
//  identifyAttributes: assoc. array of layer attributes to display in popup window
function addDynamicMapLayer(mapEl, name, url, options, identifyAttributes) {
  // assign default value to options, identifyAttributes:
  if (typeof options === 'undefined') {
    options = {}
  }
  if (typeof identifyAttributes === 'undefined') {
    identifyAttributes = {}
  }
  // either add to map approach works the same
  const layer = L.esri.dynamicMapLayer(url, options).addTo(mapEl)
  // var layer = L.esri.dynamicMapLayer(url, options);
  // map.addLayer(layer, true);

  // console.log("layer._layerParams.layers: " + layer._layerParams.layers + ", layer.options.layers: " + layer.options.layers);

  mapEl.on('click', (e) => {
    if (mapEl.layerVis[name] === true) {
      // console.log("Layer: " + name + " is currently visible!");
      layer.identify(e.latlng, {}, (data) => {
        let popupText = ''
        const none = 'None'
        // console.log(data.results);
        if (data.results.length > 0) {
          for (result in data.results) {
            popupText = `<p><center class='grey_back'><b>Layer Name:</b> ${name}</center></p><p><center>`
            for (key in identifyAttributes) {
              // console.log("Key: " + key + ", val: " + data.results[0].attributes[identifyAttributes[key]]);
              popupText += `<b>${key}</b>: ${data.results[0].attributes[identifyAttributes[key]] === 'Null' ? none : data.results[0].attributes[identifyAttributes[key]]}<br/>`
            }
            popupText += '</center></p>'
            L.popup().setLatLng(e.latlng).setContent(popupText).openOn(mapEl)
          }
          data.results = null
        }
      })
    }
  })
  return layer
}

// add the AWOIS/ENC wrecks and obstructions layers:
const merged_wrecks_service_url = 'https://wrecks.nauticalcharts.noaa.gov/arcgis/rest/services/public_wrecks/Wrecks_And_Obstructions/MapServer'
const awoisObstructions = addDynamicMapLayer(mapEl, 'AWOIS Obstructions', merged_wrecks_service_url,
  { layers: [5], position: 'front', format: 'png32' },
  { Record: 'recrd', 'Vesselterms:': 'vesslterms', Type: 'feature_type', Latitude: 'latdec', Longitude: 'londec', 'Positional Accuracy': 'gp_quality', 'Year Sunk': 'yearsunk', Depth: 'depth', 'Depth Units': 'sounding_type', History: 'history' }
)
const encWrecks = addDynamicMapLayer(mapEl, 'ENC Wrecks', merged_wrecks_service_url,
  { layers: [10], position: 'front', format: 'png32' },
  { 'Vesselterms:': 'vesslterms', Type: 'feature_type', Latitude: 'latdec', Longitude: 'londec', 'Year Sunk': 'yearsunk', Depth: 'depth', History: 'history', 'Sounding Quality': 'quasou', 'Water Level Effect': 'watlev' }
)
const awoisWrecks = addDynamicMapLayer(mapEl, 'AWOIS Wrecks', merged_wrecks_service_url,
  { layers: [0], position: 'front', format: 'png32' },
  { Record: 'recrd', 'Vesselterms:': 'vesslterms', Type: 'feature_type', Latitude: 'latdec', Longitude: 'londec', 'Positional Accuracy': 'gp_quality', 'Year Sunk': 'yearsunk', Depth: 'depth', 'Depth Units': 'sounding_type', History: 'history' }
)
const encBoundaries = L.esri.dynamicMapLayer(merged_wrecks_service_url, {
  layers: [15, 16, 17, 18, 19],
  format: 'png32',
  position: 'back',
})

const maritimeBoundaries = L.esri.dynamicMapLayer('https://maritimeboundaries.noaa.gov/arcgis/rest/services/MaritimeBoundaries/US_Maritime_Limits_Boundaries/MapServer', {
  position: 'front',
}).addTo(mapEl)

const sanctuariesBoundaries = L.esri.dynamicMapLayer('https://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/mapoverlays_political/MapServer', {
  layers: [0],
  format: 'png32',
  position: 'front',
})

const seamlessRaster = L.esri.dynamicMapLayer('https://seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/MapServer', {
  layers: [1, 2, 3],
  format: 'png24',
  position: 'back',
})

// define base layers and overlays for Leaflet Layers control:
const baseMaps = {
  'Esri Topographic': esriTopo,
  'Esri Imagery': esriImageryGrp,
  'Esri Oceans': esriOceans,
  'OpenStreetMap (NOAA)': wocOSM,
}
const overlayMaps = {
  'AWOIS Wrecks': awoisWrecks,
  'ENC Wrecks': encWrecks,
  'AWOIS Obstructions': awoisObstructions,
  'ENC Boundaries': encBoundaries,
  'US Maritime Boundaries': maritimeBoundaries,
  'US Marine Sanctuaries': sanctuariesBoundaries,
  'NOAA Nautical Charts': seamlessRaster,
}

const layerVisHash = {
  'AWOIS Wrecks': true,
  'ENC Wrecks': true,
  'AWOIS Obstructions': true,
  'ENC Boundaries': true,
  'US Maritime Boundaries': true,
  'US Marine Sanctuaries': true,
  'NOAA Nautical Charts': true,
}
mapEl.layerVis = layerVisHash

// add the Layers control to the map:
const layerControl = L.control.layers(baseMaps, overlayMaps, {
  collapsed: false,
}).addTo(mapEl)
mapEl.on('overlayadd', (e) => {
    // console.log("layer: " + e.name + " was added.");
  mapEl.layerVis[e.name] = true
    /* debug:
    for (key in map.layerVis) {
        console.log("layerVis value: " + key + ":" + map.layerVis[key] );
    };
    */
})
mapEl.on('overlayremove', (e) => {
    // console.log("layer: " + e.name + " was removed.");
  mapEl.layerVis[e.name] = false
     /* debug:
    for (key in map.layerVis) {
        console.log("layerVis value: " + key + ":" + map.layerVis[key] );
    };
    */
})

// add scale control:
L.control.scale().addTo(mapEl)
// MousePosition:
L.control.mousePosition().addTo(mapEl)

// Remove Seamless raster layer, background layers by default:
mapEl.removeLayer(esriImageryGrp)
mapEl.removeLayer(esriOceans)
mapEl.removeLayer(encBoundaries)
mapEl.removeLayer(sanctuariesBoundaries)
mapEl.removeLayer(seamlessRaster)
mapEl.removeLayer(wocOSM)
mapEl.removeLayer(MapQuestOpen_OSM)
mapEl.removeLayer(MapQuestOpen_Aerial)

legend('#legend', { 1: 'AWOIS Wrecks', 6: 'AWOIS Obstructions', 11: 'ENC Wrecks', 15: 'ENC Boundaries', 16: '', 17: '', 18: '', 19: '' })
bindLegendToggle()
