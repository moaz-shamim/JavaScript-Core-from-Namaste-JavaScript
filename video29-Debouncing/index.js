// let counter = 0;
// function getData(){
//     console.log("fetching Data" + counter++);
// }

// function myDebounce(call,duration){
//     let timer ;
    
//     return function (...args) {
//        if(timer) clearTimeout(timer);
//        setTimeout(()=>{
//         call();
//        },duration) 
//     }

// }


// const debouncedFunction = myDebounce(getData,1000);


let counter = 0;

function getData() {
    console.log("fetching Data " + counter++);
}

function myDebounce(call, duration) {
    let timer;

    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            call.apply(this, args);
        }, duration);
    }
}

const debouncedFunction = myDebounce(getData, 1000);
