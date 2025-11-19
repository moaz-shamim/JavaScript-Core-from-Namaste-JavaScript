// function loadJson(url) {
//   return fetch(url)
//     .then(response => {
//       if (response.status == 200) {
//         return response.json();
//       } else {
//         throw new Error(response.status);
//       }
//     });
// }

// loadJson('https://dummyjson.com/todos/1')
// .then(console.log)
// .catch(console.log);

async function loadJson(url) {
	const response = await fetch(url);
	if (response.status === 200) {
		return response.json();
	} else {
		throw new Error(response.status);
	}
}

async function fetchData() {
	try {
		const data = await loadJson("https://dummyjson.com/todos/1");
		console.log("data:", data);
	} catch (err) {
		console.log("error:", err);
	}
}

fetchData();
