const APIKey = (() => {
    const key = '9fd870113b9a4c77a8494435230507'

    const getAPIKey = () => {
        return key
    }

    return { getAPIKey }
})()

const APIgetterModule = (() => {

    const buildRequestURL = (whatUserWantsToDo, key, query) => {
        return `https://api.weatherapi.com/v1/${whatUserWantsToDo}.json?key=${key}&q=${query}`
    }

    const getAutocompleteLocations = (arrayOfObjects) => {
        return arrayOfObjects.map((obj) => obj.name)
    }

    async function getAutocompleteOptions(currentInput) {
        const APIKey = getAPIKey();
        const endpoint = buildRequestURL(search, APIKey, currentInput)
        try {
            const response = await fetch(endpoint, { mode: 'cors'})
            //if response body is empty just get through with it
            const data = getAutocompleteLocations(await response.json());
            return data
        } catch (error) {
            return null
        }
    }

    async function getData(location) {
        const APIKey = getAPIKey();
        const endpoint = buildRequestURL(current, APIKey, location)
        try {
            const response = await fetch(endpoint, { mode: 'cors'})
            ///put error handling here
            const data = (/* insert function here*/)
            return data
        } catch {
            return 
        }
    }
})()