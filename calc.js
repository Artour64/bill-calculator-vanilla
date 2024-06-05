function init() {
	tipChange();
	peopleChange();
}

function calculate() {
	let tip_amount = tip();
	document.getElementById("result_tip").innerHTML = "$" + tip_amount;
	
	let bill = roundTwoDecimalPlaces(document.getElementById("bill").value);
	
	let total = bill + tip_amount;
	document.getElementById("result_total").innerHTML = "$" + total;
	
	let people = Number(document.getElementById("people").value);
	if (people > 1) {//don't calculate if you don't need to, performance. It's hidden anyways.
		let split_bill = roundTwoDecimalPlaces(bill / people);
		document.getElementById("result_bill_split").innerHTML = "$" + split_bill;
		
		let split_tip = roundTwoDecimalPlaces(tip_amount / people);
		document.getElementById("result_tip_split").innerHTML = "$" + split_tip;
		
		let split_total = roundTwoDecimalPlaces(total / people);
		document.getElementById("result_total_split").innerHTML = "$" + split_total;
	}
}

function tipChange() {
	/*
	let style = "none";
	if (document.getElementById("tip").value == -1) {
		style = "grid";
	}
	document.getElementById("tip_custom_div").style.display = style;
	*/
	
	//above is equivalent code, depends on style preferences and guidelines
	document.getElementById("tip_custom_div").style.display = 
		document.getElementById("tip").value == -1
			? "grid"
			: "none"
	
	calculate();
}

function peopleChange() {
	//see comment in tipChange()
	document.getElementById("per_person_div").style.display = 
		document.getElementById("people").value > 1
			? "grid"
			: "none"
	
	calculate();
}

function roundTwoDecimalPlaces(num) {
	//add epsilon to make sure 0.005 rounds up correctly
	//Number(num) cast fixes a bug where a NaN is produced when a number is expected
	return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
}

function tip() {
	let percent = document.getElementById("tip").value;
	
	//can be simplified with a ternary, like I did in tipChange() and peopleChange()
	let result = 0;
	if (percent == -1) {
		result = Number(document.getElementById("tip_custom").value);
	} else {
		let bill = document.getElementById("bill").value;
		result = bill * percent * 0.01;
	}
	return roundTwoDecimalPlaces(result);
}

function reset() {
	document.getElementById("bill").value = 0;
	document.getElementById("tip").value = 0;
	document.getElementById("tip_custom").value = 0;
	document.getElementById("people").value = 1;
	
	init();
}
