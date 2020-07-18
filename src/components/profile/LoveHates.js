import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Button, CardImg, CardTitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jAPI from "../../modules/apiManager";
import MovieDetails from "../card/MovieDetails";
import Comment from "../comment/Comment"
import "../search/Search.css";
import "./LoveHate.css";

const LoveHates = (props) => {
  const [didUserComment, setDidUserComment] = useState(false);
  const [userCommentId, setUserCommentId] = useState([]);
  const [mvid, setMvid] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoveHate, setIsLoveHate] = useState(true);
  const [commentRefresh, setCommentRefresh] = useState(false)

  const toggle = () => setModal(!modal);
  const [disabled, setDisabled] = useState(false);

  const loveHateObject = props.loveHateObject;
  const loveHateId = props.loveHateObject.id;

  let buttonText = "";
  let buttonClass = "";

  const userId = props.userId;
  const activeUserId = parseInt(sessionStorage.getItem("userId"));


  loveHateObject.isHated ? buttonText = "LOVE" : buttonText = "HATE";
  loveHateObject.isHated ? buttonClass = "closeButtonColor" : buttonClass = "closeButtonColor";

  const handleClick = () => {

    let isHatedState = loveHateObject.isHated;

    let isHatedObj = {
      isHated: ""
    };

    if (isHatedState === true) {
      isHatedObj.isHated = false;

    } else if (isHatedState === false) {
      isHatedObj.isHated = true;
    };

    jAPI.patch(isHatedObj, "loveHates", loveHateId);
    props.getUserObject(userId);
    props.getUserMovies();
  }

  const handleDelete = () => {
    if (activeUserId === userId) {
      jAPI.delete(loveHateId, "loveHates");
      props.getUserObject(userId);
      props.getUserMovies();
    }
  };

  const release = () => {
    if (loveHateObject.movie.releaseDate !== undefined) {
      return loveHateObject.movie.releaseDate.split("-")[0];
    };
  };

  const btnFunction = () => {
    if (activeUserId === userId) {
      return (
        <>
          <div className="buttonRow">
            <Button
              size="sm"
              id={`love-button--${loveHateObject.id}`}
              onClick={handleClick}
              className={buttonClass}
            ><span >{buttonText}</span></Button>{' '}
            <Button
              size="sm"
              id={`hate-button--${loveHateObject.id}`}
              onClick={handleDelete}
              className="closeButtonColor"
            ><span >X</span></Button>{' '}
          </div>
        </>
      )
    }
  };


  useEffect(() => {
    setIsLoveHate(true);
  }, []);

  return (
    <>
      <div onClick={toggle} className="card movieCard shadow">
        <div className="">
        </div>
        <CardImg id="" top src={loveHateObject.movie.posterPath} alt={`${loveHateObject.movie.title} poster`} className="cardImage" />
        {/* <CardSubtitle>{release()}</CardSubtitle> */}
        <CardTitle className="loveHateTitle">{loveHateObject.movie.title}</CardTitle>
        <CardBody >

        </CardBody>
        <Modal isOpen={modal} toggle={toggle} className="modalModel">
          <ModalHeader className="" toggle={toggle}>
            <span className="modalHeaderText" >{loveHateObject.movie.title}</span>
            <span className="releaseDateDetails">{release()}</span>
          </ModalHeader>
          <ModalBody>
            <MovieDetails mdbId={loveHateObject.movie.dbid} />
            <Comment
              isLovehate={isLoveHate}
              setIsLoveHate={setIsLoveHate}
              className="commentContainer"
              mdbId={loveHateObject.movie.dbid}
              mvid={mvid}
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
        {btnFunction()}
      </div>
    </>
  )
};

export default LoveHates;