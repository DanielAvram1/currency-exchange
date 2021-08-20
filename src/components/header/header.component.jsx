import { useContext, useEffect, useState } from "react"
import { CurrencyListContext, updateCurrencyList } from "../../App"

const updateTime = () => {
    const date = new Date()
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

// the header component. it only contains a h1 and a paragraph as a html element
const Header = () => {

    // the state used to store the displayed date 
    const [date, setDate] = useState(updateTime())
    // I need the currencyList here in order to update if the date has changed
    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)

    useEffect(() => {
        // this interval fires at every second. After one second, the date is updated,
        // if the new date differs from the new one, then a whole day has passed 
        // which means that there a updated rate on the API server, so we update the
        // currency list. 
        const interval = setInterval(() => {
            const newDate = updateTime()
            if(newDate != date){
                updateCurrencyList(currencyList, setCurrencyList)
            }
            setDate(newDate)
            console.log('tick')
        }, 1000)
        // the callback when the component is unmounted which will clear the interval
        return () => clearInterval(interval)
    }, 
        // the function inside useEffect will be called everytime date is update,
        // which actually happens inside that function, so the function will trigger
        // itself recursively every one second.   
        [date])

    return (
        <div>
            <h1>Currency Exchange</h1>
            <p>{date}</p>
        </div>
    )
}

export default Header