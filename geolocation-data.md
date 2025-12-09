#  Given this set of Central America locations :

-  Merida (Mexico)

-  Chichen Itza (Mexico)

-  Palenque (Mexico)

-  San Cristobal de las Casas (Mexico)

-  Panajachel (Guatemala)

-  Antigua Guatemala

-  Chichicastenango (Guatemala)

-  Guatemala Airport

-  Flores

-  Tikal (Guatemala)

-  Belize City,

-  Caye Caulker (Belize)

-  Bacalar (Mexico)

-  Playa del Carmen (Mexico)

-  Cancun (Mexico)



This bounding box (-> base map) encompasses all your listed locations, from the westernmost point (San Cristóbal de las Casas) to the easternmost (Caye Caulker), and from the southernmost (Guatemala/Antigua area) to the northernmost (Mérida/Cancún region).
For mapping purposes, you might want to add a small buffer to these bounds to ensure all markers are comfortably within the visible area:

```javascript
const BOUNDS_WITH_BUFFER = {
    min_lon: -93.0,
    min_lat: 14.0,
    max_lon: -86.0,
    max_lat: 21.5
};
``

and...
```bash
#    "  ready
#  BBOX = "$1"  
# Format:  "min_lon,min_lat,max_olon,max_lat"
    "-93.0,14.0,-86.0,21.5"
````



## Individual Location Coordinates : Here are the approximate coordinates for each location:


```javascript
const locations = [
    // Mexico
    { name: "Mérida", lat: 20.9674, lon: -89.5926 },
    { name: "Chichén Itzá", lat: 20.6843, lon: -88.5678 },
    { name: "Palenque", lat: 17.5095, lon: -91.9823 },
    { name: "San Cristóbal de las Casas", lat: 16.7370, lon: -92.6376 },
    { name: "Bacalar", lat: 18.6784, lon: -88.3933 },
    { name: "Playa del Carmen", lat: 20.6296, lon: -87.0739 },
    { name: "Cancún", lat: 21.1619, lon: -86.8515 },
    
    // Guatemala
    { name: "Panajachel", lat: 14.7372, lon: -91.1566 },
    { name: "Antigua Guatemala", lat: 14.5586, lon: -90.7295 },
    { name: "Chichicastenango", lat: 14.9433, lon: -91.1113 },
    { name: "Guatemala Airport", lat: 14.5833, lon: -90.5275 },
    { name: "Flores", lat: 16.9297, lon: -89.8908 },
    { name: "Tikal", lat: 17.2220, lon: -89.6237 },
    
    // Belize
    { name: "Belize City", lat: 17.5046, lon: -88.1962 },
    { name: "Caye Caulker", lat: 17.7425, lon: -88.0242 }
];
```
