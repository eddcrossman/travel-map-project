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

const ViewModel = function() {
    var self = this;
    this.currentMap = ko.observable(new Map(initialMap));
}

const Map = function(data) {
    this.lat = ko.observable(data.lat);
    this.long = ko.observable(data.long);
    this.height = ko.observable(data.height);
    this.width = ko.observable(data.width);
    this.params = ko.observable(data.params);

    this.url = ko.computed(function(){
        let url = googleURL + `${this.lat()},${this.long()}&size=${this.height()}x${this.width()}`;
        
        for (const i in data.params) {
            url += `&${i}=${data.params[i]}`;
        }

        url += `&key=${API_KEY}`

        return url;
    },this);
}

ko.applyBindings(new ViewModel());