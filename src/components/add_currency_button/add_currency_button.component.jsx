import './add_currency_button.styles.scss'

const AddCurrencyButton = ({
    onClick,
    show
})=> {
    if(!show){
        return null
    }

    return(
        <button className='add-currency'
          onClick = {onClick}
        >
          Add Currency
        </button>
    )
}
export default AddCurrencyButton