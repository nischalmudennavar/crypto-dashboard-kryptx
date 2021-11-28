import React from "react";
import ExchangeRate from "./ExchangeRate";
import { useState } from "react";
import axios from "axios";

function CurrencyConverter() {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "SHIB", "ADA"];
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  console.log(chosenPrimaryCurrency);
  console.log(chosenSecondaryCurrency);
  console.log(amount);

  const convert = () => {
    var options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: chosenPrimaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: chosenSecondaryCurrency,
      },
      headers: {
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": process.env.api_key,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setExchangeRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            amount
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency</td>
              <td>
                <input
                  type="number"
                  name="current-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={chosenPrimaryCurrency}
                  name="select currency"
                  onChange={(e) => {
                    setChosenPrimaryCurrency(e.target.value);
                  }}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>secondary Currency</td>
              <td>
                <input
                  type="number"
                  name="xchange-amount"
                  value={result}
                  disabled="true"
                />
              </td>
              <td>
                <select
                  value={chosenSecondaryCurrency}
                  name="select currency"
                  onChange={(e) => {
                    setChosenSecondaryCurrency(e.target.value);
                  }}
                >
                  {currencies.map((currency) => (
                    <option value={currency}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="convert" onClick={convert}>
          Convert
        </button>
      </div>
      <ExchangeRate exchangeRate={exchangeRate} />
    </div>
  );
}

export default CurrencyConverter;
