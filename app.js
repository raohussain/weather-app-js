window.addEventListener('load',() => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperatue-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let iconID = document.querySelector('.icon');
	let temperatureSection = document.querySelector('.temperature');
	let temperatureSpan = document.querySelector('.temperature span');
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api =`${proxy}https://api.darksky.net/forecast/ce7cb8ef15ea497f50056e1536fe16fc/${lat},${long}`;
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					const {temperature,summary,icon} = data.currently;
					// set dom elements
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					setIcons(icon,iconID)

					//set temperature to celcius or farenheit
					let celcius = (temperature - 32) * (5 / 9);
					temperatureSection.addEventListener("click", () =>{
						if(temperatureSpan.textContent === 'F'){
							temperatureSpan.textContent = 'C';	
							temperatureDegree.textContent = Math.floor(celcius);

						}else{
							temperatureSpan.textContent = 'F';
							temperatureDegree.textContent = Math.floor(temperature);

						}
					});
 				})
		});
	}
	function setIcons(icons,iconID){
		const skycons = new Skycons({"color": "white"});
		const currentIcon = icons.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID,Skycons[currentIcon]);
	}
});