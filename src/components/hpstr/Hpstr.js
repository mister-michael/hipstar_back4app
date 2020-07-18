import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import "./Hpstr.css"

const Hpstr = () => {

    const [movieObject, setMovieObject] = useState({});

    const movieToDisplay = "The Cat and the Canary";

    const fetchMovie = () => {
        return jAPI.get("movies")
            .then(movies => {
                const theOneMovie = movies.filter(movie => movie.title.toLowerCase() === movieToDisplay.toLowerCase());
                setMovieObject(theOneMovie[0]);
            })
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    return (
        <>
            <h2 className="headline headlineGreen headlineTextBlack">the only movie to ever see</h2>
            <h5 className="headline headlineRed headlineTextWhite">{movieObject.title}</h5>
            <section className="andysContainer marginTop">
                <div className="andysDiv">
                    <div className="bodyContainer">
                    </div>
                    <img className="smallRadius" src={movieObject.posterPath} alt="poster"
                        className="hpstrImage" />
                    <div className="bodyContainer">
                        <h5 className="hpstrMovieTitle">{movieObject.title}</h5>
                        <div>{movieObject.overview}</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hpstr;