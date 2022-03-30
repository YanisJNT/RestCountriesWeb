import "./style.css";

import { Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InfoPays() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(async () => {
        const responseDataPays = await axios.get(
            `https://restcountries.com/v3.1/name/${id}`
        );
        setData(responseDataPays.data);
    }, []);

    return (
        <section>
            {data.map((pays) => (
                <section className="section-card-button" key={pays.area}>
                    <Link className="button-back" to="/">
                        <Button icon="long arrow alternate left" content="back" />
                    </Link>

                    <div className="box-one-card ">
                        <img className="img-country" src={pays.flags.png} />

                        <article className="box-about-country">
                            <h2>{pays.name.common}</h2>

                            <div className="about-country">
                                <div className="about-left">
                                    <p>
                                        <span className="span-bold">Native Name :</span>{" "}
                                        {Object.values(pays.name.nativeName)[0].common}
                                    </p>
                                    <p>
                                        <span className="span-bold">Population : </span>{" "}
                                        {pays.population}
                                    </p>
                                    <p>
                                        <span className="span-bold">Region : </span> {pays.region}
                                    </p>
                                    <p>
                                        <span className="span-bold">Sub Region :</span>{" "}
                                        {pays.subregion}
                                    </p>
                                    <p>
                                        <span className="span-bold">Capital :</span> {pays.capital}
                                    </p>
                                </div>

                                <div className="about-right">
                                    <p>
                                        <span className="span-bold">Top Level Domain :</span>{" "}
                                        {pays.altSpellings[0]}
                                    </p>
                                    <p>
                                        <span className="span-bold">Currencies :</span>{" "}
                                        {Object.values(pays.currencies)[0].name}
                                    </p>

                                    <p>
                                        <span className="span-bold">Languages :</span>{" "}
                                        {Object.values(pays.languages).join()}{" "}
                                    </p>
                                </div>
                            </div>

                            {pays.hasOwnProperty("borders") ? (
                                <div className="box-border-country">
                                    <div>
                                        <span className="span-bold">Border countries :</span>
                                        <div className="list-border-country">
                                            {pays.borders.map((border, index) => (
                                                <span key={index}>
                                                    {border}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </article>
                    </div>
                </section>
            ))}
        </section>
    );
}
