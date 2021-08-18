import { useState } from 'react'
import './list_item.styles.scss'

const ListItem = ({
    countryCode,
    currencyAbreviation,
    currencyFullName,
    chosenCurrencies,
    setChosenCurrencies
})=> {
    const [isChosen, setIsChosen] = useState(false)
    return (
        <div className={`list-item ${
            (isChosen) ? 'is-chosen' : ''
        }`}
            onClick={() => {
                if(isChosen) {
                    setIsChosen(false)
                    const newChosenCurrencies = chosenCurrencies.filter((abr) => 
                        abr != currencyAbreviation)
                    setChosenCurrencies(newChosenCurrencies)
                }
                else {
                    setIsChosen(true)
                    setChosenCurrencies([...chosenCurrencies, currencyAbreviation])
                }
            }}
        >
            <img className='flag' src={`https://www.countryflags.io/${countryCode}/flat/64.png`}/>
            <span>
                {currencyAbreviation} - {currencyFullName}
            </span>
        </div>
    )
}

export default ListItem