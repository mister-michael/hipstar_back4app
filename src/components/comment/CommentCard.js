import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom"
import CommentForm from "./CommentForm"
import "./Comment.css"
import dbAPI from "../../modules/dbAPI";

const CommentCard = props => {


    const [modal, setModal] = useState(false);
    const [editedComment, setEditedComment] = useState({ comment: props.comment });

    const activeUserId = props.activeUserId;
    const commentUserId = props.userId;
    const commentId = props.commentId
    console.log(commentId)
    const numberOfStylesInCss = 3;

    const toggle = () => {
        if (activeUserId == commentUserId) {
            setModal(!modal);
        }
    };

    const randomN = (int) => {
        if (props.userId === props.activeUserId) {
            return 4
        } else {
            return Math.ceil(Math.random() * int)
        }
    };

    const commentPatch = {
        userId: activeUserId,
        dbid: props.dbid,
        comment: editedComment.comment
    };

    async function handleSubmit() {
        await dbAPI.saveEditedObjectByClassNameAndObjId("comments", commentId, commentPatch)
            .then(() => {
                setModal(!modal);
                props.getComments();
                props.setRefresh(!props.refresh)
            })
    };

    const handleDelete = () => {
        dbAPI.deleteObjectByClassNameAndId("comments", commentId)
            .then(() => {
                props.getComments();
                props.setRefresh(!props.refresh)
            })
    };

    const linkFunction = () => {
        if (activeUserId === commentUserId) {
            return `/profile`
        } else {
            return `/${commentUserId}`
        }
    };

    return (
        <>
            <div className="commentContainer" onClick={toggle}>
                <Link to={linkFunction} className="linkText">
                    <div className={`usernameBox--${randomN(numberOfStylesInCss)}`}>{props.user.attributes.username} says...</div>
                </Link>
                <div className="commentBox">{props.result.attributes.comment}</div>
            </div>
            <Modal isOpen={modal} toggle={toggle} className="editModal">
                <ModalHeader toggle={toggle}>{props.user.attributes.username} says...</ModalHeader>
                <ModalBody className="marginBottom detailsMarginTop">
                    <CommentForm
                        comment={props.comment}
                        setEditedComment={setEditedComment}
                        editedComment={editedComment}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button className="saveButtonColor" onClick={handleSubmit}>save</Button>{' '}
                    <Button className="reviewButtonColor" onClick={handleDelete}>delete</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    )
};

export default CommentCard