import "./styles.css";

test0();
// test1();
// test2();
// test3();
// test4();
// test5();

function test0() {
  // fix a bug, explain
  const foo = { a: 1, b: 2 };

  ///// Your code here
  // const bar = foo;
  /* 
    should create a copy of the foo object
    instead of assigning it by reference
  */
  const bar = { ...foo };
  bar.b = 5;
  /////////////////////

  // Is there any alternative solution? Explain the difference?

  // ------------------- Do not change
  console.log("1 + 2 = ", foo.a + foo.b);
  console.log("1 + 5 = ", bar.a + bar.b);
}

function test1() {
  // implement function count
  /* 
    should console.log numbers starting from "start" to "stop", 
    with delay between output "interval".
    The first number should appear immidiately!
  */
  function count(start = 0, stop = 10, interval = 1000) {
    /*
      use setInterval to execute callback function every interval. 
      Inside the callback function, output the current to the 
      console and increment it until it equals to stop.
    */

    let current = start;
    console.log(current); // start here

    const newInterval = new setInterval(() => {
      current++;
      if (current > stop) {
        clearInterval(newInterval);
      } else {
        console.log(current);
      }
    }, interval);
  }

  // ---------------------- Do not change
  count(2, 15, 100);
}

function test2() {
  // Using regex to extract the lightness from hsl color code
  // FYI: HSL color values are specified with: `hsl(hue, saturation, lightness)`
  const hslColor = "hsl(0, 8%, 18%)"; // the `lightness` value is 18

  function getLightness(hslColor) {
    /*
      To extract the lightness value from an HSL color code using 
      regular expressions, we can use a regular expression pattern 
      that matches the lightness value in the format hsl(x, x%, xx%), 
      where xx is the lightness value we want to extract
    */

    const regex = /hsl\(\d+,\s*\d+%,\s*(\d+%)\)/;
    const match = regex.exec(hslColor);
    const lightness = match[1];

    return parseInt(lightness);
    // return 18;
  }

  // ---------------------- Do not change
  const lightness = getLightness(hslColor);
  console.log("Lightness: ", lightness);
}

function test3() {
  // Click on the button, fix the bug, explain
  const button = document.querySelector("#click-me");
  // button.addEventListener("click", () => {
  //   this.textContent = "Clicked";
  // });
  /*
    there is a bug where the textContent property of the this 
    object is being set to "Clicked" when the button is clicked. 
    However, this in the arrow function passed to addEventListener 
    does not refer to the button element, but to the global object.

    to fix bug, use a regular function instead of an arrow function 
    to pass as the event listener. This way, the this keyword will 
    refer to the button element when the event is triggered. Also 
    use the event.currentTarget property to refer to the button 
    element, instead of this
  */
  button.addEventListener("click", function (event) {
    event.currentTarget.textContent = "Clicked";
  });
}

async function test4() {
  // Make it ES5-promise compatible (fetch function and PROMISE are still ok here)
  // const getData = async () => (await (await fetch("/data.json")).json()).data;
  // console.log(await getData());
  /*
    define a new function getData which returns a Promise. Inside 
    getData, we use the fetch function to fetch the JSON data from 
    the server. then use the then method to extract the JSON data 
    from the response object and return it. Finally, we use another 
    then method to log the result to the console.

    to use the getData function, we call it and use another then 
    method to log the result to the console.
  */
  const getData = () => {
    return fetch("/data.json")
      .then((response) => response.json())
      .then((data) => data.data);
  };

  getData()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}

function test5() {
  // Make infinite scroll, use IntersectionObserver API
  async function runApp() {
    const data = await fetchData();
    await renderDataBlocks(data);

    /* 
      creates an IntersectionObserver instance and sets it to observe 
      a temp element appended to the app container. When the 
      temp element is 50% visible, it triggers a callback function 
      that fetches more data and renders it to the page. This allows 
      for infinite scrolling behavior
    */
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };

    const observer = new IntersectionObserver(async (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const data = await fetchData();
          await renderDataBlocks(data);
        }
      }
    }, options);

    const temp = document.createElement("div");
    temp.classList.add("temp");
    app.appendChild(temp);
    observer.observe(temp);
  }

  // ---------------------- Do not change
  const app = document.getElementById("app");
  async function renderDataBlocks(data) {
    data.forEach((text) => {
      const block = document.createElement("div");
      block.classList.add("item");
      block.innerText = text;
      app.appendChild(block);
    });
  }

  let page = 0;
  const size = 15;
  async function fetchData() {
    const min = page * size;
    const max = (page + 1) * size;
    const data = [...Array(max - min + 1).keys()].map((i) => i + min);
    page++;

    return data;
  }
  //////////////////////////////////////////////////////////////////////

  runApp();
}
