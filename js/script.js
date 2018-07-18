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
        
        if(sessionStorage.min && sessionStorage.sec){
           const alert = document.createElement("p");
           alert.className = "alert";
           alert.appendChild(document.createTextNode("Vous avez déjà une réservation en cours. Valider une nouvelle réservation annulera la précédente. Merci."));
           $("#signature h1").after(alert);
       }
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
           myCanvas.resetCanvas();
           signature.style.display= 'none';
           const timer = new Timer(0,20);
           
           const myBooking = new Booking(myCanvas.canvasData, timer.time);
           if(sessionStorage.min && sessionStorage.sec){
               console.log(timer.time);
               myBooking.clear();
               myBooking.create();
               
           }else{
              
           myBooking.create();
           }


       }
   });
   
   $('#reset').on('click', ()=>{
       signature.style.display= "none";
   })
   
   if(sessionStorage.min && sessionStorage.sec){
       let minute = Number(sessionStorage.min);
       let second = Number(sessionStorage.sec);
       const timer2 = new Timer(minute, second);
       const booking = new Booking(sessionStorage.signature, timer2.time);
       booking.recovery();
   }
}// -- end window.onload --
