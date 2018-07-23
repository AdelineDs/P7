class LeafletMap{
    constructor(map, latLng=[45.764043, 4.835659], zoom=13.5, layer='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',minZoom=13.5, maxZoom=18){
        this.map = map;
        this.latLng = latLng;
        this.zoom = zoom;
        this.layer = layer;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.init();
    }//-- end constructor --
    
    init(){
        this.myMap = L.map(this.map).setView(this.latLng,this.zoom);
        this.markersCluster = L.markerClusterGroup();
        L.tileLayer(this.layer, {minZoom: this.minZoom, maxZoom: this.maxZoom}).addTo(this.myMap);
        this.myMap.addLayer(this.markersCluster);
        this.redIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          this.orangeIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          this.greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
    }
    
    stationsRecovery(source){
        ajaxGet(source, reponse => {
            let stationsList = JSON.parse(reponse);
            stationsList.forEach(station => {
                this.latLng = [station.position.lat, station.position.lng];
                if(station.status === "CLOSED"){
                    this.marker = L.marker(this.latLng, {icon: this.redIcon});
                    this.markersCluster.addLayer(this.marker);
                }
                else if(station.status === "OPEN" && station.available_bikes ===0){
                    this.marker = L.marker(this.latLng, {icon: this.orangeIcon});
                    this.markersCluster.addLayer(this.marker);
                }
                else{
                    this.marker = L.marker(this.latLng, {icon: this.greenIcon});
                    this.markersCluster.addLayer(this.marker);
                }
                
                this.marker.on('click', e => {
                    const infosContainer = document.getElementById("stationInfos");
                    infosContainer.innerHTML= "";
                    
                    const title = document.createElement("h2");
                    title.id = "stationName";
                    title.appendChild(document.createTextNode(station.name));
                    
                    const address = document.createElement("p");
                    address.appendChild(document.createTextNode(station.address));
                    
                    const availableBikeStands = document.createElement("p");
                    availableBikeStands.appendChild(document.createTextNode(`${station.available_bike_stands} places`));
                    
                    const availableBikes = document.createElement("p");
                    availableBikes.appendChild(document.createTextNode(`${station.available_bikes} vélos disponibles`));
                    
                    const status = document.createElement("p");
                    if(station.status === "OPEN"){
                        status.className = "open";
                        status.appendChild(document.createTextNode(`Station OUVERTE`));
                    }
                    if(station.status === "CLOSED"){
                        status.className = "closed";
                        status.appendChild(document.createTextNode(`Station FERMEE`));
                    }
                    
                    const button = document.createElement("input");
                    button.type = "button";
                    button.id = "booking";
                    button.className = "booking";
                    button.value = "Réserver";
                    
                    const noAvailableBikes = document.createElement("p");
                    noAvailableBikes.className = "noAvailableBikes";
                    noAvailableBikes.appendChild(document.createTextNode(`Aucun vélo disponible actuellement à cette station.`));
                    
                    
                    infosContainer.appendChild(title);
                    infosContainer.appendChild(address);
                    infosContainer.appendChild(availableBikeStands);
                    infosContainer.appendChild(availableBikes);
                    infosContainer.appendChild(status);
                     if(status.className === "open" && station.available_bikes !== 0){
                        infosContainer.appendChild(button);
                    }
                    if(status.className === "open" && station.available_bikes === 0){
                        infosContainer.appendChild(noAvailableBikes);
                    }
                    
                }); 
            })//-- end foreach --
        })//-- en ajaxGet --
        
    }//-- end stationsRevovery --
    
}//-- end class leafletMap --