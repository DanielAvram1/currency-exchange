import { useContext, useState } from 'react'
import { CurrencyListContext } from '../../App'
import AddCurrencyButton from '../add_currency_button/add_currency_button.component'
import ListItem from '../list_item/list_item.component'
import './modal_add_currency.styles.scss'

const ModalAddCurrency = ({show, goBackFunction })=> {

    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)
    const [chosenCurrencies, setChosenCurrencies] = useState([])
    if(!show)
        return null

    return (
        <div className='modal'>
            <div className='modal-content'>
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
            <AddCurrencyButton 
                show={true}
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