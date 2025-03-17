document.addEventListener("DOMContentLoaded", function () {
    const fetchHadithButton = document.getElementById("fetch-hadith");
    const hadithText = document.getElementById("hadith-text");
    const hadithSource = document.getElementById("hadith-source");
    const hadithBook = document.getElementById("hadith-book");
    const searchBox = document.getElementById("search-box");
    const saveFavoriteButton = document.getElementById("save-favorite");
    const favoritesList = document.getElementById("favorites-list");
    const toggleDarkModeButton = document.getElementById("toggle-dark-mode");

    const apiKey = "$2y$10$s62j5VKKoJcPSiE9GqAwSeVe8lOxIPq0FIdkhtWnTveKo49RqY5u"; // Replace with your actual API key
    const baseUrl = "https://hadithapi.com/api/hadiths";

    fetchHadithButton.addEventListener("click", async () => {
        try {
            const book = hadithBook.value;
            const searchQuery = searchBox.value.trim();

            let url = `${baseUrl}?apiKey=${apiKey}`;
            if (book) url += `&book=${book}`;
            if (searchQuery) url += `&hadithEnglish=${encodeURIComponent(searchQuery)}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.hadiths && data.hadiths.length > 0) {
                const hadith = data.hadiths[Math.floor(Math.random() * data.hadiths.length)];
                hadithText.textContent = hadith.hadithEnglish;
                hadithSource.textContent = `📚 ${hadith.book.name}, Hadith No: ${hadith.hadithNumber}`;
            } else {
                hadithText.textContent = "No Hadith found.";
                hadithSource.textContent = "";
            }
        } catch (error) {
            console.error("Error fetching hadith:", error);
            hadithText.textContent = "Error fetching Hadith. Please try again.";
        }
    });

    saveFavoriteButton.addEventListener("click", () => {
        if (hadithText.textContent !== "Click the button to fetch a Hadith.") {
            const listItem = document.createElement("li");
            listItem.textContent = hadithText.textContent;
            favoritesList.appendChild(listItem);
        }
    });

    toggleDarkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});