const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let initialCount = 10;
let isInitialLoad = true;
const accessKey = 'PRSpH5StVJY6Em8y4szKqmxcF_mcOuSXvAkHseic9UU';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${initialCount}`;

function updateApiCount(newCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${newCount}`;
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description ? photo.alt_description : "Untitled",
            title: photo.alt_description ? photo.alt_description : "Untitled",
        })
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.append(item);
    });
}

// Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateApiCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        // Catch error
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight- 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();