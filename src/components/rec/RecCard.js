import React, { useEffect, useState } from "react";
import { Card as div, Button, CardImg, CardTitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jAPI from "../../modules/apiManager"
import mAPI from "../../modules/movieManager"
import MovieDetails from "../card/MovieDetails"
import Comment from "../comment/Comment"
import "./Rec.css"
import "../search/Search.css"

const RecCard = (props) => {
  const movie = props.result.movie;
  const mdbId = movie.dbid;
  const activeUserId = props.activeUserId;
  let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";
  let loveHateFoundId = "";
  const result = props.result;

  const [loveHateId, setLoveHateId] = useState(false);
  const [loveBtnState, setLoveBtnState] = useState({ name: "" });
  const [hateBtnState, setHateBtnState] = useState({ name: "" });
  const [isLoveDisabled, setIsLoveDisabled] = useState(true);
  const [isHateDisabled, setIsHateDisabled] = useState(true);
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const [didUserComment, setDidUserComment] = useState(false);
  const [userCommentId, setUserCommentId] = useState([]);
  const [mvid, setMvid] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoveHate, setIsLoveHate] = useState(true);
  const [jsonId, setJsonId] = useState([]);
  const [commentRefresh, setCommentRefresh] = useState([]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let buttonText = "";
  let buttonClass = "";
  result.isHated ? buttonText = "love" : buttonText = "hate";
  result.isHated ? buttonClass = "profileLovedButton" : buttonClass = "profileHatedButton";

  const buttons = () => {
    jAPI.userMovieExpand("loveHates", activeUserId)
      .then(movies => {
        if (movies.length > 0) {
          for (let i = 0; i < movies.length; i++) {
            if (mdbId === movies[i].movie.dbid && movies[i].isHated === true) {
              loveHateFoundId = movies[i].id;
              setHateBtnState({ name: "profileHatedButton" });
              setLoveBtnState({ name: "closeButtonColor" });
              setLoveHateId(loveHateFoundId);
              setIsLoveDisabled(false);
              setIsHateDisabled(true);

              break
            } else if (mdbId === movies[i].movie.dbid && movies[i].isHated === false) {
              loveHateFoundId = movies[i].id;
              setHateBtnState({ name: "closeButtonColor" });
              setLoveBtnState({ name: "profileLovedButton" });
              setLoveHateId(loveHateFoundId);
              setIsLoveDisabled(true);
              setIsHateDisabled(false);

              break
            } else {
              setHateBtnState({ name: "closeButtonColor" });
              setLoveBtnState({ name: "closeButtonColor" });
              setIsLoveDisabled(false);
              setIsHateDisabled(false);
            }
          }
        } else {
          setHateBtnState({ name: "closeButtonColor" });
          setLoveBtnState({ name: "closeButtonColor" });
          setIsLoveDisabled(false);
          setIsHateDisabled(false);
        }
      });
  };


  const handleClick = (e) => {

    let patchBool = ""
    let loveDisabledBool = ""
    let hateDisabledBool = ""
    let hateClass = ""
    let loveClass = ""

    if (e.target.innerHTML === "Hate") {
      patchBool = true;
      loveDisabledBool = false;
      hateDisabledBool = true;
      hateClass = "profileHatedButton";
      loveClass = "closeButtonColor";

    } else if (e.target.innerHTML === "Love") {

      patchBool = false;
      loveDisabledBool = true;
      hateDisabledBool = false;
      hateClass = "closeButtonColor";
      loveClass = "profileLovedButton";
    }

    mAPI.searchWithId(mdbId)
      .then(movieById => {

        jAPI.get("movies")
          .then(movies => {

            const movieInJson = movies.find(movie => movie.dbid === movieById.id);

            const loveHateObject = {
              userId: activeUserId,
              movieId: movieInJson.id,
              isHated: patchBool
            };

            jAPI.get("loveHates")
              .then(loveHatesFetch => {

                const loveHateFound = loveHatesFetch.find(object => object.userId === activeUserId && object.movieId === movieInJson.id);

                if (loveHateFound === undefined) {

                  jAPI.save(loveHateObject, "loveHates")
                  jAPI.userMovieExpand("lovehates", activeUserId)
                    .then(lhs => {
                      lhs.filter(lh => {
                        if (lh.movie.dbid === mdbId && lh.userId === activeUserId) {
                          loveHateFoundId = lh.id;
                          setLoveHateId(loveHateFoundId);
                        }
                      });
                    });
                } else {
                  loveHateFoundId = loveHateFound.id;
                  setLoveHateId(loveHateFoundId);
                  const toggleIsHated = { isHated: patchBool };
                  jAPI.patch(toggleIsHated, "loveHates", loveHateFoundId);
                }
              });


          });
        setLoveHateId(loveHateFoundId);
        setHateBtnState({ name: hateClass });
        setLoveBtnState({ name: loveClass });
        setIsLoveDisabled(loveDisabledBool);
        setIsHateDisabled(hateDisabledBool);
        setHasBeenChanged(!hasBeenChanged);
      });
  };

  const handleForget = () => {
    jAPI.delete(loveHateId, "loveHates");
    setLoveHateId(false);
    setHateBtnState({ name: "closeButtonColor" });
    setLoveBtnState({ name: "closeButtonColor" });
    setIsLoveDisabled(false);
    setIsHateDisabled(false);
    setHasBeenChanged(!hasBeenChanged);
  };

  const forgetJSX = () => {
    if (loveHateId !== false) {
      return (
        <>
          <button
            id={`hate-button--${props.result.movie.id}`}
            onClick={handleForget}
            className="closeButtonColor">
            <span >X</span>
          </button>{' '}</>)
    }
  }

  const release = () => {
    // const releaseDate = "release_date";
    if (props.result.movie.releaseDate !== undefined) {
      return props.result.movie.releaseDate.split("-")[0];
    }
  };

  const imageHandler = () => {
    if (movie.posterPath !== null) {
      return movie.posterPath;
    } else {
      return poster;
    };
  };


  useEffect(() => {
    setIsLoveHate(true);
    buttons();

  }, []);

  return (
    <>
      <div className="card shadow movieCard">
        <div onClick={toggle} >
          <CardImg id="" top src={imageHandler()} alt={`${props.result.movie.title} poster`} className="cardImage" />
          <CardTitle>{props.result.movie.title}</CardTitle>
          {/* <CardSubtitle>{release()}</CardSubtitle> */}
          <CardBody >
          </CardBody>
          <Modal isOpen={modal} toggle={toggle} className="modalModel">
            <ModalHeader className="" toggle={toggle}>
              <span className="modalHeaderText">{props.result.movie.title}</span>
              <span className="releaseDateDetails">{release()}</span>
            </ModalHeader>
            <ModalBody>
              <MovieDetails
                setMvid={setMvid}
                mvid={setMvid}
                isLoveHate={isLoveHate}
                jsonId={jsonId}
                setJsonId={setJsonId}
                mdbId={mdbId} />
              <Comment
                isLovehate={isLoveHate}
                setIsLoveHate={setIsLoveHate}
                className="commentContainer"
                mdbId={props.result.movie.dbid}
                mvid={props.result.movie.id}
                setMvid={setMvid}
                activeUserId={activeUserId}
                didUserComment={didUserComment}
                setDidUserComment={setDidUserComment}
                userCommentId={userCommentId}
                setUserCommentId={setUserCommentId}
                refresh={refresh}
                setRefresh={setRefresh}
                commentRefresh={commentRefresh}
                setCommentRefresh={setCommentRefresh}
              />
            </ModalBody>
            <ModalFooter className="">
              <Button className="closeButtonColor" onClick={toggle}>close</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div className="buttonRow">
          <Button
            size="sm"
            id={`hate-button--${props.result.id}`}
            onClick={(e) => handleClick(e)}
            className={hateBtnState.name}
            disabled={isHateDisabled}
          ><span >Hate</span></Button>
          <Button
            size="sm"
            id={`love-button--${props.result.id}`}
            onClick={(e) => handleClick(e)}
            className={loveBtnState.name}
            disabled={isLoveDisabled}><span >Love</span></Button>{' '}
          {' '}
          {forgetJSX()}
        </div>
      </div>
    </>
  )
};

export default RecCard;