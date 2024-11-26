document.addEventListener('DOMContentLoaded', () => {
    const stockInput = document.getElementById('stock-input');
    const addStockButton = document.getElementById('add-stock-button');
    const watchlistElement = document.getElementById('watchlist');
    const stockDetailsElement = document.getElementById('stock-details');

    // Load watchlist from local storage
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    renderWatchlist();

    // Add stock to watchlist
    addStockButton.addEventListener('click', () => {
        const stock = stockInput.value.trim().toUpperCase();
        if (stock && !watchlist.includes(stock)) {
            watchlist.push(stock);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            renderWatchlist();
        }
        stockInput.value = '';
    });

    // Render watchlist
    function renderWatchlist() {
        watchlistElement.innerHTML = '';
        watchlist.forEach(stock => {
            const li = document.createElement('li');
            li.textContent = stock;
            li.addEventListener('click', () => {
                fetchStockData(stock);
            });
            watchlistElement.appendChild(li);
        });
    }

    // Fetch stock data (dummy function)
    async function fetchStockData(stockSymbol) {
        // Placeholder for actual API request
        stockDetailsElement.textContent = `Fetching data for ${stockSymbol}...`;
        try {
            // Replace with actual API call
            const response = await fetch(`https://api.example.com/stock/${stockSymbol}?apikey=YOUR_API_KEY`);
            const data = await response.json();
            displayStockData(data);
        } catch (error) {
            stockDetailsElement.textContent = 'Error fetching stock data.';
        }
    }

    // Display stock data
    function displayStockData(data) {
        stockDetailsElement.innerHTML = `
            <p>Stock: ${data.symbol}</p>
            <p>Price: $${data.price}</p>
            <p>Change: ${data.change}%</p>
        `;
    }
});

