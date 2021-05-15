// create an object for each of the products

function Emoji(price, name, description, imgSrc, id) {
  this.price = price;
  this.name = name;
  this.description = description;
  this.imgSrc = imgSrc;
  this.id = id;
  this.vat = (price * 0.14).toFixed(2); //calculate the vat for each object for use later on
  this.totalPrice = (price * 1.14).toFixed(2);
}

let clownEmoji = new Emoji(
  "350000.00",
  "Clown",
  "You could be the class clown if you buy this emoji!",
  "clown.png",
  "clownEmoji"
);

let unicornEmoji = new Emoji(
  "420000.00",
  "Unicorn",
  "If you own this emoji, you will turn your company into a unicorn",
  "unicorn.png",
  "unicornEmoji"
);

let devilEmoji = new Emoji(
  "12000.00",
  "Devil",
  "Show your feisty side to your mates with this emoji you naughty devil!",
  "devil.png",
  "devilEmoji"
);

let heartEmoji = new Emoji(
  "135000.00",
  "Heart",
  "You could own love if you just bought this one",
  "heart.png",
  "heartEmoji"
);

let heartEyesEmoji = new Emoji(
  "233000.00",
  "Heart Eyes",
  "Charge royalties whenever those annoying love birds use this emoji",
  "heartEyes.png",
  "heartEyesEmoji"
);

let nerdEmoji = new Emoji(
  "154000.00",
  "Nerd",
  "Be the first cool nerd by buying this guy",
  "nerd.png",
  "nerdEmoji"
);

let poopEmoji = new Emoji(
  "122000.00",
  "Poop",
  "Who doesn't like a scoop of chocolate ice-cream ....",
  "poop.png",
  "poopEmoji"
);

let sickEmoji = new Emoji(
  "54000.00",
  "Sick",
  "Instead of calling in sick, just send your boss this emoji",
  "sick.png",
  "sickEmoji"
);

let skullEmoji = new Emoji(
  "320000.00",
  "Skull",
  "Buy this one now before the grim reaper does",
  "skull.png",
  "skullEmoji"
);

let thumbsUpEmoji = new Emoji(
  "420000.00",
  "Thumbs Up",
  "Congrats for making it all the way to the end of the list and reading all the details",
  "thumbsup.png",
  "thumbsUpEmoji"
);

// put the emoji objects into an array with all of them for easy access later

let emojis = [
  clownEmoji,
  unicornEmoji,
  devilEmoji,
  heartEmoji,
  heartEyesEmoji,
  nerdEmoji,
  poopEmoji,
  sickEmoji,
  skullEmoji,
  thumbsUpEmoji,
];

$(document).ready(function () {
  // initialize the cart array
  let cart = [];

  if (localStorage.getItem("shoppingCart") === null) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  } else {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  // a discountcodes arrayto get your discount
  let discountCodes = ["ELONDOGE", "STINGRAY", "EMOJI2021", "MJCHICAGO"];

  // initialise a discount applied variable

  let discountApplied = false;

  // function to verify discount codes when plugged in

  function verifyDiscount() {
    // get what they have entered
    let codeSubmitted = document.getElementById("coupon").value;

    //put the string submitted into an array with each character
    let codeSubmittedArr = codeSubmitted.split("");
    console.log(codeSubmittedArr);
    if (codeSubmitted.length != 0) {
      //go through each code
      for (let i = 0; i < discountCodes.length; i++) {
        let codeCorrect = true;
        let code = discountCodes[i].split("");
        console.log(code);
        // go through each character in the code
        if (discountApplied === false) {
          console.log(code);
          for (let j = 0; j < code.length; j++) {
            if (codeSubmittedArr[j] != code[j]) {
              codeCorrect = false;
            }
          }
          if (codeCorrect === true) {
            discountApplied = true;
          }
        }
      }

      if (discountApplied === true) {
        loadCartList();
        alert("Success! Your 20% discount has been applied!");
      } else {
        alert(
          codeSubmitted + " is not a valid discount code, please try again"
        );
      }
    } else {
      alert("You have not entered a discount code, please try again");
    }
  }

  if (document.getElementById("verifyButton") != null) {
    let verifyButton = document.getElementById("verifyButton");
    //add event listener with onclick to the button with the function

    verifyButton.addEventListener("click", function (event) {
      verifyDiscount();
    });
  }

  // initialise delivery boolean
  let delivery = false;

  // function to show the delivery form if delivery is checked and hide it if not
  //a function which contains showing / hiding
  function showHideDiv() {
    let deliveryRadio = document.getElementById("delivery");
    console.log(deliveryRadio.checked);
    if (deliveryRadio.checked == true) {
      //show the div
      let deliveryForm = document.getElementById("deliveryForm");
      deliveryForm.style.display = "block";
      delivery = true;
    } else {
      //hide the div
      let deliveryForm = document.getElementById("deliveryForm");
      deliveryForm.style.display = "none";
      delivery = false;
    }
    loadCartList();
  }

  // basically checking if the user is on the checkout page
  if (document.getElementById("delivery") != null) {
    let deliveryRadio = document.getElementById("delivery");
    let collectionRadio = document.getElementById("collection");

    deliveryRadio.addEventListener("click", function (event) {
      showHideDiv();
    });

    collectionRadio.addEventListener("click", function (event) {
      showHideDiv();
    });
  }

  function closeDialog() {
    // once the dialog is open there is an element on the DOM with the id of dialog
    let dialog = document.getElementById("dialog");

    // we can use the built in dialog element close method.
    dialog.close();

    // once we have closed it we need to remove the element so that each time a different car is clicked on
    // the dialog element will be able to be the correct one and have the close functionality

    dialog.remove();
  }

  // code to populate the check out list
  function loadCartList() {
    if (document.getElementById("cartDetails") != null) {
      //basically checking if the user is on the cart page so the div would be there to be loaded
      let cartDetailsDiv = document.getElementById("cartDetails");
      // load up the totalcost to the totalheading
      let totalHeading = document.getElementById("totalCost");

      if (cart.length == 0) {
        cartDetailsDiv.innerHTML =
          "You have no items in your cart, go to the product catalogue page to see our available products";
        totalHeading.innerHTML = "R 0.00";
      } else {
        cartDetailsDiv.innerHTML = ""; //clear the table for every reload
        // create the table
        let table = document.createElement("table");
        let headerRow = document.createElement("tr");
        let tHeadElement = document.createElement("thead");

        // create the headers
        let nameHeader = document.createElement("th");
        let quantityHeader = document.createElement("th");
        let priceHeader = document.createElement("th");
        let vatHeader = document.createElement("th");
        let totalHeader = document.createElement("th");
        let removeHeader = document.createElement("th");

        // put the headers text in the element
        nameHeader.innerHTML = "Item";
        quantityHeader.innerHTML = "Quantity";
        priceHeader.innerHTML = "Price";
        vatHeader.innerHTML = "VAT (14%)";
        totalHeader.innerHTML = "Sub-Total";
        removeHeader.innerHTML = "Remove?";

        // append the th to the tr
        headerRow.appendChild(nameHeader);
        headerRow.appendChild(quantityHeader);
        headerRow.appendChild(priceHeader);
        headerRow.appendChild(vatHeader);
        headerRow.appendChild(totalHeader);
        headerRow.appendChild(removeHeader);

        // append the thead
        tHeadElement.appendChild(headerRow);

        // append row to table
        table.appendChild(tHeadElement);

        // id for table
        table.setAttribute("id", "cartTable");

        // append table to div
        cartDetailsDiv.appendChild(table);
        // found this on stackoverflow as A good way to add lots of classes to the table for styling with bootstrap
        // https://stackoverflow.com/questions/1988514/javascript-css-how-to-add-and-remove-multiple-css-classes-to-an-element
        // add all the classes to an array
        let classesToAdd = [
          "table",
          "table-dark",
          "table-striped",
          "table-responsive-sm",
        ];

        // add the classes to the table with the es6 spread operator
        table.classList.add(...classesToAdd);

        // table body
        let tableBody = document.createElement("tbody");

        cart.forEach(function (item, index) {
          //get the index if the item in the array for use in the removebutton
          let itemTotal = Number(item.totalPrice) * Number(item.quantity);

          // make the item row
          let itemRow = document.createElement("tr");

          // make a table with item , quantity, price total and then at the bottom a subtotal
          let nameDetail = document.createElement("td");
          let quantityDetail = document.createElement("td");
          let priceDetail = document.createElement("td");
          let vatDetail = document.createElement("td");
          let itemTotalDetail = document.createElement("td");
          let removeDetail = document.createElement("td");

          nameDetail.innerHTML = item.name;
          quantityDetail.innerHTML = item.quantity;
          priceDetail.innerHTML = "R " + item.price;
          vatDetail.innerHTML = "R " + item.vat;
          itemTotalDetail.innerHTML = "R " + itemTotal.toFixed(2);

          //   add a remove from cart button
          let removeButton = document.createElement("button");
          removeButton.innerHTML = "X";

          removeButton.addEventListener("click", function (e) {
            removeFromCart(index);
          });

          //add the desired classes to the button for styling like I did with the table above
          let btnClasses = ["btn", "btn-danger"]; //red because we don't want the customer to remove anything from the cart

          removeButton.classList.add(...btnClasses);

          removeDetail.appendChild(removeButton);

          // append the detail to the row
          itemRow.appendChild(nameDetail);
          itemRow.appendChild(quantityDetail);
          itemRow.appendChild(priceDetail);
          itemRow.appendChild(vatDetail);
          itemRow.appendChild(itemTotalDetail);
          itemRow.appendChild(removeButton);

          // append to body
          tableBody.appendChild(itemRow);

          // append to table
          table.appendChild(tableBody);
        });

        // calculate the total
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
          total += cart[i].quantity * cart[i].totalPrice;
        }
        console.log(discountApplied);

        if (discountApplied == true) {
          total = total * 0.8; //the twenty percent discount
        }

        if (delivery == true) {
          total += 60;
        }

        totalHeading.innerHTML = "R " + total.toFixed(2);
      }
    }
  }

  // remove from cart function that is used in the table

  function removeFromCart(index) {
    // remove it from the array cart, reset the local storage for shopping cart, rerun the loadcartlist function
    cart.splice(index, 1);

    localStorage.setItem("shoppingCart", JSON.stringify(cart));

    loadCartList();
  }

  // add to cart function

  function addToCart(emoji) {
    if (document.getElementById("quantityInput").value.length == 0) {
      alert("Please enter a quantity before adding to cart");
    } else {
      let quantity = Number(document.getElementById("quantityInput").value);

      cart.push({
        name: emoji.name,
        quantity: quantity,
        price: emoji.price,
        vat: emoji.vat,
        totalPrice: emoji.totalPrice,
      });

      localStorage.setItem("shoppingCart", JSON.stringify(cart));

      // reload the cart list on the cart page
      loadCartList();

      // make an alert saying the item has been added to cart
      // calculate the total
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity * cart[i].totalPrice;
      }
      alert(
        "Successfully added to cart, your current total, with VAT is R " + total
      );

      // close the dialog after the item has been successfully added to the cart

      closeDialog();
    }
  }

  // Close dialog function

  // in the dialog box each product should be allowed to add to cart

  // create a dialog box like in the other projects that come up for the diferent emojis for sale
  $(".emoji").click(function (event) {
    for (let emoji of emojis) {
      if (emoji.id == event.target.id) {
        let dialog = document.createElement("dialog");
        let emojiName = document.createElement("h2");
        let price = document.createElement("h4");
        let description = document.createElement("h4");
        let addToCartButton = document.createElement("button");
        let quantityInput = document.createElement("input");
        let cancelButton = document.createElement("button");

        cancelButton.setAttribute("id", "cancel");
        cancelButton.setAttribute("type", "reset");

        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("id", "quantityInput");
        quantityInput.setAttribute("min", "1");

        // need to pass to addtoCart function the object that we are adding and the quantity from the dialog
        // we can give the button an

        addToCartButton.addEventListener("click", function (e) {
          addToCart(emoji);
        });

        // it is something like this. just add it an event listener to the button each time it is created with the function and the variables

        // need to add the onclick event to each of the images and to run the function for each of the cars

        emojiName.innerHTML = emoji.name;
        price.innerHTML = "Price: R" + emoji.price;
        description.innerHTML = emoji.description;
        cancelButton.innerHTML = "Close";
        addToCartButton.innerHTML = "Add to Cart";

        cancelButton.setAttribute("onclick", "closeDialog();");

        dialog.appendChild(emojiName);
        dialog.appendChild(price);
        dialog.appendChild(description);
        dialog.appendChild(cancelButton);
        dialog.appendChild(quantityInput);
        dialog.appendChild(addToCartButton);

        dialog.setAttribute("id", "dialog");

        let emojiDetailsDiv = document.getElementById("emojiDetails");
        emojiDetailsDiv.appendChild(dialog);
        dialog.showModal();
      }
    }
  });

  // confirm order button with a reference number generator
  // ?going to use a random 8 digit number and the dae to make one code we could use the database once that is hooked up to make sure it is unique
  if (document.getElementById("confirmButton") != null) {
    let confirmButton = document.getElementById("confirmButton");

    confirmButton.addEventListener("click", function (event) {
      // check they have put something in the cart
      if (cart.length <= 0) {
        alert(
          "You don't have anything in your cart, please go to the catalogue page to browse"
        );
      } else {
        let date = new Date();
        let year = date.getFullYear().toString();
        // the month comes back 0-11 and i want it to always be two digits so put the leading zero and then slice from the back
        let month = ("0" + (date.getMonth() + 1).toString()).slice(-2);
        //same with the day
        let day = ("0" + date.getDate().toString()).slice(-2);
        let referenceNumber = year + month + day;

        let generatedDigits = "";
        // generate a random 8 digit number
        for (i = 0; i < 8; i++) {
          generatedDigits += Math.round(Math.random() * 10).toString();
        }
        referenceNumber += generatedDigits;

        // clear the cart and reload the page
        cart = [];

        localStorage.setItem("shoppingCart", JSON.stringify(cart));

        alert("Your order has been placed successfully" + referenceNumber);

        loadCartList();
      }
    });
  }

  //load up the div with the items in our trolley
  loadCartList();
});
