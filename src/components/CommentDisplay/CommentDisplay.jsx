import React, {useState} from "react";
import './comment.css';
const CommentDisplay = (props) =>{

    const [comment, setComment] = useState("")


    const changeHandler = (event) =>{
        setComment(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.postComment(comment)
    }

    return(
        <form> 
            <div className = "commentdisplay">
            <input className="input-comment" type ="search" id="form1" onChange = {changeHandler} value={comment} />
            <label ClassName ="form-label" htmlFor="form1"></label> 
            <button className="commentbutton" type= "submit" onClick= {submitHandler}> Comment</button> 
            </div>
        </form>
        
    )
}  


export default CommentDisplay;