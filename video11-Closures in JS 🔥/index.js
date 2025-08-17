function createCounter() {
  let count = 0; // Variable in the outer function

  return function counterFunction() { // Name the inner function
    debugger; // Pause here to debug
    count++; // Accessing the variable from the outer function
    console.log(count);
  };
}

const counter = createCounter(); // Call the outer function

counter(); // Call the inner function (Debugger will pause here)
counter(); // Call the inner function again


// function createCounter() {
//   debugger; // Pause here to see createCounter in the call stack
//   let count = 0; // Variable in the outer function

//   return function () {
//     count++; // Accessing the variable from the outer function
//     console.log(count);
//   };
// }

// const counter = createCounter(); // Call the outer function
// counter(); // Call the inner function
// counter(); // Call the inner function again
