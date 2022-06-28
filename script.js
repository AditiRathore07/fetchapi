let readable;
let cardcontainer = document.querySelector("#cardcontainer");
let searchInput = document.querySelector("#searchInput");
let title = document.querySelector("#title-text")
let body = document.querySelector("#body-text")
let add = document.querySelector("#add")
let button = document.querySelector("#btn")

// let scroll_to_bottom = document.getElementById(".godownbtn");
// scroll_to_bottom.addEventListener("scroll", (e) => {
//     scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
// })

// let btnBottom = document.querySelector(".godownbtn");
// btnBottom.addEventListener("click", (e) => {
//     // window.scrollTo({
//     //     top: document.body.scrollHeight,
//     //     left: 0,
//     //     behavior: "smooth",
//     // });
// });

fetch('https://jsonplaceholder.typicode.com/posts')
    // console.log(" result:: ", result)
    .then(data => data.json())
    .then(readableBlob => {
        readable = readableBlob;
        uimaker(readable);
    })

function uimaker(arr) {
    arr.forEach((data, index) => {
        cardcontainer.innerHTML +=
            ` <div class = "card p-3 w-25">
                 <div class= " square bg-danger" data-index=${index} id="cross">X </div>
                   ${data.id}
                <div class="card-title">
                   ${data.title}
                </div>
                <div class="card-body">
                   ${data.body}
                </div>
            </div>`

    })
}

//delete
cardcontainer.addEventListener("click", function(e) {
    if (e.target.textContent.includes('X') && e.target.dataset.index) {
        // console.log(" e.target.textContent:: ", e.target.dataset.index);
        readable.splice(e.target.dataset.index, 1);
        cardcontainer.innerHTML = "";
        uimaker(readable)
    }
})

//search
searchInput.addEventListener('change', function(details) {
    let filteredarray = readable.filter(data => data.title.includes(details.target.value));
    // console.log("filteredarray:", filteredarray)
    cardcontainer.innerHTML = "";
    readable = [...filteredarray]
    uimaker(readable);
})

//add
button.addEventListener("click", (details) => {
    // console.log(" titletext:: ", title.value, " bodytext ::", body.value);
    let obj = {
        // id: readable.length + 1,
        id: add.value,
        title: title.value,
        body: body.value
    }
    readable.map(data => {

        if (data.id >= add.value) {
            data.id = data.id + 1;
            console.log(data.id);
        }
    })
    readable.splice(add.value - 1, 0, obj)
    cardcontainer.innerHTML = "";
    uimaker(readable);

    // console.log("readable:: ", readable)

})