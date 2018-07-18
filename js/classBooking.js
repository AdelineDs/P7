class Booking{
    constructor(signature, timer){
        this.signature = signature;
        this.timer = timer;
        this.duration = timer*1000;   
    }//-- end constructor --
    
    create(){
        if(document.getElementById("textTimer").style.display === "none"){
            document.getElementById("textTimer").style.display = "block";
        }
        sessionStorage.setItem("signature", this.signature);
        
        document.getElementById("timer").style.display = "block";
        
        const title = document.getElementById("stationName");
        const stationName = title.innerHTML;
        document.getElementById("station").innerHTML = stationName;
        sessionStorage.setItem("station", stationName);

        const divSignature = document.getElementById("imgSignature");
        const imgSignature = document.createElement("img");
        imgSignature.src = sessionStorage.signature;
        imgSignature.alt = "Image Signature";
        divSignature.className = "signed";
        divSignature.appendChild(imgSignature);
        
        document.getElementById("reservation").style.display = "none";
   
       setTimeout(this.clear, this.duration);
        

    }//-- end create --
    
    recovery(){
        document.getElementById("timer").style.display = "block";
        const divSignature = document.getElementById("imgSignature");
        const imgSignature = document.createElement("img");
        imgSignature.src = this.signature;
        imgSignature.alt = "Image Signature";
        divSignature.className = "signed";
        divSignature.appendChild(imgSignature);
        
        document.getElementById("station").innerHTML = sessionStorage.station;
        
    }//-- end recovery --
    
    clear(){
        const divSignature = document.getElementById("imgSignature");
        document.getElementById("reservation").style.display = "block";
        document.getElementById("textTimer").style.display = "none";
        document.getElementById("expired").style.display = "block";
        divSignature.innerHTML = "";
        sessionStorage.clear();
    }//-- end clear --
}
