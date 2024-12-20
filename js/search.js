document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // List of files to search
    const files = [
        'websites/blog1.html',
        'websites/blog2.html',
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
