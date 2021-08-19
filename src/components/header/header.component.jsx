import { useEffect, useState } from "react"

const updateTime = () => {
    const date = new Date()
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} : ${date.getSeconds()}m`
}

const Header = () => {

    const [date, setDate] = useState(updateTime())

    useEffect(() => {
        const interval = setInterval(() => {
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