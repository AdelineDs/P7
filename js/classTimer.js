class Timer{
    constructor(minute=20, second=0, minTimer="min", secTimer="sec", textTimerContainer="textTimer", textTimer="Votre réservation a expirée !"){
        this.minute = minute;       
        this.second = second;       
        this.minTimer = document.getElementById(minTimer);       
        this.secTimer = document.getElementById(secTimer);
        this.textTimerContainer = document.getElementById(textTimerContainer);
        this.textTimer = textTimer; 
        this.time = (this.minute*60)+this.second;
        this.minTimer.textContent = this.minute;  
        this.secTimer.textContent = this.second;
        this.timerStatus = "off";
        this.startDecrease();
    }
  
    startDecrease(){ 
    let chrono = setInterval(() =>{
        this.interval = chrono;
        if(this.time !== 0){      
            this.timerStatus = "on";
            this.time--;        
            this.minute = Math.floor(this.time/60);     
            this.second = Math.floor(this.time-(this.minute*60));
            this.minTimer.textContent = this.minute;       
            this.secTimer.textContent = this.second;
        }else{      //si le timer est à 0
            this.stop() //on arrete le timer
            this.textTimerContainer.textContent = this.textTimer;      
            }
        }, 1000);
    }// end start
    
    stop(){
        clearInterval(this.interval);
        this.timerStatus = "off";
    }
}//-- end class Timer -- 
