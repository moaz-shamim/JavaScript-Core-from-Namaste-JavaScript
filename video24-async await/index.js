// async function getData() {
//   return "Namaste Js";
// }

// const data = getData();

// console.log(data); // Promise {<fulfilled>: 'Namaste Js'}

///////////////////////////////////////////////////////////////////////////////////////////

// const p = new Promise((resolve, reject) => {
//   resolve("Promise 1st Resolved value!");
// });

// async function getData() {
//   return p;
// }

// const data = getData();

// console.log(data); // Promise {<pending>}

////////////////////////////////////////////////////////////////////////////////////////////

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise  Resolved value!");
//   }, 2000);
// });

// // async function handlePromise() {
// //   //   js Engine will wait for Promise to resolve
// //   const val1 = await p;
// //   console.log(val1);
// //   console.log("Hello World");
// // }

// async function handlePromise() {
//   //   js Engine will not  wait for Promise to resolve
//   const val1 = p.then((resolve) => console.log(resolve));
//   console.log(val1);
//   console.log("Hello World");
// }

// handlePromise();

/////////////////////////////////////////////////////////////////////////////////////////////

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise 1st Resolved value!");
//   }, 10000);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise 2nd Resolved value!");
//   }, 20000);
// });

// async function handlePromise() {
//   console.log("Hello World");

//   const val1 = await p1;
//   console.log(val1);

//   const val2 = await p2;
//   console.log(val2);
// }

// handlePromise();

// console.log("Js is Amazing");

///////////////////////////////////////////////////////////////////////////////////////////////////

async function handlePromise() {
  const response = await fetch("https://api.github.com/users/moaz-shamim");

  const data = await response.json();

  console.log("data", data);
}

handlePromise();

console.log("lula bee");
