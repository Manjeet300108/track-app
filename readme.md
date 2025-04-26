# check if the browser supports geolocation 

set options for high accuracy a 5 second timeout and no caching

# use watchPosition to track the users location continously

emit the latitude and longitude via a socket with send location log any error to the console

# initialize a map centered at coordinates (0,0) with a zoom level of 15 using leaflet add openStreetMap tiles to the map 

create an empty object markers

# when receving loc data via the socket extract id latitude and longitude and center the map on the new coordinates

if a marker for the id exists update his position otherwise create a new marker at the given coordinates and add it to the map when a user disconnected remove their marker from the map and delete it from markers

//on -- receive
//emit --send