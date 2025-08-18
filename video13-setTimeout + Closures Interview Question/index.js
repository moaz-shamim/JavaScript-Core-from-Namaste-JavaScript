// function x() {
//   var i = 1;
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
//   console.log("Some Statement");
// }
// x();


for (var i = 1; i <= 5; i++) {
    (function(x) {
      setTimeout(() => {
        console.log(x);
      }, x * 1000);
    })(i);
  }
  console.log("Some Statement");