function createStorage() {
  let currenciesBackup = [];

  return {
    getCurrencies: function() {
      return currenciesBackup;
    },
    setCurrencies: function(newCurrencies) {
      currenciesBackup = newCurrencies;
    }
  }
}

const storage = createStorage();

function renderCurrencies(currencies) {
  let htmlStr = currencies.reduce(function(acc, currency, r030) {
    return acc + `<tr>
      <td>${currency.r030}</td>
      <td>${currency.txt}</td>
      <td>${currency.rate.toFixed(2)}</td>
      <td>${currency.cc}</td>
      <td>${currency.exchangedate}</td>
 </tr>`;
  }, '');

  document.getElementById('currencies-tbody').innerHTML = htmlStr;
}

function getData(date) {
  fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + date + '&json').then(function(data) {
  return data.json();
  }).then(function(data) {
  storage.setCurrencies(data);
  renderCurrencies(data);
  })

}

getData('20230117');

document.getElementById('searchDate').onchange = function(e) {
  getData(e.currentTarget.value.replaceAll('-', ''));
}

document.getElementById('search').onkeyup = function(e) {
  const currentSearch = e.currentTarget.value.toLowerCase().trim();
  const backup = storage.getCurrencies();
  const filteredCurrencies = backup.filter(function(currency) {
    return currency.txt.toLowerCase().includes(currentSearch);
  })
  renderCurrencies(filteredCurrencies);
}