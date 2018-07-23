class BookingManager{
    constructor(){
        this.timerContainer =document.getElementById("timer");
        this.textTimer = document.getElementById("textTimer");
        this.timerStationName = document.getElementById("station");
        this.signatureContainer = document.getElementById("imgSignature");
        this.imgSignature = document.createElement("img");
        this.canvasContainer = document.getElementById("signature");
        this.init();
        
    }//-- end constructor --
    
    init(){
        this.myCanvas = new Paint();
        this.displayCanvas()
        this.submitCanvas();
        this.resetCanvas();
        this.endTimeEvent();
        this.refresh();
    }//-- end init --
    
    displayCanvas(){
         $("#stationInfos").on('click','.booking', () => {
            this.canvasContainer.style.display= "block";
        });
    }//-- end displayCanvas --
    
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
    
    refresh(){
         if(sessionStorage.dateExpiration){
            let dateExpiration = Number(sessionStorage.dateExpiration);
            let time = dateExpiration - Date.now();
            this.timer = new Timer(time);
            this.recovery();
        }
    }//-- end refresh --
    
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
        if(this.bookingButton){
             this.bookingButton.style.display = "block";
        }
    }//-- end clear --
    
    imgSignatureCreation(){
        this.imgSignature.src = sessionStorage.signature;
        this.imgSignature.alt = "Image Signature";
        this.signatureContainer.className = "signed";
        this.signatureContainer.appendChild(this.imgSignature);
    }//--end ingSignatureCreation --
    
    submitCanvas(){
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
                this.timer = new Timer(20000);
                this.expiration = Date.now() + (this.timer.time*1000);
                this.stationName = this.station.innerHTML;
                this.bookingButton = document.getElementById("booking");
                this.create();
                $('html,body').animate({scrollTop: $("#timer").offset().top}, 'slow');
            }else{
                const alert = document.createElement("p");
                alert.className = "alert";
                alert.appendChild(document.createTextNode("Merci de signer avant de valider !"));
                this.canvasContainer.appendChild(alert);
            }
        });  
    }//-- end submitCanvas --
    
    resetCanvas(){
        $('#reset').on('click', ()=>{
            this.canvasContainer.style.display= "none";
        })
    }//-- end resetCanvas --
    
    endTimeEvent(){
        document.addEventListener('endTimeEvent', () => {
            this.clear();
        })
    }//-- end endTimeEvent
}
