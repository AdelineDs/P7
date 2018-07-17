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
        L.tileLayer(this.layer, {minZoom: this.minZoom, maxZoom: this.maxZoom}).addTo(this.myMap);
        this.marker;
    }
    
    stationsRecovery(source){
        ajaxGet(source, reponse => {
            let stationsList = JSON.parse(reponse);
            stationsList.forEach(station => {
                this.latLng = [station.position.lat, station.position.lng];
                this.marker = L.marker(this.latLng).addTo(this.myMap);
                
                this.marker.on('click', e => {
                    const infosContainer = document.getElementById("stationInfos");
                    infosContainer.innerHTML= "";
                    
                    const title = document.createElement("h3");
                    title.id = "stationName";
                    title.appendChild(document.createTextNode(station.name));
                    
                    const address = document.createElement("p");
                    address.appendChild(document.createTextNode(station.address));
                    
                    const availableBikeStands = document.createElement("p");
                    availableBikeStands.appendChild(document.createTextNode(`Nombre de points d'attache disponibles : ${station.available_bike_stands}`));
                    
                    const availableBikes = document.createElement("p");
                    availableBikes.appendChild(document.createTextNode(`Nombre de vélos disponibles : ${station.available_bikes}`));
                    
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
                    button.id = "reservation";
                    button.className = "reservation";
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