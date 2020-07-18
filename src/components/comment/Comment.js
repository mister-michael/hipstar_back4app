import React, { useState, useEffect } from "react";
import { Button, Input, CardFooter } from "reactstrap";
import jAPI from "../../modules/apiManager";
import CommentCard from "./CommentCard";

const Comment = (props) => {

    const [comments, setComments] = useState([]);
    const [review, setReview] = useState({ review: "" });
    const [reviewButtonClass, setReviewButtonClass] = useState("buttonMarginBottom reviewButtonColor justifyRight");

    const mdbId = props.mdbId;

    const findMovieIdGetComments = () => {

        jAPI.get("movies")
            .then(movies => {
                const matchedMovie = movies.find(movie => movie.dbid === mdbId);
                let mvidHolder = "";
                matchedMovie ? mvidHolder = matchedMovie.id : mvidHolder = props.mvid;
                props.setMvid(mvidHolder);
                jAPI.expand("comments", "user")
                    .then(comments => {
                        const matchedComments = comments.filter(comment => comment.movieId === mvidHolder);
                        const matchedToActiveUser = matchedComments.filter(comment => comment.userId === props.activeUserId);
                        setComments(matchedComments.reverse());
                        props.setCommentRefresh(!props.commentRefresh);
                        if (matchedToActiveUser.length > 0) {
                            props.setDidUserComment(true);
                            props.setUserCommentId(matchedToActiveUser[0].id);
                            setComments(matchedComments.reverse());
                        }

                    });
            });
    };

    let reviewObject = {
        userId: props.activeUserId,
        movieId: props.mvid,
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
        jAPI.save(reviewObject, "comments")
            .then(() => {
                props.setRefresh(!props.refresh);
                props.setDidUserComment(true);
                targetInput.value = "";
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
        findMovieIdGetComments();
    }, [props.refresh]);

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
                    return (
                        <CommentCard
                            key={res.id}
                            commentId={res.id}
                            movieId={res.movieId}
                            result={res}
                            userId={res.userId}
                            activeUserId={props.activeUserId}
                            comment={res.comment}
                            findMovieIdGetComments={findMovieIdGetComments}
                            didUserComment={props.didUserComment}
                            setDidUserComment={props.setDidUserComment}
                            userCommentId={props.userCommentId}
                            setUserCommentId={props.setUserCommentId}
                            {...props} />)
                })}
            </div>
        </div >
    )
};

export default Comment;