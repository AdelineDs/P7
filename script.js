class leafletMap{
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

class Paint {
    constructor(canvas= "canvas", color="#000"){
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');

        if(!this.canvas) {
            alert("Impossible de récupérer le canvas");
            return;
        }

        if(!this.context) {
          alert("Impossible de récupérer le context du canvas");
          return;
        }

        this.color = color;
        this.paint = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.context.lineWidth = 4;
        this.context.strokeStyle = this.color;
        this.lastPosition = {
          x: 0,
          y: 0
        };
        this.redraw();
        this.clearCanvas();
    }//end consctuctor

    redraw() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.paint = true;
            this.mouseX = e.clientX - (this.canvas.getBoundingClientRect().left);
            this.mouseY = e.clientY -(this.canvas.getBoundingClientRect().top+window.scrollX);
            this.lastPosition = {
                x: this.mouseX,
                y: this.mouseY
            };
        });

        this.canvas.addEventListener("mousemove", (e) => {
            if(this.paint){
                sessionStorage.setItem("paint", true);
                this.mouseX = e.clientX - (this.canvas.getBoundingClientRect().left);
                this.mouseY = e.clientY - (this.canvas.getBoundingClientRect().top+window.scrollX);
                this.context.beginPath();
                this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
                this.context.lineTo(this.mouseX, this.mouseY);
                this.context.closePath();
                this.context.strokeStyle;
                this.context.stroke();
                this.lastPosition = {
                  x: this.mouseX,
                  y: this.mouseY
                };
            }
        });

        this.canvas.addEventListener("mouseup", (e) => this.paint=false );

        this.canvas.addEventListener("mouseleave", (e) => this.paint=false );

         this.canvas.addEventListener("touchstart", (e) => {
            let touch = e.touches[0];
            this.paint = true;
            this.mouseX = touch.pageX - this.canvas.getBoundingClientRect().left;
            this.mouseY = touch.pageY - (this.canvas.getBoundingClientRect().top+window.scrollX);
            this.lastPosition = {
                x: this.mouseX,
                y: this.mouseY
            };
        });

        this.canvas.addEventListener("touchmove", (e)=> {
             if(this.paint){
                let touch = e.touches[0];
                this.mouseX = touch.pageX - this.canvas.getBoundingClientRect().left;
                this.mouseY = touch.pageY - (this.canvas.getBoundingClientRect().top+window.scrollX);
                this.context.beginPath();
                this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
                this.context.lineTo(this.mouseX, this.mouseY);
                this.context.closePath();
                this.context.strokeStyle;
                this.context.stroke();
                this.lastPosition = {
                  x: this.mouseX,
                  y: this.mouseY
                };
            }
        });

        this.canvas.addEventListener("touchend", (e) => this.paint=false );

        this.canvas.addEventListener("touchleave", (e) =>this. paint=false );

    }//end redraw

    clearCanvas() {
        const resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', () => {
            this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
            sessionStorage.removeItem("paint");
        });
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastPosition = {
            x: 0,
            y: 0
        };
    }//end clearCanvas
    
    saveCanvas(){
        const canvasData = this.canvas.toDataURL();
        sessionStorage.setItem("imgSignature", canvasData);
    }
}//end class Paint

class Timer{
    constructor(minute=20, second=0, minTimer="min", secTimer="sec", textTimerContainer="textTimer", textTimer="Votre réservation a expirée !", timerClass="expired"){
        this.minute = minute;       //nombre de minutes au départ du timer
        this.second = second;       //nombre de secondes au départ du timer
        this.minTimer = document.getElementById(minTimer);       //lieu d'affichage des minutes
        this.secTimer = document.getElementById(secTimer);      //lieu d'affichage des secondes
        this.textTimerContainer = document.getElementById(textTimerContainer);       //lieu du timer
        this.textTimer = textTimer;     //texte du timer après le stop()
        this.timerClass = timerClass;   //class du timer après le stop();
        this.time = (this.minute*60)+this.second;       //temps du timer en secondes
        this.minTimer.textContent = this.minute;        //texte des minutes
        this.secTimer.textContent = this.second;        //texte des secondes
        this.startDecrease();       //lancement du chrono
    }
  
    startDecrease(){ 
    let chrono = setInterval(() =>{
        this.interval = chrono;
        if(this.time !== 0){        //si le timer n'est pas à 0
            this.time--;        //on décremente de timer
            this.minute = Math.floor(this.time/60);     //on recalcul les minutes et les secondes
            this.second = Math.floor(this.time-(this.minute*60));
            this.minTimer.textContent = this.minute;        //on met à jour l'affichage
            this.secTimer.textContent = this.second;
    }else{      //si le timer est à 0
        this.stop() //on arrete le timer
        sessionStorage.removeItem("signature");     // on efface la signature
        this.textTimerContainer.textContent = this.textTimer;       //on indique la fin du timer
        this.textTimerContainer.className= this.timerClass;
        console.log(sessionStorage.signature);
    }
    }, 1000);
 }// end start
    
    stop(){
        clearInterval(this.interval);
    }
}//-- end class Timer -- 

class slider{
    constructor(container, images){
        this.container = container;
        this.images = images;
        this.init();
    }//-- end constructor --
    
    init(){
        this.currentSlide = 0;
        this.createSliderElements();
        this.slides = document.querySelectorAll(".slideElement");
        this.slides[this.currentSlide].classList.add("visible");
        this.slideInterval;
        this.sliderKeyControl();
        this.sliderAnimation();
        this.restartAnimation();
    }//-- end init --
    
    createSliderElements(){
        const sliderContainer = document.getElementById(this.container);
        this.images.forEach(element => {
        const figure = document.createElement("figure");
        figure.className = "slideElement";
        const img = document.createElement("img");
        img.src = element.nom;
        figure.appendChild(img);
        
        const figcaption = document.createElement("figcaption");
        figcaption.appendChild(document.createTextNode(element.desc));
        
        figure.appendChild(figcaption);
        
        sliderContainer.appendChild(figure);
    });
    
    }//-- end createSliderElements --
    
    sliderAnimation(){
        this.slideInterval = setInterval(() => this.nextImage(), 5000);
    }//-- end sliderAnimation -- 
    
    sliderKeyControl(){
        document.addEventListener('keydown', e =>{
            if(e.keyCode === 37 || e.keyCode === 100){
                clearInterval(this.slideInterval);
                this.previousImage();
            }
            if(e.keyCode === 39 || e.keyCode === 102){
                clearInterval(this.slideInterval);
                this.nextImage();
            }
        });
    }//-- end sliderKeyControl --
    
    restartAnimation(){
        document.addEventListener('keypress', e =>{
            if(e.keyCode === 37 || e.keyCode===39 || e.keyCode === 100 || e.keyCode === 102){
            this.sliderAnimation();}
        });
    }//-- end restartAnimation --
    
    nextImage(){
        this.slides[this.currentSlide].classList.remove("visible");
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add("visible");
    }
    
    previousImage(){
        this.slides[this.currentSlide].classList.remove("visible");
        this.currentSlide = (this.currentSlide - 1) % this.slides.length;
        if(this.currentSlide === -1){
            this.currentSlide = this.slides.length - 1;
            this.slides[this.currentSlide].classList.add("visible");
        }else{
            this.slides[this.currentSlide].classList.add("visible");
        }
    }//-- end previousImage --
    
}//-- end class slider --

window.onload = () => {
        const images = [
        {
            nom: 'img/01.jpg',
            desc: 'Bienvenue sur votre service de réservation de vélo Vélo\'v'
        }, 
        {
            nom: 'img/02.jpg',
            desc: 'Choisissez votre station'
        },
        {
            nom: 'img/03.jpg',
            desc: 'Vérifiez la disponibilité en temps réel'
        },
        {
            nom: 'img/04.jpg',
            desc: 'Signez pour réserver votre vélo'
        },
        {
            nom: 'img/05.jpg',
            desc: 'On vous confirme la réservation'
        },
        {
            nom: 'img/07.jpg',
            desc: 'Vous avez 20 minutes pour le retirer à la station choisie'
        },
        {
            nom: 'img/06.jpg',
            desc: 'Profitez !'
        }
    ];

    const mySlider = new slider("sliderContainer", images);
    let myMap = new leafletMap("map");
    myMap.stationsRecovery("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=3b463d7c305280f920a831f36a0d4e678be88499");
    
    let myCanvas = new Paint();
    
    //si on clique sur le bouton de réservation le canvas apparait; 
    const signature = document.getElementById("signature");
    $("#stationInfos").on('click','.reservation', () => {
        signature.style.display= "block";
    });
   
   $('#submit').on('click', () =>{
       if(!sessionStorage.paint){
           const alert = document.createElement("p");
           alert.className = "alert";
           alert.appendChild(document.createTextNode("Merci de signer avant de valider !"));
           signature.appendChild(alert);
       }
       else if(sessionStorage.paint === "true"){
           sessionStorage.setItem("signature", true);
           myCanvas.saveCanvas();
           console.log(sessionStorage.imgSignature);
           signature.style.display= 'none';
           document.getElementById("reservation").style.display = "none";
           document.getElementById("timer").style.display = "block";
           const title = document.getElementById("stationName");
           const stationName = title.innerHTML;
           document.getElementById("station").innerHTML = stationName;
           const timer = new Timer(0,5)
       }
   });
   
   $('#reset').on('click', ()=>{
       signature.style.display= "none";
   })
   
}// -- end window.onload --



