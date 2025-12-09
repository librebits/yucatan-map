#!/usr/bin/env python3
"""
Convert GeoJSON to SVG for Yucatan Peninsula map
Simple, functional approach - KISS principle
"""

import json
import sys

def lat_lon_to_svg(lon, lat, bounds, width=1200, height=800):
    """
    Convert geographic coordinates to SVG coordinates
    Lon/Lat -> X/Y with proper scaling and flipping
    """
    min_lon, min_lat, max_lon, max_lat = bounds

    # Scale to SVG dimensions
    x = ((lon - min_lon) / (max_lon - min_lon)) * width
    # Flip Y axis (SVG Y grows downward, lat grows upward)
    y = height - ((lat - min_lat) / (max_lat - min_lat)) * height

    return x, y

def polygon_to_svg_path(coordinates, bounds, width, height):
    """Convert a polygon coordinate array to SVG path data"""
    path_parts = []

    for ring in coordinates:
        points = []
        for lon, lat in ring:
            x, y = lat_lon_to_svg(lon, lat, bounds, width, height)
            points.append(f"{x:.2f},{y:.2f}")

        if points:
            path_parts.append(f"M {points[0]} L {' '.join(points[1:])} Z")

    return ' '.join(path_parts)

def multipolygon_to_svg_path(coordinates, bounds, width, height):
    """Convert a multipolygon to SVG path data"""
    path_parts = []

    for polygon in coordinates:
        path_parts.append(polygon_to_svg_path(polygon, bounds, width, height))

    return ' '.join(path_parts)

def geojson_to_svg(geojson_file, svg_file, width=1200, height=800):
    """Convert GeoJSON file to SVG"""

    # Read GeoJSON
    with open(geojson_file, 'r') as f:
        data = json.load(f)

    # Define bounds (Yucatan Peninsula region)
    bounds = (-93.0, 14.0, -86.0, 21.5)

    # Start SVG
    svg_parts = [
        f'<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        f'  <title>Yucatan Peninsula - Mexico, Guatemala, Belize</title>',
        f'  <desc>Interactive map of tourist destinations</desc>',
        f'',
        f'  <!-- Background -->',
        f'  <rect width="100%" height="100%" fill="#e6f3ff"/>',
        f'',
        f'  <!-- Countries -->'
    ]

    # Country colors
    colors = {
        'Mexico': '#90EE90',
        'Guatemala': '#FFB6C1',
        'Belize': '#87CEEB'
    }

    # Process each feature (country)
    for feature in data['features']:
        country_name = feature['properties']['ADMIN']
        geometry = feature['geometry']
        geom_type = geometry['type']
        coordinates = geometry['coordinates']

        # Convert to SVG path
        if geom_type == 'Polygon':
            path_data = polygon_to_svg_path(coordinates, bounds, width, height)
        elif geom_type == 'MultiPolygon':
            path_data = multipolygon_to_svg_path(coordinates, bounds, width, height)
        else:
            continue

        # Add path to SVG
        fill_color = colors.get(country_name, '#cccccc')
        svg_parts.append(f'  <path id="{country_name.lower()}" class="country" d="{path_data}" ')
        svg_parts.append(f'        fill="{fill_color}" stroke="#333" stroke-width="1.5" opacity="0.8"/>')

    # Close SVG
    svg_parts.extend([
        f'',
        f'  <!-- Marker group - to be populated by JavaScript -->',
        f'  <g id="markers"></g>',
        f'</svg>'
    ])

    # Write SVG file
    with open(svg_file, 'w') as f:
        f.write('\n'.join(svg_parts))

    print(f"✓ Created {svg_file}")
    print(f"  Dimensions: {width}x{height}")
    print(f"  Countries: {len(data['features'])}")
    print(f"  Bounds: {bounds}")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python3 geojson_to_svg.py input.geojson output.svg")
        sys.exit(1)

    geojson_to_svg(sys.argv[1], sys.argv[2])
