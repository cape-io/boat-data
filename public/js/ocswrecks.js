/*
*  ocswrecks.js: JavaScript utility functions for Leaflet map preview
*   Author: Micah Wengren
*/
var serviceBaseURL = "https://wrecks.nauticalcharts.noaa.gov/arcgis/rest/services/public_wrecks/Wrecks_And_Obstructions/MapServer"

function requestLegendInfo(handler) {
    legendUrl = serviceBaseURL + "/legend?f=json";
    jQuery.ajax(legendUrl,{
        dataType: 'jsonp',
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Notice: there was an issue requesting legend info from ArcGIS Server: " + errorThrown);
        },
        success: handler,
        statusCode: {
            200: function(data, textStatus, jqXHR) {
                handler(data, textStatus, jqXHR);
            }
        }
    });
     
}

function legend(cssSelector, layerDefs) {
    requestLegendInfo(function(data, status){
        //console.log("status: " + status);
        
        var layerIds = [];
        for (layer in layerDefs) {
            if (layerDefs.hasOwnProperty(layer)) {
                layerIds.push(parseInt(layer));
            }
        }
        //console.log(layerIds);
        
        var legendHtml = "<div style='text-align: left'>"
        var layerTemplate = "<div class='legend_wrapper'><div class='legend_icon'><img src='__imgsrc__' alt='legend icon' /></div><div class='font_small' >__imglabel__</div></div>";
        var layerTitleTemplate = "<div class='legend_title'>__layertitle__</div>"
        var numlines = 0;
        for (var layer in data.layers) {
            if (data.layers.hasOwnProperty(layer)) {
                //console.log("layer: " + JSON.stringify(data.layers[layer]));
                //console.log("layerinfo: " + data.layers[layer].layerId + ", " + data.layers[layer].layerName);
                
                //check to see if it is a layer we want in the legend:
                if (layerIds.indexOf(data.layers[layer].layerId) !== -1){
                    //if a blank title string was passed to the layerDefs variable (eg ""), don't create a title for this layer, otherwise use the template and substitute:
                    if (layerDefs[data.layers[layer].layerId] != "") legendHtml += layerTitleTemplate.replace("__layertitle__",layerDefs[data.layers[layer].layerId]);
                    else legendHtml += "";
                    
                    //create the legend entry (image + caption):
                    for (legend in data.layers[layer].legend) {
                        if (data.layers[layer].legend.hasOwnProperty(legend)) {
                            //console.log("data.layers[layer].legend[legend].label: " + data.layers[layer].legend[legend].label);
                            var legendImageUrl = serviceBaseURL + "/" + data.layers[layer].layerId + "/images/" + data.layers[layer].legend[legend].url;
                            
                            //if (typeof data.layers[layer].legend[legend].label === "undefined") legendHtml += layerTemplate.replace("__imgsrc__",legendImageUrl).replace("__imglabel__","");
                            if (data.layers[layer].legend[legend].label == "<Null>") legendHtml += layerTemplate.replace("__imgsrc__",legendImageUrl).replace("__imglabel__","");
                            else legendHtml += layerTemplate.replace("__imgsrc__",legendImageUrl).replace("__imglabel__",data.layers[layer].legend[legend].label);
                            numlines += 1;
                        }
                    }
                    //console.log("legendHtml: " + legendHtml);
                }
            }
        }
        legendHtml += "</div>";
        var height = (numlines * 25) + "px";
        //console.log("height: " + height);
        jQuery(cssSelector).html(legendHtml);
        jQuery(cssSelector).css("height", height);
       });
}

function bindLegendToggle() {
    var legendVisible = false;
    jQuery("#legendButton").bind( "click", function(e) {
        if (!legendVisible) {
            jQuery("#legendButton").text("Hide Legend");
            legendVisible = !legendVisible;
            jQuery("#legend").show();
        } else {
            jQuery("#legendButton").text("Show Legend");
            legendVisible = !legendVisible;
            jQuery("#legend").hide();
        }
        e.stopPropagation();
    });
}

