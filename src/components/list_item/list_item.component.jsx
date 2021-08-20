import { useState } from 'react'
import './list_item.styles.scss'

// just the component that represents a list item in the modal
const ListItem = ({
    countryCode,
    currencyAbreviation,
    currencyFullName,
    chosenCurrencies,
    setChosenCurrencies
})=> {
    // the state that stores if the list item is chosen or not 
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