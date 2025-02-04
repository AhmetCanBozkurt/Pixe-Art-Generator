//!Alanların script tarafına alınması

let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-button");
let paintBtn = document.getElementById("paint-button");
let widhtValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");


let events = {
    mouse : {
        down : "mousedown",
        move : "mousemove",
        up : "mouseup"

    },
    touch : {
        down : "touchstart",
        move : "touchmove",
        uo : "touchend"
    }
}


let diveceType = "";

let draw = false;
let erase = false;

const isTouchDevice = ()  => {
    try{
        document.createEvent("TouchEvent");
        diveceType = "touch";
        return true;
    }
    catch (e){
        diveceType = "mouse";
        return false;
    }
}

isTouchDevice();


gridButton.addEventListener("click", () => {

    container.innerHTML = "";
    let count =0;
    for(let i=0; i< gridHeight.value; i++){
            // satıların oluşturulucağı alan
            count +=2;

            let div = document.createElement("div");

            div.classList.add("gridRow");
            // yazdığımız css kodunun her bir blok için uygulanması için crete edilen div e atıyoruz.


            for(let j =0; j< gridWidth.value; j++){
                //  Seçilen değer kadar satırda sütün create ediceğiz şimdide
                
                count +=2;

                let col = document.createElement("div");
                col.classList.add("gridCol");
                col.setAttribute("id",`gridCol${count}`);
                // eklenen her alan için colondaki veriye id veriyoruz.
                col.addEventListener(events[diveceType].down, ()=>{
                    draw = true;
                    if(erase){
                        col.style.backgroundColor = "transparent";
                    }else{
                        col.style.backgroundColor = colorButton.value;
                    }

                    // işlem silgi değil ise bu noktada kontrolünü yaparak eklenen col divine arkaplan rengi veriyoruz.

                });


                col.addEventListener(events[diveceType].move ,(e)=>{
                    let elementID = document.elementFromPoint(
                        !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                        !isTouchDevice() ? e.clientY : e.touches[0].clientY

                    ).id;
                    checker(elementID);


                });

                col.addEventListener(events[diveceType].up, ()=>{
                    draw=false;
                })
                div.appendChild(col);
                // oluşturulan her kolon div in altına atılıyor.
                // daha sonra div i de containerin altına atıyoruz.

            }

           container.appendChild(div) 

    }

});


function checker(elementID){
    let gridColumns = document.querySelectorAll(".gridCol");

    gridColumns.forEach((element)=> {
        if(elementID == element.id){
            if(draw && !erase){
                element.style.backgroundColor= colorButton.value;

            }else if(draw && eraseBtn){

                element.style.backgroundColor= "transparent";
            }
        }
    });


}


clearGridButton.addEventListener("click", ()=>{
    container.innerHTML="";
});

eraseBtn.addEventListener("click",()=>{
    erase =true;
});
paintBtn.addEventListener("click",()=>{
    erase =false;
});

gridWidth.addEventListener("input", ()=> {
    widhtValue.innerHTML = gridWidth.value < 0 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", ()=> {
    heightValue.innerHTML = gridHeight.value < 0 ? `0${gridHeight.value}` : gridHeight.value;
});


window.onload = () => {
    gridHeight.value =0;
    gridWidth.value =0;

};