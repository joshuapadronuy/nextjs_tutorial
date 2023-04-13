import {fetchCoffeeStores} from '../../lib/coffee-stores'

const getCoffeeStoresByLocation = async (req, res) => {
    const { latLong, limit } = req.query

    try {
        const response = await fetchCoffeeStores(latLong, limit)
        res.status(200);
        res.json(response)
    } catch (error) {
        console.error('There is an error', error)
        res.status(500);
        res.json({message: 'Oh no! Something went wrong', err})
    }

}

export default getCoffeeStoresByLocation