document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Redirect to floogle.html if "floggle" is searched
    if (query === 'floggle') {
        window.location.href = 'websites/floogle.html';
        return;
    }

    // List of files to search
    const files = [
        'websites/floogle.html',
        'websites/cwfindex.html',
        'websites/shop1.html',
        'websites/shop2.html'
    ];

    files.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                if (data.toLowerCase().includes(query)) {
                    const resultItem = document.createElement('div');
                    resultItem.innerHTML = `<a href="${file}">${file}</a>`;
                    resultsDiv.appendChild(resultItem);
                }
            });
    });
});
