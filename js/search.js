document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired'); // Debugging log

    const searchForm = document.getElementById('searchForm');
    const searchQueryInput = document.getElementById('searchQuery');

    // Populate the search query input with the current search query
    const currentQuery = localStorage.getItem('searchQuery');
    if (currentQuery) {
        searchQueryInput.value = currentQuery;
    }

    if (searchForm && searchQueryInput) {
        console.log('Form and input elements found'); // Debugging log

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = searchQueryInput.value.toLowerCase();
            console.log('Form submitted with query:', query); // Debugging log

            if (query.trim() !== '') {
                localStorage.setItem('searchQuery', query);
                window.location.href = 'search-results.html';
            } else {
                console.log('Empty search query'); // Debugging log
            }
        });

        // Function to handle "Return" key submission
        searchQueryInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchForm.submit();
            }
        });
    } else {
        console.error('Form or input elements not found'); // Debugging log
    }

    // Function to display search results on the search-results.html page
    if (window.location.pathname.endsWith('search-results.html')) {
        const query = localStorage.getItem('searchQuery');
        console.log('Loaded search query:', query); // Debugging log

        if (query && query.trim() !== '') {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            // List of files to search with their metadata
            const files = [
                {
                    file: 'websites/cwf/cwfindex.html',
                    title: 'CWF - THE REAL ONE',
                    description: 'The home of outdated Wrestling.',
                    address: 'columbuswrestlingfederation.cum/mainindex.html'
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
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Network response was not ok: ${response.statusText}`);
                        }
                        return response.text();
                    })
                    .then(data => {
                        // Extract metadata from the HTML content
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(data, 'text/html');
                        const title = doc.querySelector('title') ? doc.querySelector('title').innerText.toLowerCase() : '';
                        const description = doc.querySelector('meta[name="description"]') ? doc.querySelector('meta[name="description"]').getAttribute('content') : '';

                        // Check if the query matches the title or description
                        if (title.includes(query) || description.toLowerCase().includes(query)) {
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
                            console.log('Result added:', fileData.title); // Debugging log
                        } else {
                            console.log('No match for:', fileData.title); // Debugging log
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error); // Debugging log for fetch errors
                    });
            });
        } else {
            console.log('No search query found'); // Debugging log
        }
    }
});
