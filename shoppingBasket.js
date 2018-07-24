const ShoppingBasket = function(discount){
  this.content = [];
  this.discount = discount;
};

ShoppingBasket.prototype.add = function(itemToAdd) {
  let added; // false by default

  // if item type (eg. trousers) already in the list, increase quantity
  for(let listItem of this.content) {
    if(listItem.item.name == itemToAdd.name) {
      listItem.quantity += 1;
      added = true;
    }
  }
  // if not, add to hash to list
  if(!added) {
    this.content.push({item: itemToAdd, quantity: 1});
  }

};

ShoppingBasket.prototype.remove = function(itemToRemove) {
  // content: ({item: itemToAdd, quantity: 1})
  for(let i = this.content.length - 1; i >= 0; i--){
    if(this.content[i].item === itemToRemove){
        this.content[i].quantity -= 1;
        if(!this.content[i].quantity){
            this.content.splice(i, 1);
        }
    }
  }
};

ShoppingBasket.prototype.calculateSum = function(){
  let sum = 0;
  for(let listItem of this.content) { // iterate through hash
    sum += listItem.item.price * listItem.quantity;
  }
// CHECK BOGOF
  let bogofDiscount = 0;
  for(var listItem of this.content) {
    if((listItem.item.discount) && (listItem.quantity > 1)) {
      let numberOfBogofItems = Math.floor(listItem.quantity / 2);
      let amountOfDiscount = numberOfBogofItems * listItem.item.price;
      bogofDiscount += amountOfDiscount;
    }
  }
  sum -= bogofDiscount;
  return sum;
};

ShoppingBasket.prototype.applyDiscount = function(){
  bill = this.calculateSum();
  if(bill > 20) {
    if(this.discount) {
      bill = (bill * 85) / 100;
    } else {
      bill = (bill * 90) / 100;
    }
  }
  return bill;
};

module.exports = ShoppingBasket;
