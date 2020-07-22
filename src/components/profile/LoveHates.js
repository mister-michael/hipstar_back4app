import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Button, CardImg, CardTitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jAPI from "../../modules/apiManager";
import MovieDetails from "../card/MovieDetails";
import Comment from "../comment/Comment"
import "../search/Search.css";
import "./LoveHate.css";
import dbAPI from "../../modules/dbAPI";
import mAPI from "../../modules/movieManager";

const LoveHates = (props) => {
  const [fetchedMovieObject, setFetchedMovieObject] = useState(null)
  const [mvid, setMvid] = useState(props.movieObject.dbid);
  
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  
  const [didUserComment, setDidUserComment] = useState(false);
  const [userCommentId, setUserCommentId] = useState([]);
  const [isLoveHate, setIsLoveHate] = useState(true);
  const [commentRefresh, setCommentRefresh] = useState(false)

  const toggle = () => setModal(!modal);
  const [disabled, setDisabled] = useState(false);

  const loveHateObject = props.loveHateObject;
  const LHid = props.loveHateObject.LHid;

  let buttonText = "";
  let buttonClass = "";
  loveHateObject.isHated ? buttonText = "LOVE" : buttonText = "HATE";
  loveHateObject.isHated ? buttonClass = "closeButtonColor" : buttonClass = "closeButtonColor";

  const userId = props.movieObject.userId;
  const activeUserId = sessionStorage.getItem("userId");

  const fetchMovieFromTMDB = () => {
    mAPI.searchWithId(props.movieObject.dbid)
      .then(res => {
        console.log("FETCHED MOVIE OBJ", res)
        setFetchedMovieObject(res)
      })
  };

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


  const handleClick = () => {

    let isHatedState = loveHateObject.isHated;
    console.log(isHatedState, "IS HATED STATE")

    let isHatedObj = {
      userId: userId,
      dbid: loveHateObject.dbid,
      isHated: ""
    };

    if (isHatedState === true) {
      isHatedObj.isHated = false;

    } else if (isHatedState === false) {
      isHatedObj.isHated = true;
    };

    dbAPI.saveEditedObjectByClassNameAndObjId("loveHates", LHid, isHatedObj);
    props.getUserObject(userId);
    props.getUserMovies(userId);
  }

  const handleDelete = () => {
    if (activeUserId === userId) {
      dbAPI.deleteObjectByClassNameAndId("loveHates", LHid);
      props.getUserObject(userId);
      props.getUserMovies(userId);
    }
  };

  const release = () => {
    if (fetchedMovieObject.releaseDate !== undefined) {
      return fetchedMovieObject.releaseDate.split("-")[0];
    };
  };

  const btnFunction = () => {
    if (activeUserId === userId) {
      return (
        <>
          <div className="buttonRow">
            <Button
              size="sm"
              id={`love-button--${""}`}
              onClick={handleClick}
              className={buttonClass}
            ><span >{buttonText}</span></Button>{' '}
            <Button
              size="sm"
              id={`hate-button--${""}`}
              onClick={handleDelete}
              className="closeButtonColor"
            ><span >X</span></Button>{' '}
          </div>
        </>
      )
    }
  };


  useEffect(() => {
    fetchMovieFromTMDB();
    props.setRecUpdated(true)
  }, []);

  return (
    <>
      {fetchedMovieObject ?
        <div onClick={toggle} className="card movieCard shadow">
          <div className="">
          </div>
          <CardImg id="" top src={imageHandler()} alt={`${fetchedMovieObject.title} poster`} className="cardImage" />
          <CardTitle className="loveHateTitle">{fetchedMovieObject.title}</CardTitle>
          <CardBody >

            <Modal isOpen={modal} toggle={toggle} className="modalModel">
              <ModalHeader className="" toggle={toggle}>
                <span className="modalHeaderText" >{fetchedMovieObject.title}</span>
                <span className="releaseDateDetails">{release()}</span>
              </ModalHeader>
              <ModalBody>
                <MovieDetails movieObject={fetchedMovieObject} dbid={fetchedMovieObject.id} />
            <Comment
              isLovehate={isLoveHate}
              setIsLoveHate={setIsLoveHate}
              className="commentContainer"
              mdbId={fetchedMovieObject.id}
              dbid={mvid}
              setMvid={setMvid}
              activeUserId={activeUserId}
              didUserComment={didUserComment}
              setDidUserComment={setDidUserComment}
              userCommentId={userCommentId}
              setUserCommentId={setUserCommentId}
              refresh={refresh}
              setRefresh={setRefresh}
              commentRefresh={commentRefresh}
              setCommentRefresh={setCommentRefresh} />
              </ModalBody>
              <ModalFooter className="">
                <Button className="closeButtonColor" onClick={toggle}>close</Button>
              </ModalFooter>
            </Modal>
          </CardBody>
          {btnFunction()}
        </div>
        : null}
    </>
  )
};

export default LoveHates;