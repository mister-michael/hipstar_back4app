import React, { useState, useEffect } from "react";
import { Button, Input, CardFooter } from "reactstrap";
// import jAPI from "../../modules/apiManager";
import dbAPI from "../../modules/dbAPI";
import CommentCard from "./CommentCard";
import mAPI from "../../modules/movieManager";

const Comment = (props) => {

    console.log("COMMENT COMPONENT TRIGGERED")

    const [comments, setComments] = useState([]);
    const [review, setReview] = useState({ review: "" });
    const [reviewButtonClass, setReviewButtonClass] = useState("buttonMarginBottom reviewButtonColor justifyRight");
    const [refresh, setRefresh] = useState(null)

    const dbid = props.dbid;

    async function getComments (id) {
        await dbAPI.getComments(id)
        .then(res => {
            const userComments = res.filter(comment => comment.attributes.userId === props.activeUserId);
            if (userComments.length > 0) {
                props.setDidUserComment(true);
                props.setUserCommentId(res.id)
            }
            console.log(res, "COMMENTS COMMMENTS COMMENTS")
            setComments(res.reverse())
            // props.setCommentRefresh(!props.commentRefresh);
        })
    }

    // const findMovieIdGetComments = () => {

    //     jAPI.get("movies")
    //         .then(movies => {
    //             const matchedMovie = movies.find(movie => movie.dbid === dbid);
    //             let mvidHolder = "";
    //             matchedMovie ? mvidHolder = matchedMovie.id : mvidHolder = props.mvid;
    //             props.setMvid(mvidHolder);
    //             jAPI.expand("comments", "user")
    //                 .then(comments => {
    //                     const matchedComments = comments.filter(comment => comment.movieId === mvidHolder);
    //                     const matchedToActiveUser = matchedComments.filter(comment => comment.userId === props.activeUserId);
    //                     setComments(matchedComments.reverse());
    //                     props.setCommentRefresh(!props.commentRefresh);
    //                     if (matchedToActiveUser.length > 0) {
    //                         props.setDidUserComment(true);
    //                         props.setUserCommentId(matchedToActiveUser[0].id);
    //                         setComments(matchedComments.reverse());
    //                     }

    //                 });
    //         });
    // };

    let reviewObject = {
        userId: props.activeUserId,
        dbid: props.dbid,
        comment: review.review
    };

    const handleChange = (evt) => {

        const stateToChange = { ...review };
        stateToChange[evt.target.id] = evt.target.value;
        setReview(stateToChange);

        if (evt.target.value === "") {
            setReviewButtonClass("buttonMarginBottom reviewButtonColor justifyRight");
        } else {
            setReviewButtonClass("buttonMarginBottom reviewButtonColor justifyRight yellowGlow");
        }
    };

    const targetInput = document.getElementById("review");

    const saveReview = (evt) => {
        console.log(reviewObject, "REVIEW OBJECT")
        dbAPI.createNewObjectByClassName("comments", reviewObject)
            .then(res => {
                console.log(res, "SAVE COMMENT RES");
                props.setRefresh(!props.refresh);
                props.setCommentRefresh(!props.commentRefresh);
                props.setDidUserComment(true);
                targetInput.value = "";
                setRefresh(true)
            });
    };

    const commentInstructions = () => {
        if (comments.length !== 0) {
            return (
                <div className="commentInstructions">
                    <span className="YELLOW">your reviews will display in yellow.</span>  click to edit.
                </div>
            )
        }
    };

    useEffect(() => {
        // findMovieIdGetComments();
        getComments(dbid);
        setRefresh(null)
    }, [refresh]);

    return (
        <div id="" className="reviewDiv">
            <CardFooter className="">
                <span className="reviewHeader">Reviews</span>
            </CardFooter>
            <div className="reviewButtonContainer">
                <Button
                    className={reviewButtonClass}
                    onClick={saveReview}>
                    review
                </Button>
            </div>
            <Input
                type="textarea"
                placeholder="hit review to publish review"
                name="text"
                id="review"
                onChange={handleChange}
                // onKeyUp={e => e.key === "Enter" ? saveReview(e) : null}
                className="profileMarginBottom"
            />
            {commentInstructions()}

            <div className="scrollBox">
                {comments.map(res => {
                    console.log(res, "COMMENTS.MAP")
                    return (
                        <CommentCard
                            key={res.id}
                            commentId={res.id}
                            dbid={res.dbid}
                            result={res}
                            userId={res.attributes.userId}
                            activeUserId={props.activeUserId}
                            comment={res.attributes.comment}
                            // findMovieIdGetComments={findMovieIdGetComments}
                            didUserComment={props.didUserComment}
                            setDidUserComment={props.setDidUserComment}
                            userCommentId={props.userCommentId}
                            setUserCommentId={props.setUserCommentId}
                            {...props} 
                            user={props.user}
                            />)
                })}
            </div>
        </div >
    )
};

export default Comment;