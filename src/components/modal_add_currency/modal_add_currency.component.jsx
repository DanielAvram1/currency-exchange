import { useContext, useState } from 'react'
import { CurrencyListContext } from '../../App'
import AddCurrencyButton from '../add_currency_button/add_currency_button.component'
import ListItem from '../list_item/list_item.component'
import './modal_add_currency.styles.scss'

// the Modal component which contains the list of all the not-added currencies
// and renders on the top of the Main
const ModalAddCurrency = ({show, goBackFunction })=> {
    // we need the currencyList in order to filter all the not-added currencies from it
    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)
    // just a list of currency Abreviations that stores the selected ones.
    const [chosenCurrencies, setChosenCurrencies] = useState([])

    if(!show){
        return null
    }
    
    return (
        <div className='modal'
            onClick={goBackFunction}
        >
            <div className='modal-content'
                onClick={e => e.stopPropagation()}
            >
                <div className='currency-list'>
                    {currencyList.filter((currency) => !currency.added)
                    .map((currency) => (
                        <ListItem 
                            countryCode={currency.countryCode}
                            currencyAbreviation={currency.currencyAbreviation}
                            currencyFullName={currency.currencyFullName}
                            chosenCurrencies={chosenCurrencies}
                            setChosenCurrencies={setChosenCurrencies}

                        />
                    ))
                    }
                </div>

            </div>
            {/* a new button is rendered because it contains a different functionality when clicked */}
            <AddCurrencyButton 
                show={true}
                red
                // when clicked, all the selected currencies become added, the currency list is updated,
                // and the goBackFunction is fired
                onClick={() => {
                    const newCurrencyList = currencyList.map((curr) => {
                        if(chosenCurrencies.includes(curr.currencyAbreviation)) {
                            return {...curr, added: true}
                        }
                        return curr
                        
                    })
                    setCurrencyList(newCurrencyList)
                    goBackFunction()
                }}
            />
        </div>
    )
}

export default ModalAddCurrency