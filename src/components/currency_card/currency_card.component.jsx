import {useContext, useEffect, useState} from 'react'
import './currency_card.styles.scss'
import {CurrencyListContext} from '../../App'
import {CurrentCurrencyContext} from '../main/main.component'

// the component which represent the card with the info about
// the currency and the input field.
const CurrencyCard = (
    {
        countryCode, 
        currencySign, 
        currencyAbreviation, 
        currencyFullName,
        rate
    }
) => 
{  
    // we need the currentCurrency in every card in order to update respectively
    // the exchange rate with the Base currency and to update the input value
    const {currentCurrency, setCurrentCurrency} = useContext(CurrentCurrencyContext)
    // the currencyList also contains the value inside the inputs of every cards,
    // so we need the access to it in every card in order to update it in case we change
    // the input in the Base Currency and after that we click on other card and change
    // the Base currency.
    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)
    // yet we need a separate value state, 'cause the input of the Base Currency 
    // behaves differently than the other inputs.
    const [value, setValue] = useState(0)
    // the function that return the value of the input differently if the currency is base
    // or not.
    const getValue = ()=> {
        
        if(currentCurrency.currencyAbreviation === currencyAbreviation){
            // if we are in the Base Currency, we display the value as it is
            return value
        }
        else {
            // if we are not in the base, we calculate the value using the base currency rate
            const val = (currentCurrency.value * currentCurrency.rate[currencyAbreviation])
            // and display it only with 2 digits
            return val.toFixed(2)
        }
    }

    return( 
        <div 
            className={`card ${
                (currentCurrency.currencyAbreviation === currencyAbreviation) 
                ? 
                'isSelected'
                :
                ''
            }`}
            // if we click on the card, the base currency is changed, 
            // so we set a new currentCurrency but we keep the value from the input field
            onClick = {() => {
                const newValue = (currentCurrency.value * currentCurrency.rate[currencyAbreviation])
                setCurrentCurrency({
                    ...currentCurrency,
                    countryCode: countryCode, 
                    currencySign: currencySign, 
                    currencyAbreviation: currencyAbreviation, 
                    currencyFullName: currencyFullName,
                    value: newValue,
                    rate: rate
                    
                })
                // we don't forget to truncate it to only 2 zecimals
                setValue(newValue.toFixed(2))
            }
                
                
            }
            
        >
            <div className='button-container'>
                {/* the X button that set the flag "added" to false,
                    which eliminates the card from the Main. */}
                <button
                    onClick={ () =>
                        setCurrencyList(currencyList.map((curr) => {
                            if(curr.currencyAbreviation == currencyAbreviation){
                                return {...curr, added: false}
                            }
                            return curr
                        }))
                    }
                >X</button>
            </div>
            <div className='row'>
                <div className='col-30'>
                    <img src = {`https://www.countryflags.io/${countryCode}/flat/64.png`}  className='flag'/>
                    <p>{currencySign} </p>
                </div>

                <div className='col-70'>
                    <input 
                        type='number' 
                        value={getValue()}  
                        // on every change of the input, we set the currentCurrency to a new value, which
                        // triggers the rerendering of all the other cards and their input values.
                        onChange = {(event) => {
                            setCurrentCurrency({
                                ...currentCurrency,
                                value: event.target.value
                            })
                            setValue(event.target.value)
                        }}
                    />
                </div>

            </div>

            <div className='row'>
                <div className='col-30' />
                <div className='col-70 info'>
                    <span>
                    {currencyAbreviation} - {currencyFullName}
                    </span>
                    <span>
                        1 {currentCurrency.currencyAbreviation} = {currentCurrency.rate[currencyAbreviation].toFixed(2)} {currencyAbreviation}
                    </span>
                </div>
            </div>
            
        </div>
    )
}

export default CurrencyCard