import React, { useState, useEffect } from 'react';
import { CardImg } from 'reactstrap';
import dbAPI from "../../modules/dbAPI";

const SearchCardRebuild = props => {

    const [buttonClass, setButtonClass] = useState({ loveClass: "closeButtonColor", hateClass: "closeButtonColor" })
    const [buttonText, setButtonText] = useState({ loveText: "Love", hateText: "Hate" })
    const [hateButtonText, setHateButtonText] = useState("Hate")
    const [loveButtonText, setLoveButtonText] = useState("Love")
    const [hateButtonClass, setHateButtonClass] = useState("closeButtonColor")
    const [loveButtonClass, setLoveButtonClass] = useState("closeButtonColor")
    const [hateButtonDisabled, setHateButtonDisabled] = useState(false)
    const [LoveButtonDisabled, setLoveButtonDisabled] = useState(false)
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true)
    const [LHid, setLHid] = useState(null)


    const [movie, setMovie] = useState(props.result)


    const [refresh, setRefresh] = useState(null)

    const activeUserId = sessionStorage.getItem("userId")

    const buttonClassState = { ...buttonClass }
    const buttonTextState = { ...buttonText }

    // console.log(props.result)
    

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


                if (res.length > 0 && res[0].attributes.isHated === true) {
                    console.log(res.length, "= RES LENGTH", res[0].attributes.isHated, "= isHated")
                    console.log("if 1")
                    buttonClassState["hateClass"] = "profileHatedButton"
                    buttonTextState["hateText"] = "Hated"
                    setHateButtonClass("profileHatedButton")
                    setHateButtonText("Hated")
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                    setHateButtonDisabled(true)
                    setDeleteButtonDisabled(false)
                    setLHid(res[0].id)

                } else if (res.length > 0 && res[0].attributes.isHated === false) {
                    console.log(res[0].id)
                    console.log(res.length, "= RES LENGTH", res[0].attributes.isHated, "= isHated")
                    console.log("if 2");
                    buttonClassState["loveClass"] = "profileLovedButton"
                    buttonTextState["loveText"] = "Loved"
                    setLoveButtonClass("profileLovedButton")
                    setLoveButtonText("Loved")
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
                .then(res => {
                    setLoveButtonClass("profileLovedButton")
                    setLoveButtonText("Loved")
                    setHateButtonClass("closeButtonColor")
                    setHateButtonText("Hate")
                    setLoveButtonDisabled(true)
                    setHateButtonDisabled(false)
                    setDeleteButtonDisabled(false)
                    setLHid(res.id)
                }
                );
            // setRefresh(true)
        } else {
            await dbAPI.saveEditedObjectByClassNameAndObjId("loveHates", LHid, loveHateObj)
                .then(res => {
                    setLoveButtonClass("profileLovedButton")
                    setLoveButtonText("Loved")
                    setHateButtonClass("closeButtonColor")
                    setHateButtonText("Hate")
                    setLoveButtonDisabled(true)
                    setHateButtonDisabled(false)
                    setDeleteButtonDisabled(false)
                });
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
                .then(res => {
                    setLoveButtonClass("closeButtonColor")
                    setLoveButtonText("Love")
                    setHateButtonClass("profileHatedButton")
                    setHateButtonText("Hated")
                    setLoveButtonDisabled(false)
                    setHateButtonDisabled(true)
                    setDeleteButtonDisabled(false)
                    setLHid(res.id)
                });
            // setRefresh(true)
        } else {
            await dbAPI.saveEditedObjectByClassNameAndObjId("loveHates", LHid, loveHateObj)
                .then(res => {
                    setLoveButtonClass("closeButtonColor")
                    setLoveButtonText("Love")
                    setHateButtonClass("profileHatedButton")
                    setHateButtonText("Hated")
                    setLoveButtonDisabled(false)
                    setHateButtonDisabled(true)
                    setDeleteButtonDisabled(false)
                });
        }

    };

    async function handleDelete() {
        await dbAPI.deleteObjectByClassNameAndId("loveHates", LHid)
            .then(res => {
                console.log(res)
                setLoveButtonClass("closeButtonColor")
                setLoveButtonText("Love")
                setHateButtonClass("closeButtonColor")
                setHateButtonText("Hate")
                setLoveButtonDisabled(false)
                setHateButtonDisabled(false)
                setDeleteButtonDisabled(true)
                setLHid(null)

            });

    }


    useEffect(() => {
        isMovieRated();
        setRefresh(null)
    }, [refresh])

    return (
        <>
            <div className="movieCard">
                <CardImg id="" top src={imageHandler()} alt={`${props.result.title} poster`} className="cardImage" />
                <div>{props.result.title}</div>
                <button
                    className={loveButtonClass}
                    onClick={handleLove}
                    disabled={LoveButtonDisabled}>{buttonText.loveText}</button>
                <button
                    className={hateButtonClass}
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