class Timer{
    constructor(minute=20, second=0, minTimer="min", secTimer="sec", textTimerContainer="textTimer"){
        this.minute = minute;       
        this.second = second;       
        this.minTimer = document.getElementById(minTimer);       
        this.secTimer = document.getElementById(secTimer);
        this.textTimerContainer = document.getElementById(textTimerContainer);
        this.time = (this.minute*60)+this.second;
        this.minTimer.textContent = this.minute;  
        this.secTimer.textContent = this.second;
        this.startDecrease();
    }
  
    startDecrease(){ 
    let chrono = setInterval(() =>{
        this.interval = chrono;
        this.time--; 
        if(this.time > 0){         
            this.minute = Math.floor(this.time/60);     
            this.second = Math.floor(this.time-(this.minute*60));
            this.minTimer.textContent = this.minute;       
            this.secTimer.textContent = this.second;
            this.saveTime();
        }else{
            this.removeTime();
            this.stop()     
            }
        }, 1000);
    }// end start
    
    stop(){
        clearInterval(this.interval);
    }
    
    saveTime(){
        sessionStorage.setItem("min", this.minute);
        sessionStorage.setItem("sec", this.second);
    }
    
    removeTime(){
        sessionStorage.clear();
    }
}//-- end class Timer -- 
