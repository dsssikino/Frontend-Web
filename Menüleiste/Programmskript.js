/* Programmfilter, Genre*/
document.getElementById('genre').addEventListener('change', function() {
    var selectedCategory = this.value;
    var products = document.getElementsByClassName('genre'); /* Class genre bei Filmen im genre parameter */
  
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
  
      if (selectedCategory === 'all' || product.classList.contains(selectedCategory)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    }
  });
/* Programmfilter, FSK*/
document.getElementById('fsk').addEventListener('change', function() {
    var selectedCategory = this.value;
    var products = document.getElementsByClassName('fsk'); /* Class FSK bei Filmen im fsk parameter */
  
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
  
      if (selectedCategory === 'all' || product.classList.contains(selectedCategory)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    }
  });  
  /* Pop up Fenster*/
  