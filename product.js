// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Items class that extends Product class
class Items extends Product {
  // Static array to store unique product names
  static nameArray = [];
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;

    // Check if the name already exists in the static array
    if (Items.nameArray.includes(name)) {
      return;
    }
    // If not, add the name to the static array
    Items.nameArray.push(name);
  }

  // Static method to return the static name array
  static storedNameArray() {
    return Items.nameArray;
  }

  // Method to calculate total price of the item
  totalPrice() {
    return this.price * this.quantity;
  }
}

// Cart class
class Cart {
  constructor(items) {
    this.items = items;
  }
  // Method to calculate total price of all items in the cart
  totalPriceOfItems() {
    let sum = 0;
    this.items.foreach((item) => {
      sum += item.totalPrice();
    });
    return sum;
  }

  // Method to add an item to the cart
  addItem(item) {
    this.items.push(item);
    console.log(
      `Item added to cart: ${item.name}, \nQuantity: ${item.quantity} added`
    );
  }

  // Method to remove an item from the cart
  removeItem(item_id) {
    let name = "";
    try {
      // Check if the cart is empty
      if (this.items.length === 0) {
        throw new Error("Cart is empty");
      }
      // Check if the item_id is valid
      if (item_id <= 0) {
        throw new Error("Invalid item id");
      }

      // Loop through the items in the cart
      for (let i = 0; i < this.items.length; i++) {
        // Check if the item id matches
        if (this.items[i].id == item_id) {
          name = this.items[i].name;
          console.log(
            `Item removed from cart: One quantity of ${name} with id ${item_id} was removed`
          );
          // Decrease the quantity of the item
          this.items[i].quantity--;
          break;
        }
      }

      console.log(this.items);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  // Method to display the cart items
  displayCart() {
    let cartTotalPriceArray = new Array(Items.storedNameArray().length).fill(0); // Initialize total price array for the items in the cart
    let productArray = Items.storedNameArray(); // Get the array of product names
    let priceArray = new Array(Items.storedNameArray().length).fill(0); // Initialize price array for the items in the cart
    let quantityArray = new Array(Items.storedNameArray().length).fill(0); // Initialize quantity array for the items in the cart

    this.items.forEach((item) => {
      productArray.forEach((product, product_index) => {
        // Check if the product name matches the item name
        if (item.name === product) {
          // Update the price and quantity arrays
          priceArray[product_index] = item.price;
          quantityArray[product_index] += item.quantity;
          // Calculate the total price for the item
          cartTotalPriceArray[product_index] =
            priceArray[product_index] * quantityArray[product_index];
        }
      });
    });
    // Display the cart items
    productArray.forEach((product, index) => {
      console.log(
        `Product: ${product}, Price: ${priceArray[index]}, Quantities: ${quantityArray[index]}, Total Price: ${cartTotalPriceArray[index]}`
      );
    });

    // Display the aggregate total price
    console.log(
      `Aggregate Total : ${
        cartTotalPriceArray[0] +
        cartTotalPriceArray[1] +
        cartTotalPriceArray[2] +
        cartTotalPriceArray[3]
      }`
    );
  }
}

//Testing Items object for products objects defined above
const item1 = new Items(1, "Laptop", 1000, 2); //2 laptops each costing 1000 with id 1
const item2 = new Items(2, "Mobile", 500, 3); //3 mobiles each costing 500 with id 2
const item3 = new Items(3, "Tablet", 300, 4); //4 tablets each costing 300 with id 3
const item4 = new Items(4, "Headphone", 100, 5); //5 headphones each costing 100 with id 4
const item5 = new Items(1, "Laptop", 1000, 5); //2 laptops each costing 1000 with id 1

//Testing Shopping Cart object
const cart = new Cart([item1, item2, item3, item4, item5]);

//Adding new item to cart
cart.addItem(new Items(1, "Laptop", 1000, 1)); //1 laptop added
cart.addItem(new Items(2, "Mobile", 500, 2)); //2 mobiles added
cart.addItem(new Items(3, "Tablet", 300, 3)); //3 tablets added

//Displaying cart items
cart.displayCart();

//Removing Items from Cart
cart.removeItem(4); //Removing a unit of headphone

cart.removeItem(1); //Removing a unit of laptop

cart.removeItem(2); //Removing a unit of mobile

//Displaying cart items after removal
cart.displayCart();
