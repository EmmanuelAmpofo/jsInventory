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
  dashboard();
}

let updateForm = () => {
  document.getElementById("update_backdrop").style.display = "block"
  document.getElementById("qty_update").style.display = "block"

}
let dashboard = () => {
  document.getElementById("update_backdrop").style.display = "none"
  document.getElementById("qty_update").style.display = "none"
  // window.location.href = "./index.html" //refresh homepage automatic

}

let cancel = () => {
  document.getElementById("add_item_modal").style.top = "-65vh"
  document.getElementById("backdrop").style.top = "-110vh"
  reset()
  location.reload()
  // window.location.href = "./index.html"

}
let detailsToBeUpdate = () =>{
  document.getElementById("item_detail_update").style.top = "0";
}

let closeItemUpdate = () =>{
  document.getElementById("item_detail_update").style.top  = "-110vh"
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
    // console.log(qty_number)

    if (qty_number === 0) {
      document.getElementById(`status_color${i}`).style.color = "red"
      document.getElementById(`status_color${i}`).innerText = "Out of Stock"
    }
    else if ((qty_number >= 1) && (qty_number <= 20)) {
      document.getElementById(`status_color${i}`).style.color = "gold"
      document.getElementById(`status_color${i}`).innerText = "Almost Out of Stock"
    }
    else {
      document.getElementById(`status_color${i}`).style.color = "green"
      document.getElementById(`status_color${i}`).innerText = "In Stock"
    }
  }
}


//get figures from array to display in html
let figuresCalculation = () => {
  let products = JSON.parse(localStorage.getItem("products"));
  // console.log(products.length)

  document.getElementById("numberOfItem").innerText = products.length
  let quantityNumber = 0;
  let qtyInStock = () => {
    for (i = 0; i < products.length; i++) {
      quantityNumber += Number(products[i].qty_number)

      // console.log(qty_number)

    }
    document.getElementById("itemInStock").innerText = quantityNumber;


  }
  qtyInStock()
  let distinctValues = [];
  for (i = 0; i < products.length; i++) {
    if (!distinctValues.includes(products[i].category.toLowerCase())) {
      distinctValues.push(products[i].category.toLowerCase());
    }
  }

  // console.log(distinctValues)
  document.getElementById("totalCategories").innerText = distinctValues.length;
}

//add products to table in html

let product_added = document.getElementById("table_body")
let displayProducts = () => {
  let i = 0;
  let products = JSON.parse(localStorage.getItem("products"))
  // console.log(products)

  let newItemAdd = (i) => {
    let itemLi = document.createElement("tr")
    itemLi.className = `row${i}`;
    itemLi.innerHTML = `
          <td>${products[i].item_name}</td>
          <td>${products[i].description}</td>
          <td>${products[i].category}</td>
          <td>${products[i].qty_number}</td>
          <td id='status_color${i}'>Available</td>   
          <td><button class="js_btn" id="upd_${i}" onClick="productGetUpdate(this.id)">Update</button></td>
          <td><button class="js_btn" id="upd" onClick="">Remove</button></td>
  `
    product_added.append(itemLi)
  }
  // console.log(products.length)

  for (i; i < products.length; i++) {
    newItemAdd(i)
  }

  statusColor();
  figuresCalculation()
}
displayProducts()


//Compare input field and update value
// let updateQuantity = () => {
//   let updateName = document.getElementById("update_name").value
//   let updateValue = document.getElementById("update_quty").value

//   let products = JSON.parse(localStorage.getItem("products"))
//   if ((updateName === "") || (updateValue === "")) {
//     alert("Please enter valid information")
//     return
//   }
//   else {
//     for (i = 0; i < products.length; i++) {
//       if (products[i].item_name === updateName) {
//         console.log(updateValue)
//         products[i].qty_number = updateValue
//       }
//     }

//   }


//   localStorage.setItem("products", JSON.stringify(products))
//   alert(updateName + " quantity has been updated")
//   document.getElementById("update_name").value = ""
//   document.getElementById("update_quty").value = ""
// }
// console.log(products)

let idHolder = 0;
let idQuantity = 0;



let productGetUpdate = (clicked_id) => {
  let splits = String(clicked_id).split("_") // This splits the update buttons id eg upd_1 == [upd, 1]
  let products = JSON.parse(localStorage.getItem("products")) // Gets all the products in local storage

  // Item details
   let itemName = products[splits[1]].item_name;
   let itemDescription = products[splits[1]].description;
   let itemCategory = products[splits[1]].category;
   let itemQuantity = products[splits[1]].qty_number;


   document.getElementById("detail_name").value = itemName;
   document.getElementById("item_description").value = itemDescription;
   document.getElementById("item_category").value = itemCategory;
   document.getElementById("item_quantity").value =itemQuantity;

   idHolder = splits[1];
   detailsToBeUpdate(); 
}

let updatedItems = () =>{
let  itemName = document.getElementById("detail_name").value;
let itemDescription =  document.getElementById("item_description").value;
let itemCategory =  document.getElementById("item_category").value;
let itemQuantity = document.getElementById("item_quantity").value

let products = JSON.parse(localStorage.getItem("products"))

products[idHolder].item_name = itemName;
products[idHolder].description = itemDescription;
products[idHolder].category = itemCategory;
products[idHolder].qty_number = itemQuantity;

localStorage.setItem("products",JSON.stringify(products));

}  



