document.addEventListener("DOMContentLoaded", function () {
    const fetchHadithButton = document.getElementById("fetch-hadith");
    const hadithText = document.getElementById("hadith-text");
    const hadithSource = document.getElementById("hadith-source");
    const hadithCollection = document.getElementById("hadith-collection");
    const searchBox = document.getElementById("search-box");
    const favoriteButton = document.getElementById("favorite-btn");
    const favoritesList = document.getElementById("favorites-list");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    fetchHadithButton.addEventListener("click", async () => {
        try {
            const response = await fetchHadith(hadithCollection.value);
            hadithText.textContent = response.hadith;
            hadithSource.textContent = `Source: ${response.source}`;
        } catch (error) {
            hadithText.textContent = "Error fetching hadith. Please try again.";
        }
    });

    favoriteButton.addEventListener("click", () => {
        if (hadithText.textContent !== "Click the button to fetch a random Hadith.") {
            const listItem = document.createElement("li");
            listItem.textContent = hadithText.textContent;
            favoritesList.appendChild(listItem);
        }
    });

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    async function fetchHadith(collection) {
        const axiosOptions = {
            method: "GET",
            url: `https://hadith2.p.rapidapi.com/${collection}/3/17`, // Example API
            headers: {
                "x-rapidapi-key": "YOUR_RAPIDAPI_KEY", // Replace with your actual API key
                "x-rapidapi-host": "hadith2.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(axiosOptions);
            return {
                hadith: response.data.hadith,
                source: `${collection.toUpperCase()} ${response.data.chapter}:${response.data.number}`,
            };
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
});
