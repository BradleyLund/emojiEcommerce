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

console.log(emojis);

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
  // Close dialog function

  // create a dialog box like in the other projects that come up for the diferent emojis for sale
  $(".emoji").click(function (event) {
    for (let emoji of emojis) {
      if (emoji.id == event.target.id) {
        console.log(emoji);
        let dialog = document.createElement("dialog");
        let emojiName = document.createElement("h2");
        let price = document.createElement("h4");
        let description = document.createElement("h4");
        let cancelButton = document.createElement("button");
        cancelButton.setAttribute("id", "cancel");
        cancelButton.setAttribute("type", "reset");

        emojiName.innerHTML = emoji.name;
        price.innerHTML = "Price: R" + emoji.price;
        description.innerHTML = emoji.description;
        cancelButton.innerHTML = "Close";

        cancelButton.setAttribute("onclick", "closeDialog();");

        dialog.appendChild(emojiName);
        dialog.appendChild(price);
        dialog.appendChild(description);
        dialog.appendChild(cancelButton);

        dialog.setAttribute("id", "dialog");

        let emojiDetailsDiv = document.getElementById("emojiDetails");
        emojiDetailsDiv.appendChild(dialog);
        dialog.showModal();
      }
    }
  });
});
