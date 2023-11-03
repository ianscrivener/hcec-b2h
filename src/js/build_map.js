// ##############################################################
// main function          #######################################
async function buildMap() {
  // variables

  let baseMaps = {};
  let overlayMaps = {};
  // map.cursor.enable();

  // get the layerConfig JSONL from a helper fuction
  const layerConfig = await loadJsonl();

  // #######################################################
  // map click handler

  // function updateInfo() {
  //     // const { zState.centreLat, zState.centreLat } = map.getCenter();
  //     const zoom = map.getZoom();
  //     markerPlace.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
  //         5
  //     )} | zoom: ${zoom}`;
  // }


  // on drag end
  // map.on("dragend", updateInfo);

// on zoom end
// map.on('zoomend', function(ev) {
//    // console.log(ev.target_zoom);
//    document.getElementById('f3').innerHTML = `<b>Zoom level:</b> ${ev.target._zoom} `;
// });

// map.on('click', function(ev) {
//     // console.log(ev.latlng.lat,ev.latlng.lng); // ev is an event object (MouseEvent in this case)
//     // console.log(ev.containerPoint.x, ev.containerPoint.y);
//     // console.log(ev.type);
//     // console.log(ev);
//     document.getElementById('f2').innerHTML = `<b>Last click coords:</b> ${r(ev.latlng.lat)} ${r(ev.latlng.lng)}`;
// });
// map.on('mousemove', function(ev){
//     document.getElementById('f1').innerHTML = `<b>Mouse coords:</b> ${r(ev.latlng.lat)} ${r(ev.latlng.lng)}`;
// });

  // Throttle fn
  //L.throttle(myFunction(){
  // )
  // EVENTS: resize, popup,

  // #######################################################
  // loop through the layerConfig array and create the leaflet layers
  layerConfig.forEach((layer) => {

    if (layer.visible !== 1) {
      return; // skips the current iteration and continues with the next
    }

    if (layer.type === 'layerGroup') {
      return; // skips the current iteration and continues with the next
    }

    // console.log(layer.layerType, '-', layer.label)
    // console.log(JSON.stringify(layer))

    let newLayer    = {};
    layer.type      = layer.type.trim()
    layer.url       = layer.url.trim()
    layer.label     = layer.label.trim()


    // ##################################################################
    // WMS - https://leafletjs.com/examples/wms/wms.html
    if (layer.layerType === 'wms') {

      let layerConfig = {
        layers: layer.showLayers,
        format: 'image/png',
        transparent: layer.transparent===1 ,
        attribution: layer.label
      }

      let newLayer = L.tileLayer.wms(
        layer.url,
        layerConfig
      ).addTo(map);

      console.log(JSON.stringify(layerConfig))
    }


    // tiledMapLayer
    // if(layer.type === "tiledMap"){
    //     let opts = {
    //         layers:         layer.showLayers,
    //         format:         "image/png",
    //         transparent:    layer.transparent,
    //         attribution:    layer.label
    //     }
    //     // console.log(layer.url);
    //     console.log(opts);
    // };

    // GeoJSON - https://leafletjs.com/examples/geojson/
    // if(layer.type === "geojson") {
    //     // newLayer = L.esri.featureLayer(layer.url).addTo(map);
    // }

    // ##################################################################
    // ArcGIS feature layer
    if (layer.layerType === 'esriFeature') {
      newLayer = L.esri.featureLayer(layer.url).addTo(map);
    }

    // ##################################################################
    // ArcGIS MapServer layer
    //     L.esri.dynamicMapLayer({
    //       url: "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/EDP/Administrative_Boundaries/MapServer",
    //       layers: [0,1,2,3,4,5] // specifying the layer(s) to display
    //     }).addTo(map);

    if (layer.layerType === 'esriMapServer') {

      // console.log('esriMapServer:', layer.label)
      newLayer = L.esri.dynamicMapLayer({
        url: layer.url,
        layers: layer.showLayers
      }).addTo(map);

      // console.log(layer.url);
      // console.log(JSON.stringify(layer.showLayers))

    }

    // ##################################################################
    // vectorTileLayer - "Esri vector tile service" - via plugin
    // https://developers.arcgis.com/esri-leaflet/api-reference/layers/vector-layer/
    if (layer.layerType === 'esriVectorTile') {
      newLayer = L.esri.Vector.vectorTileLayer(layer.url).addTo(map);
    }

    // ##################################################################
    if (newLayer === {}) {
      console.log('Bad JSON Data;');
      console.log(layer);
    }
    else {
      if (newLayer && layer.layerGroup === 'BASE') {
        baseMaps[layer.label] = newLayer;
      }
      else {
        overlayMaps[layer.label] = newLayer;
      }
    }
  });

// L.control.layers(baseMaps).addTo(map);
// L.control.layers(baseMaps, overlayMaps).addTo(map);
// L.control.layers(overlayMaps).addTo(map);
// this.xxx = L.control.layers(baseMaps, overlayMaps)

}


// ##################################################################
const consoleLogStuff = function (arr) {
  arr.forEach(function (value) {
    console.log(value, ':\n', JSON.stringify(eval(value)));
  });
}



