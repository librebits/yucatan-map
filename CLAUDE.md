# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive map visualization project for the Yucatan Peninsula region, covering tourist destinations across Mexico, Guatemala, and Belize. Built with vanilla JavaScript (ES6+) and SVG for simplicity and educational purposes. The map displays 15+ locations from Mérida to Caye Caulker with geographic coordinates.

## Project Structure

```
Yucatan-map/
├── index.html                        # YUCATAN1 (Western Route) - main page
├── map.js                           # YUCATAN1 implementation
├── index2.html                      # YUCATAN2 (West to East) - alternative route
├── map2.js                          # YUCATAN2 implementation
├── yucatan.svg                      # Base SVG map (corrected viewBox)
├── Yucatan-locations-geojson.json   # City coordinates (GeoJSON format)
├── geolocation-data.md              # Location coordinates reference
├── osm_to_svg.sh                    # OpenStreetMap data download script
├── temp.osm                         # Temporary OSM data file
├── Base-map/                        # Base SVG map resources
├── Screenshots/                     # Visual documentation
├── README.org                       # Org-mode documentation
├── TODO.org                         # Task tracking (Org-mode)
└── CLAUDE.md                        # This file
```

## Development Commands

### Start Development Server

Uses `browser-sync` for live reloading during development:

```bash
npx browser-sync start --server --files "*.html,*.js,*.svg,*.json" --no-notify --port 3000
```

**Access URLs:**
- YUCATAN1: http://localhost:3000/index.html
- YUCATAN2: http://localhost:3000/index2.html
- Dashboard: http://localhost:3001

**Watched files:** All HTML, JS, SVG, and JSON files in root directory.

### Stop Development Server

```bash
# Find process
ps aux | grep browser-sync

# Kill by PID
kill <PID>
```

### OSM Data Download

Download OpenStreetMap data for the region (currently not working - Overpass API issues):

```bash
./osm_to_svg.sh "-93.0,14.0,-86.0,21.5" output_name
```

**Bounding Box:** Covers all locations from San Cristóbal de las Casas (west) to Caye Caulker (east), Guatemala/Antigua (south) to Mérida/Cancún (north).

## Geographic Boundaries

```javascript
const BOUNDS = {
    min_lon: -93.0,  // West
    min_lat: 14.0,   // South
    max_lon: -86.0,  // East
    max_lat: 21.5    // North
};
```

## Locations Covered

**Mexico (7):** Mérida, Chichén Itzá, Palenque, San Cristóbal de las Casas, Bacalar, Playa del Carmen, Cancún

**Guatemala (6):** Panajachel, Antigua Guatemala, Chichicastenango, Guatemala Airport, Flores, Tikal

**Belize (2):** Belize City, Caye Caulker

All coordinates are in `geolocation-data.md` and will be structured in `Yucatan-locations-geojson.json`.

## Technology Stack

- **Frontend:** Vanilla JavaScript (ES6+), no frameworks
- **Map Format:** SVG for vector graphics
- **Data Format:** GeoJSON for location coordinates
- **Dev Server:** browser-sync for live reloading
- **Documentation:** Org-mode files (Emacs-centric workflow)

## Development Philosophy

- **KISS principle:** Keep implementations simple and straightforward
- **Vanilla JS:** No React or heavy frameworks - pure JavaScript
- **Educational context:** Code designed for teaching and learning
- **Functional paradigm:** Prefer functional programming patterns over OOP when possible

## Current Status

⚠️ **Early Development Phase** - Core files (HTML, JS, GeoJSON) not yet created. Project structure and documentation in place.

**Known Issues:**
- Overpass API for OSM data downloads is failing (see TODO.org)
- Need to implement SVG basemap conversion strategy

## File Editing Notes

- **Emacs integration:** Project uses Org-mode for documentation and task tracking
- **No backup needed:** All files are under git version control
- **Async execution:** README.org contains Babel blocks for async browser-sync startup
