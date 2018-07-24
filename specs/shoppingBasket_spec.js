const assert = require('assert');
const ShoppingBasket = require('../shoppingBasket.js');
const Item = require('../item.js');

describe('Shopping Basket', function(){

    var basket1, basket2;
    var item1, item2, item3, item4;

    beforeEach(function(){
      basket1 = new ShoppingBasket(true); // discounted
      basket2 = new ShoppingBasket(false); // NOT iscounted
      item1 = new Item("T-shirt", 10, true);
      item2 = new Item("Pants", 20, false);
      item3 = new Item("Boots", 10, false);
      item4 = new Item("Blazer", 40, true);
      item5 = new Item("Pants", 20, false);
    })

    it('should be empty at start', function(){
      assert.strictEqual(basket1.content.length, 0);
    })

    it('should be able to add items', function(){
      basket1.add(item1);
      assert.strictEqual(basket1.content.length, 1);
    })

    it('should be able to remove items', function(){
      basket1.add(item1);
      assert.strictEqual(basket1.content.length, 1);
      basket1.remove(item1);
      assert.strictEqual(basket1.content.length, 0);
    })

    it('should return sum', function(){
      basket1.add(item1);
      basket1.add(item2);
      basket1.add(item3);
      basket2.add(item1);
      basket2.add(item2);
      basket2.add(item3);
      assert.strictEqual(basket1.applyDiscount(), 34); // -15%
      assert.strictEqual(basket2.applyDiscount(), 36); // -10%
    })

    it('should return correct sum with BOGOF items', function(){
      // NOT DISCOUNTED
      basket2.add(item1);
      basket2.add(item1);
      basket2.add(item3);
      assert.strictEqual(basket2.applyDiscount(), 20);
    })

});
