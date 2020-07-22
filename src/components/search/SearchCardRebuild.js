import React, { useState, useEffect } from 'react';
import { CardImg } from 'reactstrap';
import dbAPI from "../../modules/dbAPI";

const SearchCardRebuild = props => {

    const [buttonClass, setButtonClass] = useState({ loveClass: "closeButtonColor", hateClass: "closeButtonColor" })
    const [buttonText, setButtonText] = useState({ loveText: "Love", hateText: "Hate" })
    const [hateButtonDisabled, setHateButtonDisabled] = useState(false)
    const [LoveButtonDisabled, setLoveButtonDisabled] = useState(false)
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true)
    const [LHid, setLHid] = useState(null)


    const [movie, setMovie] = useState(props.result)


    const [refresh, setRefresh] = useState(null)

    const activeUserId = sessionStorage.getItem("userId")

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
                    // console.log(res.length, "= RES LENGTH", res[0].attributes.isHated, "= isHated")
                    // console.log("if 1")
                    buttonClassState["hateClass"] = "profileHatedButton"
                    buttonTextState["hateText"] = "Hated"
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                    setHateButtonDisabled(true)
                    setDeleteButtonDisabled(false)
                    setLHid(res[0].id)

                } else if (res.length > 0 && res[0].attributes.isHated === false) {
                    // console.log(res.length, "= RES LENGTH", res[0].attributes.isHated, "= isHated")
                    // console.log("if 2");
                    buttonClassState["loveClass"] = "profileLovedButton"
                    buttonTextState["loveText"] = "Loved"
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                    setLoveButtonDisabled(true)
                    setDeleteButtonDisabled(false)
                    setLHid(res[0].id)
                } else {
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                    setDeleteButtonDisabled(true)

                }
            })
    };

    async function handleLove() {
        const loveHateObj = {
            userId: activeUserId,
            dbid: props.result.id,
            isHated: false
        };
        if (LHid === null) {
            await dbAPI.createNewObjectByClassName("loveHates", loveHateObj)
                .then(res => console.log(res));
            setRefresh(true)
        } else {
            await dbAPI.saveEditedObjectByClassNameAndObjId("loveHates", LHid, loveHateObj)
                .then(res => console.log(res));
        }
    };

    async function handleHate() {
        const loveHateObj = {
            userId: activeUserId,
            dbid: props.result.id,
            isHated: true
        };
        if (LHid === null) {
            await dbAPI.createNewObjectByClassName("loveHates", loveHateObj)
                .then(res => console.log(res));
            setRefresh(true)
        } else {
            await dbAPI.saveEditedObjectByClassNameAndObjId("loveHates", LHid, loveHateObj)
                .then(res => console.log(res));
        }
    };

    async function handleDelete() {
        await dbAPI.deleteObjectByClassNameAndId("loveHates", LHid)
            .then(res => console.log(res));
        setRefresh(true)
    }


    useEffect(() => {
        isMovieRated();
    }, [refresh])

    return (
        <>
            <div className="movieCard">
                <CardImg id="" top src={imageHandler()} alt={`${props.result.title} poster`} className="cardImage" />
                <div>{props.result.title}</div>
                <button
                    className={buttonClass.loveClass}
                    onClick={handleLove}
                    disabled={LoveButtonDisabled}>{buttonText.loveText}</button>
                <button
                    className={buttonClass.hateClass}
                    onClick={handleHate}
                    disabled={hateButtonDisabled}>{buttonText.hateText}</button>
                <button
                    onClick={handleDelete}
                    className="closeButtonColor"
                    disabled={deleteButtonDisabled}>x</button>
            </div>
        </>
    )
}

export default SearchCardRebuild