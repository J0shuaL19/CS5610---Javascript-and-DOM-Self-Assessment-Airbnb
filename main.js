const listingsElement = document.querySelector("#listings");
const messageElement = document.querySelector("#message");
const resultCountElement = document.querySelector("#result-count");
const searchInput = document.querySelector("#search-input");
const minPriceInput = document.querySelector("#min-price");
const maxPriceInput = document.querySelector("#max-price");

let firstFiftyListings = [];

function shortenDescription(description) {
  const temporaryElement = document.createElement("div");
  temporaryElement.innerHTML = description;
  const plainText = temporaryElement.textContent.trim();

  if (plainText.length > 180) {
    return `${plainText.slice(0, 180)}...`;
  }

  return plainText;
}

function getAmenities(amenities) {
  try {
    return JSON.parse(amenities).slice(0, 5);
  } catch (error) {
    return [];
  }
}

function makeListingCard(listing) {
  const amenities = getAmenities(listing.amenities)
    .map((amenity) => `<span class="amenity">${amenity}</span>`)
    .join("");

  return `
    <div class="col-12 col-md-6">
    <article class="listing card h-100">
      <img class="listing-photo" src="${listing.picture_url}" alt="${listing.name}" />
      <div class="listing-info card-body d-flex flex-column">
        <div class="title-row">
          <h3>${listing.name}</h3>
          <span class="price">${listing.price}</span>
        </div>
        <p class="description">${shortenDescription(listing.description)}</p>
        <h4>Amenities</h4>
        <div class="amenities">${amenities}</div>
        <div class="host mt-auto">
          <img src="${listing.host_thumbnail_url}" alt="${listing.host_name}" />
          <div>
            <span>Hosted by</span>
            <strong>${listing.host_name}</strong>
          </div>
        </div>
      </div>
    </article>
    </div>`;
}

function showListings(listings) {
  listingsElement.innerHTML = listings.map(makeListingCard).join("");
  resultCountElement.textContent = `${listings.length} listings shown`;
  messageElement.hidden = listings.length !== 0;

  if (listings.length === 0) {
    messageElement.textContent = "No listings match your search.";
  }
}

function searchListings() {
  const searchText = searchInput.value.trim().toLowerCase();
  const minimumPrice = Number(minPriceInput.value) || 0;
  const maximumPrice =
    maxPriceInput.value === "" ? Infinity : Number(maxPriceInput.value);

  const matchingListings = firstFiftyListings.filter((listing) => {
    const listingPrice = Number(listing.price.replace("$", "").replace(",", ""));
    const matchesName = listing.name.toLowerCase().includes(searchText);
    const matchesPrice =
      listingPrice >= minimumPrice && listingPrice <= maximumPrice;

    return matchesName && matchesPrice;
  });

  showListings(matchingListings);
}

async function loadListings() {
  try {
    const response = await fetch("./airbnb_sf_listings_500.json");

    if (!response.ok) {
      throw new Error("Could not load the JSON file.");
    }

    const listings = await response.json();
    firstFiftyListings = listings.slice(0, 50);
    showListings(firstFiftyListings);
  } catch (error) {
    messageElement.textContent =
      "The listings could not be loaded. Try opening the page with Live Server.";
    messageElement.className = "alert alert-danger";
    messageElement.hidden = false;
    console.error(error);
  }
}

searchInput.addEventListener("input", searchListings);
minPriceInput.addEventListener("input", searchListings);
maxPriceInput.addEventListener("input", searchListings);
loadListings();
