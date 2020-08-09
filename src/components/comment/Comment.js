import React, { useState, useEffect } from "react";
import { Button, Input, CardFooter } from "reactstrap";
import dbAPI from "../../modules/dbAPI";
import CommentCard from "./CommentCard";

const Comment = (props) => {


    const [comments, setComments] = useState([]);
    const [review, setReview] = useState({ review: "" });
    const [reviewButtonClass, setReviewButtonClass] = useState("buttonMarginBottom reviewButtonColor justifyRight");
    const [refresh, setRefresh] = useState(null);

    const dbid = props.dbid;

    async function getComments (id) {
        await dbAPI.getComments(id)
        .then(res => {
            const userComments = res.filter(comment => comment.attributes.userId === props.activeUserId);
            if (userComments.length > 0) {
                props.setDidUserComment(true);
                props.setUserCommentId(res.id);
            }
            setComments(res.reverse());
        })
    }

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
        };
    };

    const targetInput = document.getElementById("review");

    const saveReview = (evt) => {
        dbAPI.createNewObjectByClassName("comments", reviewObject)
            .then(res => {
                props.setRefresh(!props.refresh);
                props.setCommentRefresh(!props.commentRefresh);
                props.setDidUserComment(true);
                targetInput.value = "";
                setRefresh(true);
            });
    };

    const commentInstructions = () => {
        if (comments.length !== 0) {
            return (
                <div className="commentInstructions">
                    <span className="YELLOW">your reviews will display in yellow.</span>  click to edit.
                </div>
            );
        };
    };

    useEffect(() => {
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
                className="profileMarginBottom"
            />
            {commentInstructions()}

            <div className="scrollBox">
                {comments.map(res => {
                    return (
                        <CommentCard
                            key={res.id}
                            commentId={res.id}
                            dbid={res.dbid}
                            result={res}
                            userId={res.attributes.userId}
                            activeUserId={props.activeUserId}
                            comment={res.attributes.comment}
                            getComments={getComments}
                            didUserComment={props.didUserComment}
                            setDidUserComment={props.setDidUserComment}
                            userCommentId={props.userCommentId}
                            setUserCommentId={props.setUserCommentId}
                            {...props} 
                            user={props.user}
                            setRefresh={setRefresh}
                            refresh={refresh}
                            />)
                })}
            </div>
        </div >
    );
};

export default Comment;