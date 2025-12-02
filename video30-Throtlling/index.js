// Blog Version
function fetchData(){
    const value = document.getElementById("search").value;
    setTimeout(() => {
        console.log("User submitted:", value, "at", new Date().toLocaleTimeString());
    }, Math.random()*1000);
}



function throttle (mainFunction , delay ){
    
    let timerFlag = null;

    return (...args) => {
        if (timerFlag === null) {
            mainFunction();
            timerFlag = setTimeout(()=>{
              timerFlag = null;  
            },delay)
        }  
    }
}


const throttledFetchData = throttle(fetchData,3000);

