var countries = {
	"US": {
		"alpha2": "US",
		"alpha3": "USA",
		"name": "United States",
		"flag": "US"
	},
	
	"CA": {
		"alpha2": "CA",
		"alpha3": "CAN",
		"name": "Canada",
		"flag": "CA"
	},
	
	"GB": {
		"alpha2": "GB",
		"alpha3": "GBR",
		"name": "United Kingdom",
		"flag": "GB"
	},
	
	"WO": {
		"alpha2": "WO",
		"alpha3": "WOR",
		"name": "World",
		"flag": "WO"
	}
};

var countryFlag = function(country){
	for (var prop in countries){
		if (countries.hasOwnProperty(prop)){
			if(countries[prop].alpha2 == country.toUpperCase() || countries[prop].alpha3 == country.toUpperCase()){
				return countries[prop].flag;
			}
		}
	}
};

var countryName = function(country){
	for (var prop in countries){
		if (countries.hasOwnProperty(prop)){
			if(countries[prop].alpha2 == country.toUpperCase() || countries[prop].alpha3 == country.toUpperCase()){
				return countries[prop].name;
			}
		}
	}
};