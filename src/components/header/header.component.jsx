import { useContext, useEffect, useState } from "react"
import { CurrencyListContext, updateCurrencyList } from "../../App"

const updateTime = () => {
    const date = new Date()
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

const Header = () => {

    const [date, setDate] = useState(updateTime())
    const {currencyList, setCurrencyList} = useContext(CurrencyListContext)

    useEffect(() => {
        const interval = setInterval(() => {
            const newDate = updateTime()
            if(newDate != date){
                setDate(newDate)
                updateCurrencyList(currencyList, setCurrencyList)

            }
            setDate(updateTime())
            console.log('tick')
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <h1>Currency Exchange</h1>
            <p>{date}</p>
        </div>
    )
}

export default Header