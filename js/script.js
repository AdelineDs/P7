window.onload = () => {
    
        const images = [
        {
            nom: 'img/01.jpg',
            desc: 'Bienvenue sur votre service de réservation Vélo\'v de la ville de Lyon'
        }, 
        {
            nom: 'img/02.jpg',
            desc: 'Choisissez votre station'
        },
        {
            nom: 'img/03.jpg',
            desc: 'Vérifiez l\'état de la station et  la disponibilité en temps réel'
        },
        {
            nom: 'img/04.jpg',
            desc: 'Cliquez sur \'Réserver\' ! '
        },
        {
            nom: 'img/05.jpg',
            desc: 'Signez pour réserver votre Vélo\'v'
        },
        {
            nom: 'img/08.jpg',
            desc: 'On vous confirme la réservation'
        },
        {
            nom: 'img/06.jpg',
            desc: 'Vous avez 20 minutes pour le retirer à la station choisie'
        },
        {
            nom: 'img/07.jpg',
            desc: 'Profitez !'
        }
    ];

    let mySlider = new Slider("sliderContainer", images);
    
    let myMap = new LeafletMap("map");
    myMap.stationsRecovery("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=3b463d7c305280f920a831f36a0d4e678be88499");
    
    let myBooking = new BookingManager();
   
}// -- end window.onload --
