document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    const searchHistoryList = document.getElementById('searchHistoryList');

    // Load search history when the page loads
    renderSearchHistory();

    // Add event listener for the search button
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            saveSearchTerm(searchTerm);
            renderSearchHistory();
            searchInput.value = '';  // Clear the input field after saving
        }
    });

    // Add event listener for clearing the entire history
    clearHistoryButton.addEventListener('click', () => {
        clearSearchHistory();
        renderSearchHistory();
    });

    // Save a search term to localStorage
    function saveSearchTerm(term) {
        let searchHistory = getSearchHistory();
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    // Retrieve search history from localStorage
    function getSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory')) || [];
    }

    // Render the search history on the page, each with a delete button
    function renderSearchHistory() {
        let searchHistory = getSearchHistory();
        searchHistoryList.innerHTML = '';  // Clear the current list

        if (searchHistory.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'No search history available.';
            emptyMessage.classList.add('empty-message');
            searchHistoryList.appendChild(emptyMessage);
        } else {
            searchHistory.forEach((term, index) => {
                const li = document.createElement('li');
                li.textContent = term;

                // Create the delete button for each search term
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', function () {
                    deleteSearchTerm(index);
                });

                li.appendChild(deleteButton);
                searchHistoryList.appendChild(li);
            });
        }
    }

    // Delete a specific search term based on its index
    function deleteSearchTerm(index) {
        let searchHistory = getSearchHistory();
        searchHistory.splice(index, 1);  // Remove the item at the specified index
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderSearchHistory();  // Re-render the updated list
    }

    // Clear all search history from localStorage
    function clearSearchHistory() {
        localStorage.removeItem('searchHistory');
    }
});
