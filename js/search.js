document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.toLowerCase();
    if (query === 'floggle') {
        window.location.href = 'websites/floogle.html';
    } else {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'search-results.html';
    }
});

// Function to handle "Return" key submission
document.getElementById('searchQuery').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchForm').submit();
    }
});

// Function to display search results on the search-results.html page
window.addEventListener('load', function() {
    const query = localStorage.getItem('searchQuery');
    if (query) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        // List of files to search with their metadata
        const files = [
            {
                file: 'websites/blog1.html',
                title: 'Blog 1 Title',
                description: 'This is the description for Blog 1.',
                address: 'www.blog1.innernette'
            },
            {
                file: 'websites/blog2.html',
                title: 'Blog 2 Title',
                description: 'This is the description for Blog 2.',
                address: 'www.blog2.innernette'
            },
            {
                file: 'websites/shop1.html',
                title: 'Shop 1 Title',
                description: 'This is the description for Shop 1.',
                address: 'www.shop1.innernette'
            },
            {
                file: 'websites/shop2.html',
                title: 'Shop 2 Title',
                description: 'This is the description for Shop 2.',
                address: 'www.shop2.innernette'
            }
        ];

        files.forEach(fileData => {
            fetch(fileData.file)
                .then(response => response.text())
                .then(data => {
                    if (data.toLowerCase().includes(query)) {
                        const resultItem = document.createElement('div');
                        resultItem.innerHTML = `
                            <div>
                                <strong>${fileData.title}</strong>
                                <p>${fileData.description}</p>
                                <small>${fileData.address}</small>
                            </div>
                            <hr>
                        `;
                        resultsDiv.appendChild(resultItem);
                    }
                });
        });
    }
});
