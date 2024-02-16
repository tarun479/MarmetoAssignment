document.getElementById('header-burger').onclick = function() {
    document.getElementById('header-burger').classList.toggle('active');
    document.getElementById('header-menu').classList.toggle('active');
    document.body.classList.toggle('lock');
  }

document.getElementById('header-menu').onclick = function() {
    document.getElementById('header-burger').classList.remove('active');
    document.getElementById('header-menu').classList.remove('active');
    document.body.classList.remove('lock');
  }



  document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchProducts();
    }
  });
  
  function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    fetch('https://products-api-2ttf.onrender.com/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        const filteredProducts = data.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        displaySearchResults(filteredProducts);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  function displaySearchResults(products) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';
  
    if (products.length === 0) {
      searchResultsDiv.innerHTML = 'No products found.';
      return;
    }
  
    const ul = document.createElement('ul');
    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product.name;
      ul.appendChild(li);
    });
    searchResultsDiv.appendChild(ul);
  }
  