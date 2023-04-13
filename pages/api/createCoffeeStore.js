import { getMinifiedRecords, table } from "../../lib/airtable"

const createCoffeeStore = async (req, res) => {

    if (req.method === 'POST'){

        const {id, name, neighbourhood, address, imgUrl, voting} = req.body
        
        try {

            if (!id) { 
                res.status(400)
                res.json({ message: "Id is missing" })
            }

            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id=${id}`
            }).firstPage()

            if (findCoffeeStoreRecords.length !== 0) {
                const records = getMinifiedRecords(findCoffeeStoreRecords)
                res.json(records)
            } else {
                //create a record
                if (!name) { 
                    res.status(400)
                    res.json({ message: "Name is missing" })
                }

                const createRecords = table.create([
                    {
                        fields: { id, name, address, neighbourhood, voting, imgUrl }
                    }
                ])

                const records = getMinifiedRecords(createRecords)

                res.json(records)
                
            }
    
        } catch (error) {
            console.error('Error finding error', error)
            res.status(500)
            res.json({ message: "Error finding store", error })
        }

    }
}

export default createCoffeeStore