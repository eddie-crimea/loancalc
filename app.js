// Listem for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
	// Hide results
	document.getElementById('results').style.display = 'none';

	// Show loader
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults, 1500);

	e.preventDefault();
});

// Caculate results
function calculateResults() {
	console.log('Calculating...');	
	// UI Vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');

	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalIterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedIterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Compute monthly payment
	const x = Math.pow(1 + calculatedIterest, calculatedPayments);
	const monthly = (principal * x * calculatedIterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalIterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

		// Show results
		document.getElementById('results').style.display = 'block';
		
		// Hide loader
		document.getElementById('loading').style.display = 'none';
	} else {
		showError('Please check your numbers');
		console.log('Please check your numbers');
	}
}

// Show error
function showError(error) {
	// Hide results
	document.getElementById('results').style.display = 'none';
		
	// Hide loader
	document.getElementById('loading').style.display = 'none';
	// Create div
	const errorBlock = document.createElement('div');

	// Get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Add class
	errorBlock.className = 'alert alert-danger';

	// Create textNode and append to div
	errorBlock.appendChild(document.createTextNode(error));

	// Insert into the DOM
	card.insertBefore(errorBlock, heading);

	// Clear error after 3sec
	setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
	document.querySelector('.alert').remove();
}