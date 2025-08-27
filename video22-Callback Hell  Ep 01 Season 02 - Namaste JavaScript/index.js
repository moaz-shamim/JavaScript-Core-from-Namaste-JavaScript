// const cart = ["shoes", "pants", "kurta"];
// api.createOrder(cart, function () {
//   api.proceedToPayment(function () {
//     api.showOrderSummary(function () {
//       api.updateWallet();
//     });
//     I;
//   });
// });

// //////////////////////////////////////////////////////////////

// const GITHUB_API = "https://api.github.com/users/moaz-shamim"

// const user = fetch(GITHUB_API)

// console.log(user);

// ////////////////////////////////////////////////////////////////////

// const cart = ["shoes", "pants", "kurta"];
// createOrder(cart)
//   .then(function (orderId) {
//     console.log(orderId);
//     return orderId;
//   })
//   .then(function (orderId) {
//     return proceedToPayment(orderId);
//   })
//   .then(function (paymentInfo) {
//     console.log(paymentInfo);
//   })
//   .catch(function (err) {
//     console.log(err.message);
//   });

// // Promise Producer Function
// function createOrder(cart) {
//   const pr = new Promise(function (resolve, reject) {
//     // createOrder
//     // validateCart
//     // orderId
//     if (!validateCart(cart)) {
//       const err = new Error("Cart is not valid");
//       reject(err);
//     }
//     // logic for createOrder
//     const orderId = "12345";
//     if (orderId) {
//       setTimeout(function () {
//         resolve(orderId);
//       }, 5000);
//     }
//   });
//   return pr;
// }

// // Promise Producer Function
// function proceedToPayment(orderId) {
//   return new Promise(function (resolve, reject) {
//     resolve("Payment Successfull");
//   });
// }

// function validateCart(cart) {
//   return true;
// }

// //////////////////////////////////////////////////////////////
// const cart = ["shoes", "pants", "kurta"];

// createOrder(cart)
//   .then(function (orderId) {
//     console.log(orderId);
//     return orderId;
//   })
//   .then(function (orderId) {
//     return proceedToPayment(orderId);
//   })
//   .then(function (paymentInfo) {
//     console.log(paymentInfo);
//     return updateWallet(paymentInfo);
//   })
//   .then(function (WalletInfo) {
//     console.log(WalletInfo);
//     return WalletInfo;
//   })
//   .catch(function (err) {
//     console.log(err.message);
//   });

// // Promise Producer Function
// function createOrder(cart) {
//   const pr = new Promise(function (resolve, reject) {
//     // createOrder
//     // validateCart
//     // orderId
//     if (!validateCart(cart)) {
//       const err = new Error("Cart is not valid");
//       reject(err);
//     }
//     // logic for createOrder
//     const orderId = "12345";
//     if (orderId) {
//       setTimeout(function () {
//         resolve(orderId);
//       }, 5000);
//     }
//   });
//   return pr;
// }

// // Promise Producer Function
// function proceedToPayment(orderId) {
//   return new Promise(function (resolve, reject) {
//     if (orderId) resolve("Payment Successfull");
//   });
// }

// // Promise Producer Function
// function updateWallet(paymentInfo) {
//   return new Promise(function (resolve, reject) {
//     if (paymentInfo) {
//       resolve("Wallet Updated Successfully");
//     }
//   });
// }   

// function validateCart(cart) {
//   return false;
// }

// ///////////////////////////////////////////////////////////////////


// More optimised code by AI

const cart = ["shoes", "pants", "kurta"];

createOrder(cart)
  .then(function (orderId) {
    console.log("Order ID:", orderId);
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log("Payment Info:", paymentInfo);
    return updateWallet(paymentInfo);
  })
  .then(function (walletInfo) {
    console.log("Wallet Info:", walletInfo);
  })
  .catch(function (err) {
    console.error("Error:", err.message);
  });

function createOrder(cart) {
  return new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      return reject(new Error("Cart is not valid"));
    }
    const orderId = "ORD-" + Math.floor(Math.random() * 10000); // Dynamic orderId
    setTimeout(() => resolve(orderId), 2000);
  });
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    if (orderId) {
      resolve("Payment Successful");
    } else {
      reject(new Error("Invalid Order ID"));
    }
  });
}

function updateWallet(paymentInfo) {
  return new Promise(function (resolve, reject) {
    if (paymentInfo) {
      resolve("Wallet Updated Successfully");
    } else {
      reject(new Error("Payment Info Missing"));
    }
  });
}

function validateCart(cart) {
  return Array.isArray(cart) && cart.length > 0;
}
