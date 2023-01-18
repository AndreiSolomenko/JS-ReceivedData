function renderCurrencys(currencys) {

  let htmlStr = currencys.map(function(currency) {
    return `<tr>
      <td>${currency.r030}</td>
      <td>${currency.txt}</td>
      <td>${currency.rate}</td>
      <td>${currency.cc}</td>
      <td>${currency.exchangedate}</td>
 </tr>`;
  }).join('');

  document.getElementById('currencys-tbody').innerHTML = htmlStr;
}

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20230117&json').then(function(data) {
  return data.json();
}).then(function(data) {

  const currencys = data.map(function(currency) {
    return {
      r030: currency?.r030,
      txt: currency?.txt,
      rate: currency?.rate.toFixed(2),
      cc: currency?.cc,
      exchangedate: currency?.exchangedate
    }
  });

  renderCurrencys(currencys);

})