import React, { useState, useEffect } from 'react';
import { CardImg } from 'reactstrap';
import dbAPI from "../../modules/dbAPI";

const SearchCardRebuild = props => {

    const [buttonClass, setButtonClass] = useState({ loveClass: "closeButtonColor", hateClass: "closeButtonColor" })

    const [buttonText, setButtonText] = useState({ loveText: "Love", hateText: "Hate" })

    const [movie, setMovie] = useState(props.result)

    const [refresh, setRefresh] = useState(false)

    console.log(props.result)

    let poster = (int) => {
        const randomN = Math.ceil(Math.random() * int)
        return require(`../img/image-unavailable--${randomN}.jpg`)
    };

    const imageHandler = () => {
        if (props.result.poster_path !== null) {
            return `https://image.tmdb.org/t/p/w500${props.result.poster_path}`;
        } else {
            return poster(5);
        };
    };

    async function isMovieRated() {
        await dbAPI.didUserRateMovie(props.result.id)
            .then(res => {
                const buttonClassState = { ...buttonClass }
                const buttonTextState = { ...buttonText }

                if (res.length > 0 && res[0].attributes.isHated === true) {
                    console.log(res.length, "= RES LENGTH", res[0].attributes.isHated, "= isHated")
                    console.log("if 1")
                    buttonClassState["hateClass"] = "profileHatedButton"
                    buttonTextState["hateText"] = "Hated"
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                    
                } else if (res.length > 0 && res[0].attributes.isHated === false) {
                    console.log(res.length, "= RES LENGTH", res[0].attributes.isHated, "= isHated")
                    console.log("if 2");
                    buttonClassState["loveClass"] = "profileLovedButton"
                    buttonTextState["loveText"] = "Loved"
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                } else {
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                }
            })
    };

    const updateLoveHate = () => {
        
    }

    useEffect(() => {
        isMovieRated();
    }, [movie])

    return (
        <>
            <div className="movieCard">
                <CardImg id="" top src={imageHandler()} alt={`${props.result.title} poster`} className="cardImage" />
                <div>{props.result.title}</div>
                <button className={buttonClass.loveClass}>{buttonText.loveText}</button>
                <button className={buttonClass.hateClass}>{buttonText.hateText}</button>
                <button className="closeButtonColor">x</button>
            </div>
        </>
    )
}

export default SearchCardRebuild