import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";


const Home = props => {

    // const [mostHatedMovies, setMostHatedMovies] = useState([]);

    // const getMostHatedMovies = () => {
    //     jAPI.get("lovehates")
    //         .then(loveHates => {
    //             const hatedMovies = loveHates.filter(lh => lh.isHated === true);
    //             const movieIds = hatedMovies.map(element => element.movieId);
    //             const uniqueMovieIds = [...new Set(movieIds)];
    //             const movieTallyArr = [];
    //             uniqueMovieIds.forEach(element => {
    //                 const tallyObject = { movieId: element, tally: 0 };
    //                 movieTallyArr.push(tallyObject);
    //             })
    //             loveHates.forEach(lh => {
    //                 for (let i = 0; i < uniqueMovieIds.length; i++) {
    //                     if (lh.movieId === uniqueMovieIds[i]) {
    //                         const tallyIndex = movieTallyArr.findIndex(element => element.movieId === lh.movieId);
    //                         movieTallyArr[tallyIndex].tally += 1;
    //                     }
    //                 }
    //             })
    //             const tallyToSort = movieTallyArr
    //             tallyToSort.sort(function compare(a, b) {
    //                 if (a.tally > b.tally) {
    //                     return -1;
    //                 }
    //                 if (a.tally < b.tally) {
    //                     return 1;
    //                 }
    //                 return 0;
    //             })
    //             const topMatch = tallyToSort[0].movieId;

    //             jAPI.getWithId("movies", topMatch)
    //                 .then(movie => setMostHatedMovies(movie))
    //         })
    // }

    // useEffect(() => {
    //     getMostHatedMovies();
    // }, []);

    return (
        <>
            {/* <div className="headline headlineRed headlineTextBlack">h!pst@r's most hated</div>
            <div className="headline headlineGreen headlineTextWhite">{mostHatedMovies.title}</div>
            <div className="marginTop">
                <div className="andysContainer">
                    <div className="andysDiv">
                        <img className="smallRadius hpstrImage hpstrMovieTitle" src={mostHatedMovies.posterPath} />
                        <div className="bodyContainer">
                            <div className="hpstrMovieTitle">
                                {mostHatedMovies.title}
                            </div>
                            <div>{mostHatedMovies.overview}</div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Home;