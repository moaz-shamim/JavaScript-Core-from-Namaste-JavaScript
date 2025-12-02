## What is Throttling?

Throttling means allowing a function to run only once in a fixed amount of time, even if it’s called many times.
It basically slows down how often a function can run.

For example, if you have a function that fetches some data from an API every time the user scrolls the page, you might want to throttle it so that it only makes one request every second, instead of making hundreds of requests as the user scrolls. This way, you can avoid overloading the server or the browser with unnecessary requests and reduce the bandwidth consumption.


## Why Use Throttling?

Throttling can improve the performance and user experience of web pages by reducing the number of unnecessary or redundant operations. It can also prevent some issues such as:

- Overloading the server or the browser with too many requests or calculations
- Exceeding the rate limits or quotas of APIs or services
- Wasting bandwidth or resources on operations that are not visible or relevant to the user
- Creating janky or laggy animations or interactions

## When to Use Throttling?

Throttling is suitable for scenarios where you want to limit how often a function can be called, but you don’t want to miss any calls. For example, you might want to use throttling for:

- Fetching data from an API or a database when the user scrolls, resizes, or types
- Updating or animating elements on the page when the user scrolls, resizes, or moves the mouse
- Logging or tracking user actions or events when they occur frequently


```js

function throttle (mainFunction , delay ){
    
    let timerFlag = null;

    return (...args) => {
        if (timerFlag === null) {
            mainFunction();
            timerFlag = setTimeout(()=>{
              timerFlag = null;  
            },delay)
        }  
    }
}


const throttledFetchData = throttle(fetchData,3000);

```

[A decent blog on Throttling](https://dev.to/jeetvora331/throttling-in-javascript-easiest-explanation-1081)