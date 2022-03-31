import "./style.css";

import { Input } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Card, Image, Button } from 'semantic-ui-react'
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

export default function Home() {
    const [allPaysData, setAllPaysData] = useState([]);
    const [numPays, setNumPays] = useState(15);
    const [search, setSearch] = useState();

    const [switchRegPays, setSwitchRegPays] = useState("");

    const slice = allPaysData.slice(0, numPays)

    

    const options = [
        { key: 2, text: 'Europe', value: 1 },
        { key: 3, text: 'Africa', value: 2 },
        { key: 4, text: 'America', value: 3 },
        { key: 5, text: 'Asia', value: 4 },
        { key: 6, text: 'Oceania', value: 5 },
    ]


    const getAllPays = async () => {
        const responseDataPaysAll = await axios.get(`https://restcountries.com/v3.1/all`)
        setAllPaysData(responseDataPaysAll.data)
    }

    const getRegions = async () => {
        const responseDataPays = await axios.get(`https://restcountries.com/v3.1/region/${switchRegPays}`)
        setAllPaysData(responseDataPays.data)
    }


    useEffect(async () => {
        try {
            if (switchRegPays === "") {
                getAllPays()
            }

            else {
                getRegions()
            }
        }
        catch (error) {
            console.log(error)
        }

    }, [switchRegPays])

    const loadMoreFunc = () => {
        setNumPays(numPays + 15)
    }


    const regionFunc = (event) => {
        let region_name = event.target.textContent;
        setSwitchRegPays(region_name)

        const searchInputGet = document.querySelector(".inputSearch > input ")
        searchInputGet.value = ""
        setSearch("")
    }

    const searchSubmit = async (event) => {
        try {

            event.preventDefault()
            const responseDataOnePay = await axios.get(`https://restcountries.com/v3.1/name/${search}`)	//get one pay

            responseDataOnePay.data.map((pay) => {
                if (switchRegPays === pay.region || switchRegPays === "") {
                    setAllPaysData(responseDataOnePay.data)
                }

                else {
                    setAllPaysData([])
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    /*qsdsqdsqd*/

    return (
        <main>
            <div id="home">
                <section className="search-pays">
                    <form onSubmit={searchSubmit}>
                        <Input  icon='search' size='big' placeholder=' Search for a country...' iconPosition='left' onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <div>
                        <Dropdown clearable options={options} selection placeholder='Filter By region' onChange={(e) => regionFunc(e)} />
                    </div>
                </section>
                <div className="box--cards">
                    {slice.map((pays) => (
                            <Link to={`/pays/${pays.name.common}`} key={pays.area}>
                                <Card className="card" key={pays.area} >
                                    <Image src={pays.flags.png} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{pays.name.common}</Card.Header>
                                        <Card.Description>
                                            <p>Population :  {pays.population}</p>
                                            <p>Region :  {pays.region}</p>
                                            <p>Capital :  {pays.capital}</p>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                    ))}
                </div>

                <div className="load-more">
                    <Button className="button-white" onClick={() => loadMoreFunc()} content='Load More' />
                </div>
            </div>
        </main>
    )
}