import React, { useState, useEffect } from 'react';
import { Button, CardImg, CardTitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import mAPI from "../../modules/movieManager";
import dbAPI from "../../modules/dbAPI";
import MovieDetails from "../card/MovieDetails";
import Comment from "../comment/Comment"


const RecCardUpdated = props => {

    const activeUserId = props.activeUserId

    const [buttonClass, setButtonClass] = useState({ loveClass: "closeButtonColor", hateClass: "closeButtonColor" })
    const [buttonText, setButtonText] = useState({ loveText: "Love", hateText: "Hate" })

    const buttonClassState = { ...buttonClass }
    const buttonTextState = { ...buttonText }


    const [fetchedMovieObject, setFetchedMovieObject] = useState(null)
    const toggle = () => setModal(!modal);
    const [refresh, setRefresh] = useState(false);

    const [loveButtonClass, setLoveButtonClass] = useState("closeButtonColor");
    const [loveButtonText, setLoveButtonText] = useState("Love");
    const [hateButtonClass, setHateButtonClass] = useState("closeButtonColor");
    const [hateButtonText, setHateButtonText] = useState("Hate");
    const [LHid, setLHid] = useState(null)
    const [loveButtonDisabled, setLoveButtonDisabled] = useState(true);
    const [hateButtonDisabled, setHateButtonDisabled] = useState(true);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true)


    const [modal, setModal] = useState(false);
    const [didUserComment, setDidUserComment] = useState(false);
    const [userCommentId, setUserCommentId] = useState([]);
    const [isLoveHate, setIsLoveHate] = useState(true);
    const [commentRefresh, setCommentRefresh] = useState(false);
    const [dbid, setDBID] = useState(props.dbid);

    async function fetchMovie() {
        await mAPI.searchWithId(props.dbid)
            .then(res => setFetchedMovieObject(res))
    };

    async function isMovieRated() {
        await dbAPI.didUserRateMovie(props.result.id)
            .then(res => {


                if (res.length > 0 && res[0].attributes.isHated === true) {
                    // buttonClassState["hateClass"] = "profileHatedButton"
                    // buttonTextState["hateText"] = "Hated"
                    setHateButtonClass("profileHatedButton")
                    setHateButtonText("Hated")
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                    setLoveButtonDisabled(true)
                    setDeleteButtonDisabled(false)
                    setLHid(res[0].id)

                } else if (res.length > 0 && res[0].attributes.isHated === false) {
                    // buttonClassState["loveClass"] = "profileLovedButton"
                    // buttonTextState["loveText"] = "Loved"
                    setLoveButtonClass("profileLovedButton")
                    setButtonClass(buttonClassState)
                    setButtonText(buttonTextState)
                    setLoveButtonText("Loved")
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

    async function isActiveUserLoveHate() {
        await dbAPI.getLoveHates(props.activeUserId)
            .then(res => {
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].attributes.dbid === props.dbid && res[i].attributes.isHated === true) {
                            setHateButtonClass({ name: "profileHatedButton" });
                            setLoveButtonClass({ name: "closeButtonColor" });
                            setLHid(res[i].attributes.id);
                            setLoveButtonDisabled(false);
                            setHateButtonDisabled(true);
                        } else if (res[i].attributes.dbid === props.dbid && res[i].attributes.isHated === false) {
                            setHateButtonClass({ name: "closeButtonColor" });
                            setLoveButtonClass({ name: "profileLovedButton" });
                            setLHid(res[i].attributes.id);
                            setLoveButtonDisabled(true);
                            setHateButtonDisabled(false);
                        } else {
                            setHateButtonClass({ name: "closeButtonColor" });
                            setLoveButtonClass({ name: "closeButtonColor" });
                            setLoveButtonDisabled(false);
                            setHateButtonDisabled(false);
                        }
                    }
                } else {
                    setHateButtonClass({ name: "closeButtonColor" });
                    setLoveButtonClass({ name: "closeButtonColor" });
                    setLoveButtonDisabled(false);
                    setHateButtonDisabled(false);
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
                    setRefresh(1)
                });
        } else {
            await dbAPI.saveEditedObjectByClassNameAndObjId("loveHates", LHid, loveHateObj)
                .then(() => {
                    setLoveButtonClass("profileLovedButton")
                    setLoveButtonText("Loved")
                    setHateButtonClass("closeButtonColor")
                    setHateButtonText("Hate")
                    setLoveButtonDisabled(true)
                    setHateButtonDisabled(false)
                    setDeleteButtonDisabled(false)
                    setRefresh(1)
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
                    setRefresh(1)
                });
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
                    setRefresh(1)
                });
        }
    };

    async function handleDelete() {
        await dbAPI.deleteObjectByClassNameAndId("loveHates", LHid)
            .then(res => {
                setLoveButtonClass("closeButtonColor")
                setLoveButtonText("Love")
                setHateButtonClass("closeButtonColor")
                setHateButtonText("Hate")
                setLoveButtonDisabled(false)
                setHateButtonDisabled(false)
                setDeleteButtonDisabled(true)
                setLHid(null)
                setRefresh(1)
            });
    }

    let poster = (int) => {
        const randomN = Math.ceil(Math.random() * int)
        return require(`../img/image-unavailable--${randomN}.jpg`)
    };
    const imageHandler = () => {
        if (fetchedMovieObject.poster_path !== null) {
            return `https://image.tmdb.org/t/p/w500${fetchedMovieObject.poster_path}`;
        } else {
            return poster(5);
        };
    };

    const forgetJSX = () => {
        if (LHid !== false) {
            return (
                <>
                    <button
                        id={`hate-button--${props.result.movie.id}`}
                        onClick={handleDelete}
                        className="closeButtonColor">
                        <span >X</span>
                    </button>{' '}</>)
        }
    }

    console.log(fetchedMovieObject)
    useEffect(() => {
        fetchMovie();
    }, [])

    return (
        <>
            {fetchedMovieObject ?
                <>
                    

                    <div className="movieCard">
                        <CardImg id="" top src={imageHandler()} alt={`${fetchedMovieObject.title} poster`} className="cardImage" />
                        <div>{fetchedMovieObject.title}</div>
                        {/* <button
                            className={loveButtonClass}
                            onClick={handleLove}
                            disabled={loveButtonDisabled}>{loveButtonText}</button>
                        <button
                            className={hateButtonClass}
                            onClick={handleHate}
                            disabled={hateButtonDisabled}>{hateButtonText}</button>
                        <button
                            onClick={handleDelete}
                            className="closeButtonColor"
                            disabled={deleteButtonDisabled}>x</button> */}
                    </div>

                </>
                : null}
        </>
    )
};

export default RecCardUpdated