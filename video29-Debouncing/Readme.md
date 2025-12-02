## What is debouncing?

Debouncing is a way of delaying the execution of a function until a certain amount of time has passed since the last time it was called.This can be useful for scenarios where we want to avoid unnecessary or repeated function calls that might be expensive or time-consuming.

```js

function searchData() {
	console.log("searchData executed");
}

const debounce = (mainFunction, delay) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			mainFunction();
		}, delay);
	};
};


const debouncedSearchData = debounce(searchData,500);

debouncedSearchData()

```