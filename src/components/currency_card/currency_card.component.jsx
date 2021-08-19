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

    const getValue = ()=> {
        const val = parseInt((currentCurrency.value / rate[currentCurrency.currencyAbreviation]), 10)
        if(currentCurrency.currencyAbreviation === currencyAbreviation){
            return val
        }
        else {
            return val.toFixed(2)
        }
    }

    console.log(currentCurrency.value)
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
                const newValue = parseInt((currentCurrency.value / rate[currentCurrency.currencyAbreviation]), 10).toFixed(2)
                setCurrentCurrency({
                    ...currentCurrency,
                    countryCode: countryCode, 
                    currencySign: currencySign, 
                    currencyAbreviation: currencyAbreviation, 
                    currencyFullName: currencyFullName,
                    value: newValue,
                    rate: rate
                    
                })}      
                
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
                            console.log(event.target.value)
                            setCurrentCurrency({
                                ...currentCurrency,
                                value: parseInt(event.target.value, 10)
                            })
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
                        1 {currentCurrency.currencyAbreviation} = {rate[currentCurrency.currencyAbreviation]} {currencyAbreviation}
                    </span>
                </div>
            </div>
            
        </div>
    )
}

export default CurrencyCard