/**
 * Yucatan Peninsula Interactive Map
 * YUCATAN1 - Western Route
 * Vanilla JavaScript (ES6) - KISS principle
 */

// Configuration
const BOUNDS = {
    minLon: -93.0,
    minLat: 14.0,
    maxLon: -86.0,
    maxLat: 21.5
};

const SVG_DIMS = {
    width: 1200,
    height: 800
};

/**
 * Convert geographic coordinates (lon/lat) to SVG coordinates (x/y)
 * Pure function - no side effects
 */
const geoToSvg = (lon, lat) => {
    const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * SVG_DIMS.width;
    const y = SVG_DIMS.height - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * SVG_DIMS.height;
    return { x, y };
};

/**
 * Create SVG marker element
 * Functional approach - returns new element
 */
const createMarker = (location, index) => {
    const [lon, lat] = location.geometry.coordinates;
    const { x, y } = geoToSvg(lon, lat);
    const { name, country, description } = location.properties;

    // Create group element
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.classList.add('marker');
    g.setAttribute('data-name', name);
    g.setAttribute('data-country', country);

    // Circle marker
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 6);
    g.appendChild(circle);

    // Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + 10);
    text.setAttribute('y', y + 4);
    text.textContent = name;
    g.appendChild(text);

    // Event listener
    g.addEventListener('click', () => {
        alert(`${name}\n${country}\n\n${description}`);
    });

    return g;
};

/**
 * Create location list item
 * Functional approach - returns new element
 */
const createLocationItem = (location) => {
    const { name, country, description } = location.properties;

    const div = document.createElement('div');
    div.classList.add('location-item');
    div.innerHTML = `
        <strong>${name}</strong>
        <div class="country-tag">${country}</div>
        <p style="margin-top: 8px; color: #666; font-size: 0.9em;">${description}</p>
    `;

    return div;
};

/**
 * Load SVG map
 * Async function using fetch API
 */
const loadSvg = async () => {
    try {
        const response = await fetch('yucatan.svg');
        const svgText = await response.text();
        document.getElementById('map').innerHTML = svgText;
        return document.querySelector('svg');
    } catch (error) {
        console.error('Error loading SVG:', error);
        throw error;
    }
};

/**
 * Load locations data
 * Async function using fetch API
 */
const loadLocations = async () => {
    try {
        const response = await fetch('Yucatan-locations-geojson.json');
        const data = await response.json();
        return data.features;
    } catch (error) {
        console.error('Error loading locations:', error);
        throw error;
    }
};

/**
 * Initialize map
 * Main entry point - orchestrates loading and rendering
 */
const initMap = async () => {
    try {
        // Load SVG and locations in parallel (functional composition)
        const [svg, locations] = await Promise.all([
            loadSvg(),
            loadLocations()
        ]);

        // Get marker group
        const markerGroup = svg.querySelector('#markers');

        // Add markers (functional approach with map)
        locations
            .map((location, index) => createMarker(location, index))
            .forEach(marker => markerGroup.appendChild(marker));

        // Populate location list (functional approach)
        const locationList = document.getElementById('locationList');
        locations
            .map(createLocationItem)
            .forEach(item => locationList.appendChild(item));

        console.log(`✓ Map initialized with ${locations.length} locations`);

    } catch (error) {
        console.error('Error initializing map:', error);
        document.getElementById('map').innerHTML =
            '<p style="color: red; padding: 20px;">Error loading map. Please check console for details.</p>';
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
