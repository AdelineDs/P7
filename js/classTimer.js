class Timer{
    constructor(ms=1200000, minTimer="min", secTimer="sec", textTimerContainer="textTimer"){
        this.time = ms/1000;
        this.calcMinutes();       
        this.calcSeconds();       
        this.minTimer = document.getElementById(minTimer);       
        this.secTimer = document.getElementById(secTimer);
        this.textTimerContainer = document.getElementById(textTimerContainer);
        this.minTimer.textContent = this.minute;  
        this.secTimer.textContent = this.second;
        this.endTimeEvent = new Event('endTimeEvent', {bubbles:true});
        this.startDecrease();
    }
  
    startDecrease(){ 
    let chrono = setInterval(() =>{
        this.interval = chrono;
        this.time--; 
        if(this.time > 0){         
            this.calcMinutes();     
            this.calcSeconds();
            this.minTimer.textContent = this.minute;       
            this.secTimer.textContent = this.second;
        }else{
            this.stop()     
            }
        }, 1000);
    }// end start
    
    stop(){
        clearInterval(this.interval);
        document.dispatchEvent(this.endTimeEvent);  
    }
    
    calcMinutes(){
        this.minute =Math.floor(this.time/60);
    }
    
    calcSeconds(){
        this.second = Math.floor(this.time-(this.minute*60));
    }
}//-- end class Timer -- 
