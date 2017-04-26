 $(document).ready(function() {
    $('select').material_select();
  });

// SCRIPT START
var productsDom = document.getElementById("products");
var discountSelector = document.getElementById("season-select");
var seasonVal = 0;
var categoryObs;
var discount = 1;
var productData;
discountSelector.addEventListener("change", grabDiscount);

function grabDiscount(event) {
    seasonVal = discountSelector.value;
    console.log(seasonVal);
    for (var i = 0; i < categoryObs.length; i++) {
        if (seasonVal == 1) {
            discount = categoryObs[0].discount;
        } else if (seasonVal == 2) {
            discount = categoryObs[1].discount;
        } else if (seasonVal == 3) {
            discount = categoryObs[2].discount;
        } else {
            discount = 1;
        }
    }
    writeData(productData);
}

// XHR REQUEST
var xhrProducts = new XMLHttpRequest();

xhrProducts.addEventListener("load", xhrProductsSucess);
xhrProducts.addEventListener("error", xhrProductsFail);

function xhrProductsFail() {
    alert("Product data failed to load!");
}

function xhrProductsSucess(event) {
    productData = JSON.parse(event.target.responseText);
    writeData(productData);
}

// MAIN XHR WRITE FUNTION

function writeData(data) {
    var mainObject = data.products;
    // console.log(mainObject);
    toWrite = `<div><h2>Products</h2>`
    var cat1 = `<h4>Apparel:</h4><br>`;
    var cat2 = `<h4>Furniture:</h4><br>`;
    var cat3 = `<h4>Household:</h4><br>`;
    for(var i = 0; i < mainObject.length; i++) {
        var products = mainObject[i];
        // console.log(products);
        if (products.category_id === 1) {
            var price = products.price;
            if (seasonVal == 1) {
                price = price - Math.round(10 * (price * discount)) / 10;
            }
            cat1 += `<h5>${products.name} -</h5><p>$${price}</p>`;
        } else if (products.category_id === 2) {
            var price = products.price;
            if (seasonVal == 2) {
                price = price - Math.round(10 * (price * discount)) / 10;
            }
            cat2 += `<h5>${products.name} -</h5><p>$${price}</p>`;
        } else if (products.category_id === 3) {
            var price = products.price;
            if (seasonVal == 3) {
                price = price - Math.round(10 * (price * discount)) / 10;
            }
            cat3 += `<h5>${products.name} -</h5><p>$${price}</p>`;
        }
    }
    toWrite += cat1 + cat2 + cat3 + `</div>`;
    productsDom.innerHTML = toWrite;
}

// XHR OPEN AND SEND

xhrProducts.open("GET", "products.json");
xhrProducts.send();

// XHR #2 Start
var xhrCategories = new XMLHttpRequest();

xhrCategories.addEventListener("load", xhrCategoriesSucess);
xhrCategories.addEventListener("error", xhrCategoriesFail);

function xhrCategoriesFail() {
    alert("Product data failed to load!");
}
function xhrCategoriesSucess(event) {
    var data = JSON.parse(event.target.responseText);
    categoryObs = changePrices(data);
}
// Categories MAIN FUNCTION
function changePrices(data) {
        categoryObs = data.categories;
        return categoryObs;
}

// XHR #2 OPEN AND SEND

xhrCategories.open("GET", "categories.json");
xhrCategories.send();
