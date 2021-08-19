import './add_currency_button.styles.scss'

const AddCurrencyButton = ({
    onClick,
    show,
    red,
    lime
})=> {
    if(!show){
        return null
    }

    var styleString = 'add-currency'
    if(red) {
      styleString += ' red'
    }
    if(lime) {
      styleString += ' lime'
    }

    return(
        <button className={styleString}
          onClick = {onClick}
        >
          Add Currency
        </button>
    )
}
export default AddCurrencyButton