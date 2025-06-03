// function a() {
//   var b = 10;
//   c();
//   function c() {
//     console.log(b);
//   }
// }
// a();

// function a() {
//   num = 10;
// }
// a();
// console.log(num);

// let globalLet = "This is a global variable";

// function fun() {
//   localLet = "This is a local variable";
// }

// fun();
// console.log(globalLet); // This is a global variable
// console.log(localLet); // This is a local variable

// function fun(){
// let i = 100;
// 	function fun2(){
//   console.log(i); // 100
// 	}
// 	fun2();
// }
// fun();

function myFunction() {
  var message = "Hello, world!";
  console.log(message); // prints "Hello, world!"
}
myFunction();

console.log(message); // prints "undefined"
