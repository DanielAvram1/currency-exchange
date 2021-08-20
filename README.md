# You can see the app here
https://danielavram1.github.io/currency-exchange/

I am not totally sure if github runs the app only as a static application, but it's more than enough to see how the app's UI and logic works.





# A simplified structure of the app's components

- App
    - CurrencyListContext.Provider
        - Main
            - Header
            - CurrentCurrencyContext.Provider
                - CurrencyCard
        - AddCurrencyButton
        - Modal
            - ListItem
            - AddCurrencyButton
            
        