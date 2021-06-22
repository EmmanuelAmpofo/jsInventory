let products = []


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}



let show_modal = document.getElementById("add_item_modal")
let show_modal_add = () => {
  show_modal.style.top = "0"
  document.getElementById("backdrop").style.top = "0"
}



let cancel = () => {
  document.getElementById("add_item_modal").style.top = "-65vh"
  document.getElementById("backdrop").style.top = "-110vh"
  reset()
}

let reset = () => {
  document.getElementById("name").value = ""
  document.getElementById("description").value = ""
  document.getElementById("category").value = ""
  document.getElementById("qty_number").value = ""

}



// add products and set to local storage. if products dont exist, create it else start fetching products
let add_item_modal = () => {
  let item_name = document.getElementById("name").value
  let description = document.getElementById("description").value
  let category = document.getElementById("category").value
  let qty_number = document.getElementById("qty_number").value

  //object
  item_add = {
    "item_name": item_name,
    "description": description,
    "category": category,
    "qty_number": qty_number
  }

  if ((item_name === "") || (description === "") || (category === "") || (qty_number === "")) {
    alert("Please enter valid information to save product")
  }
  else {
    products.push(item_add)
    alert("Product added")

    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify(products)) //assigning 
    }
    else {
      let product1 = JSON.parse(localStorage.getItem("products"))
      product1.push(item_add)
      localStorage.setItem("products", JSON.stringify(product1))
    }

  }

  reset()
}


//Change status color depending on input value
let statusColor = () => {
  products = JSON.parse(localStorage.getItem("products"));


  for (i = 0; i < products.length; i++) {
    qty_number = Number(products[i].qty_number);
    console.log(qty_number)

    if (qty_number === 0) {
      document.getElementById(`status_color${i}`).style.color = "red"
      document.getElementById(`status_color${i}`).innerText = "Out of Stock"
    }
    else if ((qty_number >= 1) && (qty_number <= 20)) {
      document.getElementById(`status_color${i}`).style.color = "yellow"
      document.getElementById(`status_color${i}`).innerText = "Almost Out"
    }
    else {
      document.getElementById(`status_color${i}`).style.color = "green"
      document.getElementById(`status_color${i}`).innerText = "In Stock"
    }
  }
}


//add products to table in html

let product_added = document.getElementById("table_body")
let displayProducts = () => {
  let i = 0;
  let products = JSON.parse(localStorage.getItem("products"))
  console.log(products)

  let newItemAdd = (i) => {
    let itemLi = document.createElement("tr")
    itemLi.className = `row${i}`;
    itemLi.innerHTML = `
          <td>${products[i].item_name}</td>
          <td>${products[i].description}</td>
          <td>${products[i].category}</td>
          <td>${products[i].qty_number}</td>
          <td id='status_color${i}'>Available</td>   
  `
    product_added.append(itemLi)
  }
  console.log(products.length)

  for (i; i < products.length; i++) {
    newItemAdd(i)
  }

  statusColor();
}
displayProducts()



// console.log(statusColor())


