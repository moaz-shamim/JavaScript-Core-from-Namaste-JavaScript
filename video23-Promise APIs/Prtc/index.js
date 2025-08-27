// Promise.all([
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
// ]).then(console.log);
// 1,2,3 when promises are ready: each promise contributes an array member

// ///////////////////////////////////////////////////////////////////////////////////

// let urls = [
//   "https://api.github.com/users/iliakan",
//   "https://api.github.com/users/remy",
//   "https://api.github.com/users/jeresig",
// ];

// // map every url to the promise of the fetch
// let requests = urls.map((url) => fetch(url));

// // Promise.all waits until all jobs are resolved
// Promise.all(requests).then((responses) =>
//   responses.forEach((response) =>
//     console.log(`${response.url}: ${response.status}`)
//   )
// );

////////////////////////////////////////////////////////////////////////////////////////

// let names = ["iliakan", "remy", "jeresig"];

// let requests = names.map((name) => fetch(`https://api.github.com/users/${name}`));

// console.log("requests",requests);

// Promise.all(requests)
//   .then((responses) => {
//     for (let response of responses) {
//       console.log(`${response.url}: ${response.status}`);
//     }

//     return responses;
//   })
//   .then((responses) => Promise.all(responses.map((r) => r.json())))
//   .then((users) => users.forEach((user) => console.log(user.name)));

/////////////////////////////////////////////////////////////////////////////////////////

// Promise.all([new Promise((resolve, reject) =>setTimeout(() => reject(new Error("Somethimg went wrong!")), 3000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(2), 5000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 2000)),
// ])
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

////////////////////////////////////////////////////////////////////////////////////////////

// let urls = [
//   "https://api.github.com/users/iliakan",
//   "https://api.github.com/users/remy",
//   "https://no-such-url",
// ];

// Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
//   results.forEach((result, num) => {
//     if (result.status == "fulfilled") {
//       console.log(`${urls[num]}: ${result.value.status}`);
//     }
//     if (result.status == "rejected") {
//       console.log(`${urls[num]}: ${result.reason}`);
//     }
//   });
// });

///////////////////////////////////////////////////////////////////////////////////////

// Promise.race([
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
// ]).then((response) => console.log(response)); // 1

///////////////////////////////////////////////////////////////////////////////////////

// Promise.any([
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
//   ]).then((response)=> console.log(response)
//   ); // 1

///////////////////////////////////////////////////////////////////////////////////////

Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});





