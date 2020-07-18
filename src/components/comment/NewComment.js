import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap"

const NewComment = props => {

    const [comment] = useState({comment: ""});

    const handleChange = (evt) => {
        const stateToChange = { ...comment };
        stateToChange[evt.target.id] = evt.target.value;
        props.setEditedComment(stateToChange);
    };

    return (
        <FormGroup>
            <Input
                id="comment"
                type="textarea"
                name="text" 
                onChange={handleChange}
                value="" />
        </FormGroup>
    );
};

export default NewComment;