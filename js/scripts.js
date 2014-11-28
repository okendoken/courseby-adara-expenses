var ALL_CATEGORIES = [];
jQuery(document).ready(function	() {

	var allCategories = ALL_CATEGORIES;

	var Category = {
		name: "some category",
		totalAmount: function () {
			var sum = 0;
			for (var i = 0; i < this.purchases.length; i++) {
				sum += (this.purchases[i].totalCost());
			} return sum;
		},
		initialize: function(name){
			this.name = name;
			this.purchases = [];
		}
	};

	$('#categories-form').submit(function(e){
		e.preventDefault();

		var newCategory = Object.create(Category);
		newCategory.initialize($("input#category").val());

		$("ul#categories").append("<li><span class='catName'>" + newCategory.name  + "</span></li>");
		$('.havnt-categories').hide();
		$("span#activeCategory").text(newCategory.name);

		allCategories.push(newCategory);
	/*	$("table").hide();
		$('.havnt-purchases').show();
		$("#total-amount").empty()*/
		$("ul#categories li").last().click(function() {

			var activeCategory = $(this).text();
			$("span#activeCategory").text(activeCategory);

			for(var i = 0; i < allCategories.length; i++){
				if(activeCategory == allCategories[i].name){

					$("table").empty().append('<tr>' +
					'<td class="description"></td>' +
					'<td class="price"></td>' +
					'<td class="quantity"></td>>' +
					'<td class="total"></td>>' +
					'</tr>');

					allCategories[i].purchases.forEach(function(newPurchase)
					{

						$(".description").last().text(newPurchase.description);
						$(".price").last().text(newPurchase.price);
						$(".quantity").last().text(newPurchase.quantity);
						$(".total").last().text(newPurchase.totalCost());

					});
					$("#total-amount").empty().append('Total amount of category is: ' + allCategories[i].totalAmount());
				}
			}



		});

	});

	var Purchase = {
		description: "some stuff",
		price: 0,
		quantity: 1,
		totalCost: function () {
			return this.price * this.quantity
		}
	};

	$('#purchases-form').submit(function(e){
		e.preventDefault();
		$('.havnt-purchases').hide();

		var newPurchase = Object.create(Purchase);
		newPurchase.description = $("input#description").val();
		newPurchase.price = parseInt($("input#price").val());
		newPurchase.quantity = parseInt($("input#quantity").val());

		var activeCategory = $("span#activeCategory").text();

		for(var i = 0; i < allCategories.length; i++){
			if(activeCategory == allCategories[i].name){
				allCategories[i].purchases.push(newPurchase); //почему они передаются и в следующую NewCat?
				$("#total-amount").empty().append('Total amount of category is: ' + allCategories[i].totalAmount() );
			}
		}


		$("table").show().append('<tr>' +
		'<td class="description"></td>' +
		'<td class="price"></td>' +
		'<td class="quantity"></td>>' +
		'<td class="total"></td>>' +
		'</tr>');



		$(".description").last().text(newPurchase.description);
		$(".price").last().text(newPurchase.price);
		$(".quantity").last().text(newPurchase.quantity);
		$(".total").last().text(newPurchase.totalCost());


	/*	$("input#description").val(""); //очистим инпуты, но почему нельзя исп.empty? ага теперь вообще приходит NaN! BUT WHY??!!
		newPurchase.price = $("input#price").val("");
		newPurchase.quantity = $("input#quantity").val("");*/


	});




});
