

// Free Currency API
let convertBtn = document.querySelector('#convertBtn');
let optionVals1 = document.querySelector('.currency');
let optionVals2 = document.querySelector('.currency2');
let statusDiv = document.querySelector('#status');
let cV = document.querySelector("#convertedView");
statusDiv.innerHTML = "<div class='notification is-success'>Fetching Currencies...</div>";
// Get All currencies
const currenciesUrl = 'https://free.currconv.com/api/v5/currencies?apiKey=bcd6c9eaee509520abef';

fetch(currenciesUrl)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		statusDiv.innerHTML = "<div class='notification is-success'>Done...</div>";
		setTimeout(() => {
			statusDiv.innerHTML = "";
		},1000);
		let currencies = data.results;
		for(let currency in currencies) {
			// let optionValue = `<option value`;
			// console.log(`${currencies[currency].currencyName} ${currencies[currency].id} `);
			optionVals1.innerHTML += `<option value='${currencies[currency].id}'>${currencies[currency].currencyName} (${currencies[currency].id}) </option>`;
			optionVals2.innerHTML += `<option value='${currencies[currency].id}'>${currencies[currency].currencyName} (${currencies[currency].id}) </option>`;

		}
		
	})
	.catch((err) => {
		console.error(err);

		statusDiv.innerHTML = `<div class='notification is-danger'>
		<button class="delete"></button>
		Ooops!, Something Went Wrong, Please Reload Page or Try again later...
		</div>`;
		resetBtn();
	})

// Function to handle the conversion
let handleConversion = () => {
	if(navigator.onLine) {
		statusDiv.innerHTML = "<div class='notification is-success'>Converting...</div>";
		convertBtn.classList.add('is-loading');
		let option1 = document.querySelector('.currency').value;
		let option2 = document.querySelector('.currency2').value;
		let conversionValue = document.querySelector('#value').value;

		let query =  `${option1}_${option2}`;
		let conversionUrl = `https://free.currconv.com/api/v5/convert?q=${query}&compact=y&apiKey=bcd6c9eaee509520abef`;
		console.log(conversionUrl);
		// Send Conversion Request
		fetch(conversionUrl)
			.then(res => res.json())
			.then( converted => {

				statusDiv.innerHTML = "<div class='notification is-success'>Converted </div>";
				console.log(converted);
				const outputHtml = document.getElementById('convertedView');
				for(let conv in converted) {
					let conversionRate = converted[conv].val;
					let convertedValue = conversionValue * conversionRate;
					// console.log(convertedValue);
					// alert(`${conversionValue} ${option1} to ${option2} = ${convertedValue}`);
					statusDiv.innerHTML = `<div class='notification is-info'>
					${conversionValue} ${option1} to ${option2} = ${Math.floor(convertedValue *100) / 100}</div>`;
					resetBtn();
				}
			})
			.catch((err) => {
				console.error(err);
				
				statusDiv.innerHTML = `<div class='notification is-danger'>
				<button class="delete"></button>
				Ooops!, Something Went Wrong, Please Try again later...
				</div>`;
				resetBtn();
			})
	}else{
		statusDiv.innerHTML = "<div class='notification is-danger'>Ooops!, Please Check your internet connection</div>";
		resetBtn();
	}
	// 
	

	
	
}

let resetBtn = () => {
	convertBtn.classList.remove('is-loading');
	convertBtn.innerHTML = "Convert";
}
// Register Service Worker
if('serviceWorker' in navigator) {
	// Register Service Worker
	navigator.serviceWorker.register('/convata/sw.js',{ scope: '/convata/'})
	.then((registration) => {
		console.log('Service Worker Registered', registration);
	})
	.catch((err) => {
		console.log('Error Registering Service Worker', err);
	})
}

document.addEventListener('DOMContentLoaded', function() {  
});
