// ########################################
const overlay_template = function(layer){
  return `
    <div class="layer-1">
      <nbsp;<abbr title="this layer is visible - click to hide"><i class="bi bi-eye"></i></abbr>
      <abbr title="this layer is visible - click to hide"><i class="bi bi-search"></i></abbr>
      ${layer.label}
    </div>
  `

}


// ########################################
const base_template = function(layer){
  return `
    <div class="layer-1">
        &nbsp;<abbr title="this layer is visible - click to hide"><i class="bi bi-circle"></i></abbr>
        ${layer.label}
    </div>
  `
}


// ##################################################################
async function buildTaxonomy(layerConfig) {

  layerConfig.forEach((layer) => {

    // BASE LAYERS
    if (layer.layerGroup === 'BASE') {
      console.log(layer.label, layer.displayOrder);
      let html = base_template(layer);
      document.getElementById('base_layers_div').innerHTML += html;
    }

    // OVERLAY LAYERS
    else {
      console.log("   ", layer.layerType, '-', layer.label, '-', layer.displayOrder);
      let html = overlay_template(layer);
      document.getElementById('overlay_layers_div').innerHTML += html;
    }
  })
}
