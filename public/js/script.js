const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('send-location', { latitude, longitude });
    },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true, // high accuracy
            timeout: 5000, // timeout
            maximumAge: 0 //no caching
        }
    );
}

const map = L.map('map').setView([0, 0], 10);

//L.map('map') => its provide us location setView([0,0],10) in this we set view center point of earth 0,0 and zoom 10

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Manjeet',
    maxZoom: 19,
}).addTo(map);

const markers = {};

const circle = {

};

socket.on('recevie-location', (data) => {
    const { id, latitude, longitude } = data
    map.setView([latitude, longitude])
    if (markers[id] && circle[id]) {
        markers[id].setLatLng([latitude, longitude])
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map)
        circle[id] = L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 50
        }).addTo(map)
    }
})

socket.on('user-disconnect',(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})