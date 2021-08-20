import './App.scss';
import AddCurrencyButton from './components/add_currency_button/add_currency_button.component'
import { useEffect, useState, createContext } from 'react';
import ModalAddCurrency from './components/modal_add_currency/modal_add_currency.component';
import CurrenciesData from './data/currencies.json'
import Main from './components/main/main.component';
// import {CurrencyListContext} from './contexts'


export const CurrentCurrencyContext = createContext(null)
export const CurrencyListContext = createContext([])

export const updateCurrencyList = (currencyList, setCurrencyList) => {
  fetch('http://api.exchangeratesapi.io/v1/latest?access_key=cf96f408f3378112cdd0fbbcaec0a63c')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    setCurrencyList(currencyList.map((curr) => {
      if(curr.currencyAbreviation === 'EUR'){
        return {
          ...curr,
          rate: data.rates
        }
      }
      else {
        return curr
      }
    }))
  })
}

function App() {
  
  
  const [currencyList, setCurrencyList] = useState(
    CurrenciesData.map(
      (curr) => {return {...curr, value: 0}}
    )
  )
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    updateCurrencyList(currencyList, setCurrencyList)
  }, [])

  return (
    <div className='body'>
      <CurrencyListContext.Provider value={{currencyList, setCurrencyList}}>
        
        <Main />
        <AddCurrencyButton 
          show={!showModal}
          onClick={()=>setShowModal(true)}
          lime
        />
        <ModalAddCurrency 
          show={showModal}
          goBackFunction={() => setShowModal(false)}
        />
      </CurrencyListContext.Provider>
    </div>
  )
}

export default App
