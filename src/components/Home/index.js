import "./style.css";

import { Input } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Card, Icon, Image , Button} from 'semantic-ui-react'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ setSearch, loadData, response }) {
    const [allPaysData, setAllPaysData] = useState([]);
    const [numPays,setNumPays] = useState(15)


    const searchSubmit = (event) => {
        event.preventDefault()
        loadData()
    }

    if (response !== undefined) {
        console.log(response)
    }

    const options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 },
    ]

    useEffect(async () => {
        try {
            const responseDataPaysAll = await axios.get(`https://restcountries.com/v3.1/all`)
            setAllPaysData(responseDataPaysAll.data)
        }
        catch (error) {
            console.log(error)
        }

    }, [])

    const loadMoreFunc =  () =>  {
        setNumPays(numPays + 15)
    }

    

    const slice = allPaysData.slice(0, numPays)


    return (
        <main>
            <div id="home">
                <form className="search-pays" onSubmit={searchSubmit}>
                    <Input className="input-search-a1" icon='search' size='big' placeholder=' Search for a country...' iconPosition='left' onChange={e => (setSearch(e.target.value))} />
                    <Dropdown clearable options={options} selection placeholder='Filter By region' />
                </form>
                <div className="box--cards">
                    {slice.map((pays,index) => (
                        <Card className="card" key={index}>
                            <Image src={pays.flags.png} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{pays.altSpellings[1]}</Card.Header>
                                <Card.Description>
                                    <p>Population :  {pays.population}</p>
                                    <p>Region :  {pays.region}</p>
                                    <p>Capital :  {pays.capital}</p>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </div>

                <div className="load-more">
                    <Button className="button-white" onClick={() => loadMoreFunc()} content='Load More' />
                </div>
            </div>
        </main>
    )
}