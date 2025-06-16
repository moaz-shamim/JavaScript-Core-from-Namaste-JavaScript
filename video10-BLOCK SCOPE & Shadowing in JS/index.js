// {
//   var a = 10;
//   let b = 20;
//   const c = 30;
//   console.log(a);
//   console.log(b);
//   console.log(c);
// }
// console.log(a);
// console.log(b);
// console.log(c);

// {
//   var a = 10;
//   let b = 20;
//   const c = 30;
// }
// console.log(a);
// console.log(b);
// console.log(c);




// Example of shadowing with var
// var a = 100;
// {
//   var a = 10;
//   let b = 20;
//   const c = 30;
//   console.log(a);
//   console.log(b);
//   console.log(c);
// }

// console.log(a);

// Example of shadowing with let
// let a = 100;

// {
//   let a = 10;
//   var b = 20;
//   const c = 30;
//   console.log(a);
//   console.log(b);
//   console.log(c);
// }

// console.log(a);

// Example of shadowing with const
const c = 100;

{
  let a = 10;
  var b = 20;
  const c = 30;
  console.log(a);
  console.log(b);
  console.log(c);
}

console.log(c);