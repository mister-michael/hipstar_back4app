import React, { useState, useEffect } from 'react';
import { CardImg } from 'reactstrap';
import mAPI from "../../modules/movieManager";
import dbAPI from "../../modules/dbAPI";


const RecCardUpdated = props => {

    const activeUserId = props.activeUserId;

    const [buttonClass, setButtonClass] = useState({ loveClass: "closeButtonColor", hateClass: "closeButtonColor" });
    const [buttonText, setButtonText] = useState({ loveText: "Love", hateText: "Hate" });

    const buttonClassState = { ...buttonClass };
    const buttonTextState = { ...buttonText };


    const [fetchedMovieObject, setFetchedMovieObject] = useState(null);
    const toggle = () => setModal(!modal);
    const [refresh, setRefresh] = useState(false);

    const [loveButtonClass, setLoveButtonClass] = useState("closeButtonColor");
    const [loveButtonText, setLoveButtonText] = useState("Love");
    const [hateButtonClass, setHateButtonClass] = useState("closeButtonColor");
    const [hateButtonText, setHateButtonText] = useState("Hate");
    const [LHid, setLHid] = useState(null);
    const [loveButtonDisabled, setLoveButtonDisabled] = useState(true);
    const [hateButtonDisabled, setHateButtonDisabled] = useState(true);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true)

    const [modal, setModal] = useState(false);

    async function fetchMovie() {
        await mAPI.searchWithId(props.dbid)
            .then(res => setFetchedMovieObject(res));
    };

    async function isMovieRated() {
        await dbAPI.didUserRateMovie(props.dbid)
            .then(res => {

                if (res.length > 0 && res[0].attributes.isHated === true) {
                    setHateButtonClass("profileHatedButton");
                    setHateButtonText("Hated");
                    setButtonClass(buttonClassState);
                    setButtonText(buttonTextState);
                    setLoveButtonDisabled(false);
                    setHateButtonDisabled(true);
                    setDeleteButtonDisabled(false);
                    setLHid(res[0].id);

                } else if (res.length > 0 && res[0].attributes.isHated === false) {
                    setLoveButtonClass("profileLovedButton");
                    setButtonClass(buttonClassState);
                    setButtonText(buttonTextState);
                    setLoveButtonText("Loved");
                    setLoveButtonDisabled(true);
                    setHateButtonDisabled(false);
                    setDeleteButtonDisabled(false);
                    setLHid(res[0].id);
                } else {
                    setButtonClass(buttonClassState);
                    setButtonText(buttonTextState);
                    setDeleteButtonDisabled(true);
                    setLoveButtonDisabled(false);
                    setHateButtonDisabled(false);
                };
            });
    };

    async function handleLove() {
        const loveHateObj = {
            userId: activeUserId,
            dbid: props.dbid,
            isHated: false
        };
        if (LHid === null) {
            await dbAPI.createNewObjectByClassName("loveHates", loveHateObj)
                .then(res => {
                    setLoveButtonClass("profileLovedButton");
                    setLoveButtonText("Loved");
                    setHateButtonClass("closeButtonColor");
                    setHateButtonText("Hate");
                    setLoveButtonDisabled(true);
                    setHateButtonDisabled(false);
                    setDeleteButtonDisabled(false);
                    setLHid(res.id);
                    setRefresh(1);
                });
        } else {
            await dbAPI.saveEditedObjectByClassNameAndObjId("loveHates", LHid, loveHateObj)
                .then(res => {
                    setLoveButtonClass("profileLovedButton");
                    setLoveButtonText("Loved");
                    setHateButtonClass("closeButtonColor");
                    setHateButtonText("Hate");
                    setLoveButtonDisabled(true);
                    setHateButtonDisabled(false);
                    setDeleteButtonDisabled(false);
                    setRefresh(1);
                });
        };
    };

    async function handleHate() {
        const loveHateObj = {
            userId: activeUserId,
            dbid: props.dbid,
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
        };
    };

    // async function handleDelete() {
    //     await dbAPI.deleteObjectByClassNameAndId("loveHates", LHid)
    //         .then(() => {
    //             setLoveButtonClass("closeButtonColor")
    //             setLoveButtonText("Love")
    //             setHateButtonClass("closeButtonColor")
    //             setHateButtonText("Hate")
    //             setLoveButtonDisabled(false)
    //             setHateButtonDisabled(false)
    //             setDeleteButtonDisabled(true)
    //             setLHid(null)
    //             setRefresh(1)
    //             props.getActiveUserHates()
    //         });
    // };

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

    useEffect(() => {
        fetchMovie();
        isMovieRated();
        setRefresh(null);
    }, [refresh]);

    return (
        <>
            {fetchedMovieObject ?
                <>


                    <div className="movieCard">
                        <CardImg id="" top src={imageHandler()} alt={`${fetchedMovieObject.title} poster`} className="cardImage" />
                        <div>{fetchedMovieObject.title}</div>
                        <button
                            className={loveButtonClass}
                            onClick={handleLove}
                            disabled={loveButtonDisabled}>{loveButtonText}</button>
                        <button
                            className={hateButtonClass}
                            onClick={handleHate}
                            disabled={hateButtonDisabled}>{hateButtonText}</button>
                        {/* <button
                            onClick={handleDelete}
                            className="closeButtonColor"
                            disabled={deleteButtonDisabled}>x</button> */}
                    </div>

                </>
                : null}
        </>
    );
};

export default RecCardUpdated;