const mainContent = document.getElementById("main-content")
let products = []
let visibleProducts = []
let filteredProducts = []

async function getData() {
    const url = "https://dummyjson.com/products";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const productsPromise = await response.json()

    products = productsPromise.products
    visibleProducts = [...products]
    filteredProducts = [...products]

    showProducts()
}

function showProducts(){
    if (products.length > 0){
        mainContent.innerHTML = "";

        for (let i = 0; i < visibleProducts.length; i++){
            mainContent.innerHTML += `
            <tr>
                <td><img src = "${visibleProducts[i].images[0]}"></td>
                <td><p>${visibleProducts[i].title}</p></td>
                <td><p>${visibleProducts[i].description}</p></td>
            </tr>`
        }
    }
}

const select = document.getElementById("select")
function maintainOrder(){
    switch(select.value){
        case "original":
            visibleProducts = [...filteredProducts]
            break
        case "ascending":
            visibleProducts.sort((a,b) => {
                return a.title.localeCompare(b.title)
            })
            break
        case "descending":
            visibleProducts.sort((a,b) => {
                return -a.title.localeCompare(b.title)
            })
            break
    }
}

select.addEventListener("change", () => {
    if (products.length == 0)
        return

    maintainOrder()
    showProducts()
})

const search = document.getElementById("search")
document.getElementById("submit").addEventListener("click",() => {
    if (products.length == 0)
        return

    const compare = search.value.toLowerCase()
    console.log(compare)
    if (compare == ""){
        filteredProducts = [...products]
        visibleProducts = [...products]
        maintainOrder()
        showProducts()
        return
    }
    filteredProducts = []
    visibleProducts = []
    for (let i = 0; i < products.length; i++){
        console.log(products[i].title.length)
        if (products[i].title.toLowerCase().startsWith(compare) 
            && compare.length <= products[i].title.length){
            filteredProducts.push(products[i])
            visibleProducts.push(products[i])
        }
    }
    maintainOrder()
    showProducts()
})

getData()
