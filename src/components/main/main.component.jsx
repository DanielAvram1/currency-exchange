
import Header from '../header/header.component'
import CurrencyCard from '../currency_card/currency_card.component'
import { CurrencyListContext} from '../../App'
import { useContext, useEffect, useState, createContext } from 'react'
import './main.styles.scss'

// the context for storing the Base Currency- the one that was clicked
export const CurrentCurrencyContext = createContext(null)

// the component that contains the header and the currency grid
const Main = () => {

    // the need in the currencyList from its context is for setting the first 
    // currentCurrency, being by default the first element.
    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)
    const [currentCurrency, setCurrentCurrency] = useState({...currencyList[0], value: 0})
    
    useEffect(() => {
        setCurrentCurrency(currencyList[0])
    }, [])

    return (
        <div className='main'>
            {/* the header */}
            <Header />
            {/* the grid with the currency cards.
                They all share the info of which currency is currenlty
                the base currency, that's why the grid is wrapped in the context. */}
            <CurrentCurrencyContext.Provider value={{currentCurrency, setCurrentCurrency}}>
            <div className='currency-grid'>
                {currencyList.filter((currency) => currency.added).map((currency) =>
                
                <CurrencyCard
                    key = {currency.currencyAbreviation}

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
    )
}

export default Main