import logo from './logo.svg';
import './App.scss';
import CurrencyCard from './components/currency_card/currency_card.component';
import Header from './components/header/header.component';
import { createContext, useState } from 'react';

const currencies = [
  {
    countryCode: 'eu',
    currencyAbreviation: 'EUR',
    currencyFullName: 'Euro',
    currencySign: '$',
    value: 0,
    rate: {
      'EUR': 1,
      'USD': 1.17,
      'RUB': 86.26,
      'GBP': 0.85,
      'JPY': 128,
      'AUD': 1.61
    }
  },
  {
    countryCode: 'us',
    currencyAbreviation: 'USD',
    currencyFullName: 'US Dollar',
    currencySign: '$',
    value: 0,
    rate: {
      'EUR': 0.85,
      'USD': 1,
      'RUB': 73.61,
      'GBP': 0.72,
      'JPY': 109,
      'AUD': 1.37
    }
  },
  {
    countryCode: 'ru',
    currencyAbreviation: 'RUB',
    currencyFullName: 'Russian Ruble',
    currencySign: '$',
    value: 0,
    rate: {
      'EUR': 0.01,
      'USD': 0.01,
      'RUB': 1,
      'GBP': 0.01,
      'JPY': 1,
      'AUD': 0.01
    }
  },
  {
    countryCode: 'gb',
    currencyAbreviation: 'GBP',
    currencyFullName: 'British Pound',
    currencySign: '$',
    value: 0,
    rate: {
      'EUR': 1.17,
      'USD': 1.37,
      'RUB': 101.13,
      'GBP': 1,
      'JPY': 150,
      'AUD': 1.89
    }
    
  },
  {
    countryCode: 'jp',
    currencyAbreviation: 'JPY',
    currencyFullName: 'Japanese Yen',
    currencySign: '$',
    value: 0,
    rate: {
      'EUR': 0.01,
      'USD': 0.01,
      'GBP': 0.01,
      'RUB': 1,
      'JPY': 1,
      'AUD': 0.01
    }
  },
  {
    countryCode: 'au',
    currencyAbreviation: 'AUD',
    currencyFullName: 'Australian Dollar',
    currencySign: '$',
    value: 0,
    rate: {
      'EUR': 0.61,
      'USD': 0.72,
      'RUB': 53.41,
      'JPY': 79,
      'GBP': 0.52,
      'AUD': 1
    }
  },
]

export const CurrentCurrencyContext = createContext();

function App() {
  
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);

  return (
    <div className='body'>
      <Header />
      <CurrentCurrencyContext.Provider value={{currentCurrency, setCurrentCurrency}}>
        <div className='currency-grid'>
          {currencies.map((currency) =>
            
          
            <CurrencyCard 
              countryCode = {currency.countryCode}
              currencyAbreviation = {currency.currencyAbreviation}
              currencyFullName = {currency.currencyFullName}
              currencySign = {currency.currencySign}
              value = {currency.value}
              rate = {currency.rate}
              
            />
          )}
        </div>
      </CurrentCurrencyContext.Provider>
      
      
    </div>
  );
}

export default App;
