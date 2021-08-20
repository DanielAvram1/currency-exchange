
import Header from '../header/header.component'
import CurrencyCard from '../currency_card/currency_card.component'
import {CurrentCurrencyContext, CurrencyListContext} from '../../App'
import { useContext, useEffect, useState } from 'react'
import './main.styles.scss'

const Main = () => {

    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)
    const [currentCurrency, setCurrentCurrency] = useState({...currencyList[0], value: 0})
    
    
    //console.log(currencyList)
    useEffect(() => {
        console.log(currencyList[0])
        setCurrentCurrency(currencyList[0])
    }, [])

    return (
        <div className='main'>
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
            
        </div>
    )
}

export default Main