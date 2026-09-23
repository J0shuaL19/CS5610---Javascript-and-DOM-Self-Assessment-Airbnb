# San Francisco Airbnb Listings

This is my second web development assignment. The page loads Airbnb data from a JSON file and displays the first 50 listings.

The page uses Bootstrap for the card layout, spacing, and responsive columns. Bootstrap is loaded from a CDN, so there is nothing extra to download.

## Features

Each card shows the listing name, description, amenities, host name and photo, price, and listing photo. I also added search options that filter the listings by name and price range.

The page shows two listings in each row on a regular screen. On a smaller screen, it changes to one listing in each row.

## How to run the page

The page uses `fetch()` to read the JSON file, so it should be opened with a local server.

I used the Live Server extension in VS Code:

1. Open this folder in VS Code.
2. Right-click `index.html`.
3. Click **Open with Live Server**.

No npm install is needed.

## Files

- `index.html` has the page structure.
- `main.css` has the styles.
- `main.js` loads and displays the listings.
- `airbnb_sf_listings_500.json` has the Airbnb listing data.

## GitHub Pages

Live page: `https://j0shual19.github.io/CS5610---Javascript-and-DOM-Self-Assessment-Airbnb/`
