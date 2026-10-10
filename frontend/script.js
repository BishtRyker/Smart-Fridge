// Temporary data only. SQLite will replace this in Step 2.
let inventory = [];
let shoppingList = [];

function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString();
}

function showInventory() {
  const list = document.getElementById("inventoryList");
  list.innerHTML = "";

  inventory.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.name + " (Qty: " + item.quantity + ")";
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.className = "remove";
    button.onclick = function () {
      inventory.splice(index, 1);
      showInventory();
    };
    li.appendChild(button);
    list.appendChild(li);
  });
}

function showShoppingList() {
  const list = document.getElementById("shoppingList");
  list.innerHTML = "";

  shoppingList.forEach((name, index) => {
    const li = document.createElement("li");
    li.textContent = name;
    const button = document.createElement("button");
    button.textContent = "Done";
    button.className = "remove";
    button.onclick = function () {
      shoppingList.splice(index, 1);
      showShoppingList();
    };
    li.appendChild(button);
    list.appendChild(li);
  });
}

document.getElementById("inventoryForm").onsubmit = function (event) {
  event.preventDefault();
  const name = document.getElementById("itemName").value.trim();
  const quantity = Number(document.getElementById("itemQuantity").value);

  if (name && quantity > 0) {
    inventory.push({ name: name, quantity: quantity });
    showInventory();
    this.reset();
    document.getElementById("itemQuantity").value = 1;
  }
};

document.getElementById("shoppingForm").onsubmit = function (event) {
  event.preventDefault();
  const name = document.getElementById("shoppingName").value.trim();

  if (name) {
    shoppingList.push(name);
    showShoppingList();
    this.reset();
  }
};

updateClock();
setInterval(updateClock, 1000);
