// console.log('Start')

// function loginUserServer(email, callback) {
//   setTimeout(() => {
//     console.log('We have the data')
//     callback({ userEmail: email })
//   }, 3000)
// }

// function getUserID(email, callback) {
//   setTimeout(() => {
//     callback(['23', '13', '28', '2'])
//   }, 2000)
// }

// const user = loginUserServer('muditwt@scaler.com', (userInfo) => {
//   console.log(userInfo) // First Callback
//   getUserID(userInfo.userEmail, (userIDs) => {
//     console.log(userIDs) // Second Callback
//   })
// })

// console.log('End')

// const fetchData = ( callBack ) =>{
//   const data = { name:"moaz" , age : 23 }
//   setTimeout(callBack(data),1000)
// }

// function handledata(data){
// console.log(data)
// }

// fetchData(handledata)

// console.log("Start");

// setTimeout(() => {
// 	console.log("CB Timeout 1");
// }, 5000);

// setTimeout(() => {
// 	console.log("CB Timeout 2");
// }, 3000);

// console.log("end");


// function sayHello() {
//     console.log(this.hello);
//     var response = 'general kenobi!';
//     function nestedFunction() {
//         console.log(this.response);
//     }
// }
// var hello = 'hello there!';
// global.hello = 'hello there!'; // uncomment this line if using node
// sayHello();


// function sayHello() {
//     console.log(hello);
// }
// var hello = 'hello there!';
// // global.hello = 'hello there!'; // uncomment this line if using node
// sayHello();

// function sayHello() {
//     console.log(this.hello);
//     var response = 'general kenobi!';
//     function nestedFunction() {
//         console.log(this.response);
//     }

// 	nestedFunction();
// }
// var hello = 'hello there!';
// global.hello = 'hello there!'; // uncomment this line if using node
// sayHello();

function showThis() {
  console.log(this);
}

showThis(); // In non-strict mode: Window (global object). In strict mode: undefined.