// create an object for each of the products

function Emoji(price, name, description, imgSrc, id) {
  this.price = price;
  this.name = name;
  this.description = description;
  this.imgSrc = imgSrc;
  this.id = id;
}

let clownEmoji = new Emoji(
  350000,
  "Clown",
  "You could be the class clown if you buy this emoji!",
  "clown.png",
  "clownEmoji"
);

let unicornEmoji = new Emoji(
  420000,
  "Unicorn",
  "If you own this emoji, you will turn your company into a unicorn",
  "unicorn.png",
  "unicornEmoji"
);

let devilEmoji = new Emoji(
  12000,
  "Devil",
  "Show your feisty side to your mates with this emoji you naughty devil!",
  "devil.png",
  "devilEmoji"
);

let heartEmoji = new Emoji(
  135000,
  "Heart",
  "You could own love if you just bought this one",
  "heart.png",
  "heartEmoji"
);

let heartEyesEmoji = new Emoji(
  233000,
  "Heart Eyes",
  "Charge royalties whenever those annoying love birds use this emoji",
  "heartEyes.png",
  "heartEyesEmoji"
);

let nerdEmoji = new Emoji(
  154000,
  "Nerd",
  "Be the first cool nerd by buying this guy",
  "nerd.png",
  "nerdEmoji"
);

let poopEmoji = new Emoji(
  122000,
  "Poop",
  "Who doesn't like a scoop of chocolate ice-cream ....",
  "poop.png",
  "poopEmoji"
);

let sickEmoji = new Emoji(
  54000,
  "Sick",
  "Instead of calling in sick, just send your boss this emoji",
  "sick.png",
  "sickEmoji"
);

let skullEmoji = new Emoji(
  320000,
  "Skull",
  "Buy this one now before the grim reaper does",
  "skull.png",
  "skullEmoji"
);

let thumbsUpEmoji = new Emoji(
  420000,
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

function closeDialog() {
  // once the dialog is open there is an element on the DOM with the id of dialog
  let dialog = document.getElementById("dialog");

  // we can use the built in dialog element close method.
  dialog.close();

  // once we have closed it we need to remove the element so that each time a different car is clicked on
  // the dialog element will be able to be the correct one and have the close functionality

  dialog.remove();
}

$(document).ready(function () {
  // initialize the cart array
  let cart = [];

  if (localStorage.getItem("shoppingCart") === null) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  } else {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  // code to populate the check out list
  function loadCartList() {
    if (document.getElementById("cartDetails") != null) {
      //basically checking if the user is on the cart page so the div would be there to be loaded
      cartDetailsDiv = document.getElementById("cartDetails");
      if (cart.length == 0) {
        cartDetailsDiv.innerHTML =
          "You have no items in your cart, go to the product catalogue page to see our available products";
      } else {
        // create the table
        let table = document.createElement("table");
        let headerRow = document.createElement("tr");

        // create the headers
        let nameHeader = document.createElement("th");
        let quantityHeader = document.createElement("th");
        let priceHeader = document.createElement("th");
        let totalHeader = document.createElement("th");

        // put the headers text in the element
        nameHeader.innerHTML = "Item";
        quantityHeader.innerHTML = "Quantity";
        priceHeader.innerHTML = "Price";
        totalHeader.innerHTML = "Total";

        cart.forEach(function (item) {
          let itemTotal = item.price * item.quantity;

          // make a table with item , quantity, price total and then at the bottom a subtotal
          let nameDetail = document.createElement("h3");
          let quantityDetail = document.createElement("h3");
          let priceDetail = document.createElement("h3");
          let itemTotalDetail = document.createElement("h3");

          nameDetail.innerHTML = item.name;
          quantityDetail.innerHTML = item.quantityDetail;
          priceDetail.innerHTML = "R " + item.price;
          itemTotalDetail.innerHTML = "R" + itemTotal;
        });
      }
    }
  }

  function addToCart(emoji) {
    let quantity = document.getElementById("quantityInput").value;
    // console.log(quantity, emoji.name);
    cart.push({ name: emoji.name, quantity: quantity, price: emoji.price });
    // console.log(cart);

    localStorage.setItem("shoppingCart", JSON.stringify(cart));

    // reload the cart list on the cart page
    loadCartList();

    // make an alert saying the item has been added to cart
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

  //load up the div with the items in our trolley
  loadCartList();
});
