#!/bin/bash
# osm_to_svg.sh - Download OSM data and convert to SVG

BBOX="$1"  # Format: min_lon,min_lat,max_lon,max_lat
OUTPUT="$2"

# Download OSM data
curl -s "https://overpass-api.de/api/map?bbox=${BBOX}" -o temp.osm

# # Convert to GeoJSON (requires osmtogeojson)
# osmtogeojson temp.osm > temp.json

# # Convert to SVG using Python script
# python3 geojson_to_svg.py temp.json "${OUTPUT}.svg"

# # Clean up
# rm temp.osm temp.json

# echo "SVG map saved as ${OUTPUT}.svg"  
