import './App.scss'
import AddCurrencyButton from './components/add_currency_button/add_currency_button.component'
import { useEffect, useState, createContext } from 'react'
import ModalAddCurrency from './components/modal_add_currency/modal_add_currency.component'
import CurrenciesData from './data/currencies.json'
import Main from './components/main/main.component'

// the context that stores the list of the currencies
export const CurrencyListContext = createContext([])

// the function that updates the currency list with the data from the API
export const updateCurrencyList = (currencyList, setCurrencyList) => {
  // I don't see any reasons to hide the key, as the API is free
  const apiKey = 'http://api.exchangeratesapi.io/v1/latest?access_key=cf96f408f3378112cdd0fbbcaec0a63c'
  fetch(apiKey)
  .then(res => res.json())
  .then(data => {
    setCurrencyList(currencyList.map((curr) => {
      // if the currency is Euro, then the data from API contains the rates for it.
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

// the main function, which also contains the main page, as it's the only one

const App = () => {
  
  // currencyList state represents the list of all currencies which are brought from 
  // the data/currencies.json. As the elements of the list contains only the main fields,
  // I have to also add the value field, which will be used for storing the value in the 
  // CurrencyCard input fields, as they act dynamically and all of the cards depends on the
  // base currency card- the CurrentCurrency. This state will be used for the CurrencyListContext,
  // used for Provider.
  const [currencyList, setCurrencyList] = useState(
    CurrenciesData.map(
      (curr) => {return {...curr, value: 0}}
    )
  )

  // showModal is a flag that indicates whether the modal with not-added currencies is displayed or not.
  const [showModal, setShowModal] = useState(false)

  // when mounting, call updateCurrencyList in order to get the "latest" exchange rates, BUT ONLY FOR EURO,
  // as the free version on the API allows the fetching only the rates for Euro. But even if the API
  // gets to the paid plan, it's not hard to refactor the code to work properly. Mainly, the changes
  // must be made only to the updateCurrencyList function.
  useEffect(() => {
    updateCurrencyList(currencyList, setCurrencyList)
  }, [])

  return (
    <div className='body'>
      {/* Both Main and ModalAddCurrency components depend on the CurrencyListContext, as it contains
          elements with the flag added, which is true if the currency is chosen and appears in the Main; 
          if it's false, it appears in the Modal's list. */}
      <CurrencyListContext.Provider value={{currencyList, setCurrencyList}}>
        
        <Main />
        {/* The button sets the shoModal to true and, respectively, "activates" the display of the Modal.  */}
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
