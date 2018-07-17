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

    const mySlider = new Slider("sliderContainer", images);
    let myMap = new LeafletMap("map");
    myMap.stationsRecovery("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=3b463d7c305280f920a831f36a0d4e678be88499");
    
    let myCanvas = new Paint();
    
    //si on clique sur le bouton de réservation le canvas apparait; 
    const signature = document.getElementById("signature");
    $("#stationInfos").on('click','.reservation', () => {
        signature.style.display= "block";
    });
   
   
   //clique sur le bouton valider du canvas 
   $('#submit').on('click', () =>{
       if(myCanvas.painted === false){
           const alert = document.createElement("p");
           alert.className = "alert";
           alert.appendChild(document.createTextNode("Merci de signer avant de valider !"));
           signature.appendChild(alert);
       }
       else if(myCanvas.painted === true){
           myCanvas.saveCanvas();
           sessionStorage.setItem("imgSignature", myCanvas.canvasData);
           signature.style.display= 'none';
           
           document.getElementById("timer").style.display = "block";
           const title = document.getElementById("stationName");
           const stationName = title.innerHTML;
           document.getElementById("station").innerHTML = stationName;
           const timer = new Timer(0,5)
           
           const divSignature = document.getElementById("imgSignature");
           const imgSignature = document.createElement("img");
           imgSignature.src = sessionStorage.imgSignature;
           imgSignature.alt = "Image Signature";
           divSignature.className = "signed";
           divSignature.appendChild(imgSignature);
           
           reservation.signature = sessionStorage.imgSignature;
           reservation.chrono = timer.time;
       }
   });
   
   $('#reset').on('click', ()=>{
       signature.style.display= "none";
   })
   
}// -- end window.onload --
