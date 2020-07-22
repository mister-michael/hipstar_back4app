import React, { useState, useEffect } from "react";
import { CardImg, CardBody } from 'reactstrap';
import mAPI from "../../modules/movieManager"
import jAPI from "../../modules/apiManager"
import "./Card.css"

const MovieDetails = props => {

    const [movieFromDb, setMovieFromDb] = useState([]);
    const [poster, setPoster] = useState([]);
    const dbid = props.dbid

    // async function getMovie() {
    //     mAPI.searchWithId(dbid)
    //         .then(res => {
    //             setMovieFromDb(res)
    //             if (res.poster_path !== null) {
    //                 setPoster(imageHandler(res));
    //             } else {
    //                 setPoster(imageHandler(res));
    //             }
    //         })

    // }

    // const getMovieJson = () => {
    //     mAPI.searchWithId(dbid)
    //         .then(movieFromTmdb => {
    //             setMovieFromDb(movieFromTmdb);
    //             if (movieFromTmdb.poster_path !== null) {
    //                 setPoster(imageHandler(movieFromTmdb));
    //             } else {
    //                 setPoster(imageHandler(movieFromTmdb));
    //             }
    //             jAPI.get("movies")
    //                 .then(movies => {
    //                     const movieInJson = movies.find(movie => movie.dbid === dbid || movie.id === props.mvid);
    //                     if (movieInJson !== undefined) {
    //                         if (props.isLoveHate === true) {
    //                             props.setJsonId(movieInJson.id);
    //                         }
    //                         setMovieFromDb(movieInJson);
    //                     } else {
    //                         const movieObject = {
    //                             dbid: movieFromTmdb.id,
    //                             title: movieFromTmdb.title,
    //                             releaseDate: movieFromTmdb.release_date,
    //                             posterPath: imageHandler(movieFromTmdb),
    //                             revenue: movieFromTmdb.revenue,
    //                             overview: movieFromTmdb.overview,
    //                             tagline: movieFromTmdb.tagline
    //                         };
    //                         jAPI.save(movieObject, "movies")
    //                             .then(savedMovie => {
    //                                 props.setJsonId(savedMovie.id);
    //                                 setMovieFromDb(savedMovie);
    //                             })
    //                     }
    //                 });
    //         });
    // };

    // let posterFunction = (int) => {
    //     const randomN = Math.ceil(Math.random() * int);
    //     return require(`../img/image-unavailable--${randomN}.jpg`);
    // };

    // const imageHandler = (movie) => {
    //     const posterPath = "poster_path";
    //     if (movie[posterPath] !== null) {
    //         return `https://image.tmdb.org/t/p/w500${movie[posterPath]}`;
    //     } else {
    //         return posterFunction(5);
    //     };
    // };

    useEffect(() => {
        // getMovieJson();
        // getMovie()
    }, []);

    return (
        <>
            <div id={props.jsonId}>
                <div>
                    <CardImg id="" top src={props.posterPath} alt={`${props.movieObject.title} poster`} className="cardImage boxShadow marginTopSmall marginBottomSmall detailsImage" />
                    <CardBody className="detailsMarginBottom">
                        <div className="overviewText detailsMarginTop">Overview</div>
                        <div>{props.movieObject.overview}</div>
                    </CardBody>
                </div>
            </div>
        </>
    )
};

export default MovieDetails