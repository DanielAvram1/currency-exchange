# You can see the app here
https://danielavram1.github.io/currency-exchange/

I am not totally sure if github runs the app only as a static application, but it's more than enough to see how the app's UI and logic work.

# To run the app on your PC

1. Clone the repository on your machine by typing this in the Terminal:

``git clone https://github.com/DanielAvram1/currency-exchange``

2. Go into the directory of the repository:

``cd currency-exchange``

3. Install the required dependencies:

``npm install``

4. Start the app:

``npm start``

# A note about the API

The free version of the API allows me to fetch the exchange rate only for Euro, and only once a day. Because of that, the app only updates dynamically the Euro's rate, but I wrote the code in a way to be easy to change the behavior for a full response from the API. 

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
            
        