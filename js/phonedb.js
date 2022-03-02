// messages
document.getElementById('error-message').style.display = 'none';
document.getElementById('blank-message').style.display = 'none';
document.getElementById('no-result-message').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        document.getElementById('blank-message').style.display = 'block';
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        const productlDetails = document.getElementById('product-details');
        productlDetails.textContent = '';
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('blank-message').style.display = 'none';
        document.getElementById('no-result-message').style.display = 'none';
        // load data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error))
    }

}
// error message check
const displayError = error => {
    console.log(error);
    document.getElementById('error-message').style.display = 'block';
}


const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const productlDetails = document.getElementById('product-details');
    productlDetails.textContent = '';
    if (phones.length == 0) {
        // show no result found
        document.getElementById('no-result-message').style.display = 'block';
    } else {
        document.getElementById('no-result-message').style.display = 'none';
    }
    let phone_slice = phones.slice(0, 20);
    phone_slice.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card">
                                   <img style="width: 70%" src="${phone.image}" class="card-img-top" alt="...">
                                   <div class="card-body">
                                   <h5 class="card-title">Name : ${phone.phone_name}</h5>
                                   <h5 class="card-title">Brand : ${phone.brand}</h5>
                                   <a  onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Details</a>
                               </div>`;
        searchResult.appendChild(div);
    });
}

const loadPhoneDetail = searchId => {
    const url = `https://openapi.programming-hero.com/api/phone/${searchId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProductDetail(data.data))
}

const displayProductDetail = product => {
    const productlDetails = document.getElementById('product-details');
    productlDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `  <img src="${product.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Name : ${product.name}</h5>
              <h5 class="card-title">Release Date : ${product.releaseDate ? product.releaseDate : "Not Avalaible"
        }</h5 >
              <h5 class="card-title">Sensors : ${product.mainFeatures.sensors.join()}</h5>
              <h5 class='card-title'>${typeof product.others != 'undefined' ? "Others information : " : ""}</h5>
              <h6 class='card-title'> ${typeof product.others != 'undefined' ? "Bluetooth : " + product.others.Bluetooth : ""}</h6>
              <h6 class='card-title'>${typeof product.others != 'undefined' ? "GPS : " + product.others.GPS : ""}</h6>
              <h6 class='card-title'>${typeof product.others != 'undefined' ? "NFC : " + product.others.NFC : ""}</h6>
              <h6 class='card-title'>${typeof product.others != 'undefined' ? "Radio : " + product.others.Radio : ""}</h6>
              <h6 class='card-title'>${typeof product.others != 'undefined' ? "USB : " + product.others.USB : ""}</h6>
              <h5 class="card-title">Chipset : ${product.mainFeatures.chipSet}</h5>
              <h5 class="card-title">Memory : ${product.mainFeatures.memory}</h5>
              <h5 class="card-title">Storage : ${product.mainFeatures.storage}</h5>
              <h5 class="card-title">DisplaySize : ${product.mainFeatures.displaySize}</h5>
          </div > `;
    productlDetails.appendChild(div);
}
