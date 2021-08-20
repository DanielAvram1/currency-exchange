import {useContext, useEffect, useState} from 'react'
import './currency_card.styles.scss'
import {CurrencyListContext, CurrentCurrencyContext} from '../../App'

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
    const {currentCurrency, setCurrentCurrency} = useContext(CurrentCurrencyContext)
    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)
    const [value, setValue] = useState(0)

    const getValue = ()=> {
        const val = (currentCurrency.value * currentCurrency.rate[currencyAbreviation])
        if(currentCurrency.currencyAbreviation === currencyAbreviation){
            console.log(value)
            return value
        }
        else {
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
                setValue(newValue.toFixed(2))
            }
                
                
            }
            
        >
            <div className='button-container'>

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