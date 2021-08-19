import logo from './logo.svg';
import './App.scss';
import CurrencyCard from './components/currency_card/currency_card.component';
import AddCurrencyButton from './components/add_currency_button/add_currency_button.component'
import Header from './components/header/header.component';
import { createContext, useState } from 'react';
import ModalAddCurrency from './components/modal_add_currency/modal_add_currency.component';


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
    },
    added: true,
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
    },
    added: true
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
    },
    added: false
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
    },
    added: false
    
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
    },
    added: false
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
    },
    added: true
  },
  
]

export const CurrentCurrencyContext = createContext()
export const CurrencyListContext = createContext()

function App() {
  
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0])
  const [currencyList, setCurrencyList] = useState(currencies)
  const [showModal, setShowModal] = useState(false)

  return (
    <CurrencyListContext.Provider value={{currencyList, setCurrencyList}}>
      <div className='body'>
        <Header />
        <CurrentCurrencyContext.Provider value={{currentCurrency, setCurrentCurrency}}>
          <div className='currency-grid'>
            {currencyList.filter((currency) => currency.added).map((currency) =>
              
            
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
        <AddCurrencyButton 
          show={!showModal}
          onClick={()=>setShowModal(true)}
          lime
        />
        
        <ModalAddCurrency 
          show={showModal}
          goBackFunction={() => setShowModal(false)}
        />
      </div>
    </CurrencyListContext.Provider>
  )
}

export default App
