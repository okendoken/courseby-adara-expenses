describe("Purchase", function(){
    describe("totalCost", function(){
            it("multiply price on quantity", function(){
                var testPurchase = Object.create(Purchase);
                testPurchase.price = 10;
                testPurchase.quantity = 2;
                testPurchase.totalCost().should.equal(20);
            });
        });

});