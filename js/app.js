const googleURL = `https://maps.googleapis.com/maps/api/staticmap?center=`

const initialMap = {
    lat: 18.8,
    long: 89.5,
    height: window.innerHeight,
    width: window.innerWidth,
    params : {
        zoom: 4,
        maptype: 'satellite',
        scale: 2
    }
};

const initialLocations = [
    {
        name: 'Mumbai',
        lat: 19,
        long: 73
    },
    {
        name: 'Hampi',
        lat: 15.333355390258228,
        long: 76.4633346977881
    },
    {
        name: 'Madurai',
        lat: 9.92459880544921,
        long: 78.12110650578332
    },
    {
        name: 'Kanyakumari',
        lat: 8.078541501887765,
        long: 77.5553547315407
    },
    {
        name: 'Varkala',
        lat: 8.738166316264463, 
        long: 76.71739663566046,
    }
]

const ViewModel = function() {
    var self = this;
    this.locationList = ko.observableArray([]);

    initialLocations.forEach(function(locationItem) {
        self.locationList.push( new Location(locationItem));
    });

    this.currentMap = ko.observable(new Map(initialMap, this.locationList()));
}

const Location = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.long = ko.observable(data.long);
}

const Map = function(mapData, locationData) {
    this.url = ko.computed(function(){
        let url = googleURL + `${mapData.lat},${mapData.long}&size=${mapData.height}x${mapData.width}`;
        
        for (const i in mapData.params) {
            url += `&${i}=${mapData.params[i]}`;
        }

        for (const i of locationData) {
            const label = i.name().charAt(0);
            console.log(label);
            url += `&markers=color:red%7Csize:mid%7Clabel:${label}%7C${i.lat()},${i.long()}`
        }

        url += `&key=${API_KEY}`

        return url;
    },this);
}

ko.applyBindings(new ViewModel());