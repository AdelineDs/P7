class BookingManager{
    constructor(){
        this.timerContainer =document.getElementById("timer");
        this.textTimer = document.getElementById("textTimer");
        this.timerStationName = document.getElementById("station");
        this.signatureContainer = document.getElementById("imgSignature");
        this.imgSignature = document.createElement("img");
        this.timer;
        this.canvasContainer = document.getElementById("signature");
        this.myCanvas = new Paint();
        
        if(sessionStorage.dateExpiration){
            let dateExpiration = Number(sessionStorage.dateExpiration);
            let time = dateExpiration - Date.now();
            this.timer = new Timer(time);
            this.recovery();
        }
        
        $("#stationInfos").on('click','.booking', () => {
            this.canvasContainer.style.display= "block";
        });
        
       
        //clique sur le bouton valider du canvas 
        $('#submit').on('click', () =>{
            if(this.myCanvas.painted){
                if(sessionStorage.dateExpiration){
                    this.timer.stop();
                }
                this.myCanvas.saveCanvas();
                this.myCanvas.resetCanvas();
                this.signature = this.myCanvas.canvasData;
                this.canvasContainer.style.display= 'none';
                this.station = document.getElementById("stationName");
                this.timer = new Timer(30000);
                this.expiration = Date.now() + (this.timer.time*1000);
                this.stationName = this.station.innerHTML;
                this.bookingButton = document.getElementById("booking");
                this.create();
            }else{
                const alert = document.createElement("p");
                alert.className = "alert";
                alert.appendChild(document.createTextNode("Merci de signer avant de valider !"));
                this.canvasContainer.appendChild(alert);
            }
        });
       
        $('#reset').on('click', ()=>{
            this.canvasContainer.style.display= "none";
        })

        document.addEventListener('endTimeEvent', () => {
            this.clear();
        })
    }//-- end constructor --
    
    create(){
        if(this.textTimer.style.display === "none"){ 
            this.textTimer.style.display = "block";
        }
        if(document.getElementById("expired").style.display === "block"){
            document.getElementById("expired").style.display = "none";
        }
        sessionStorage.setItem("signature", this.signature);
        sessionStorage.setItem("dateExpiration", this.expiration);
        this.timerContainer.style.display = "block";
        
        this.timerStationName.innerHTML = this.stationName;
        sessionStorage.setItem("station", this.stationName);

        this.imgSignatureCreation();
        
        this.bookingButton.style.display = "none";
        

    }//-- end create --
    
    recovery(){
       this.imgSignatureCreation();
       this.timerContainer.style.display = "block";
//        this.textTimer.style.display = "block";
        document.getElementById("station").innerHTML = sessionStorage.station;
        
    }//-- end recovery --
    
    clear(){
        sessionStorage.clear();
        this.textTimer.style.display = "none";
        document.getElementById("expired").style.display = "block";
        this.signatureContainer.innerHTML = "";
        this.bookingButton = document.getElementById("booking");
        this.bookingButton.style.display = "block";
    }//-- end clear --
    
    imgSignatureCreation(){
        this.imgSignature.src = sessionStorage.signature;
        this.imgSignature.alt = "Image Signature";
        this.signatureContainer.className = "signed";
        this.signatureContainer.appendChild(this.imgSignature);
        
    }
}
