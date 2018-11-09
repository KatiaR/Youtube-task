import "./scss/main.scss";

const url =
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg&type=video&part=snippet&maxResults=15&q=";

const searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", function() {
    const input = document.getElementById("search");
    if (input.value.length > 2) {
        fetch(`${url}${input.value}`)
            .then(response => {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                const div2 = document.createElement('div');
                const newData = document.getElementById("newData");
               /* div.innerText = JSON.stringify(data)*/
              
                const array = data.items;
                console.log(array);
               array.forEach(elem => {
                const div = document.createElement('div');
                  const snippet = elem.snippet;
                  console.log(snippet)
                  console.log(snippet.channelTitle)
                  console.log(snippet.description)
                  console.log(snippet.publishedAt)
                  console.log(snippet.title)
                  div.innerText = snippet.channelTitle
                  
                  div2.appendChild(div)
                  
               })
                newData.appendChild(div2)
            });
    }
});
