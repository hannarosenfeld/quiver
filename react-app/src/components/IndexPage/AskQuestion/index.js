import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addNewQuestionThunk, getAllQuestionsThunk } from "../../../store/question"
import OpenModalButton from "../../OpenModalButton";
import PostModal from "../../PostModal";

import "./AskQuestion.css"

function AskQuestion({ user }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState([]);
    const [errors, setErrors] = useState([]);
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
		const errors = {}
        let splitTitle

        if (title.length) {
            splitTitle = title.toLowerCase().split(" ")
            if (
                splitTitle[0] !== "who" && 
                splitTitle[0] !== "how" && 
                splitTitle[0] !== "why" && 
                splitTitle[0] !== "what" && 
                splitTitle[0] !== "where" &&
                splitTitle[0] !== "when" &&
                splitTitle[0] !== "which" &&
                splitTitle[0] !== "is"
                ) {
                    errors.questionWord = "Please start your question with a question word."
                    setErrors(errors)
                } if (title[title.length -1] !== '?') {
                    errors.questionMark = "Please end your question with a questionmark."
                    setHasErrors(true)
                    setErrors(errors)
            } else {
                setHasErrors(false)
            }
        }
		setErrors(errors)
	}, [title])

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

            if (!errors.questionMark && !errors.questionWord) {
                const questionDetails = {
                    title
                }
                const newQuestionDispatch = await dispatch(addNewQuestionThunk(questionDetails))
                await dispatch(getAllQuestionsThunk())
                setTitle("")
            } else {
                setHasErrors(true)
            }
    }

    return (
        <div>
            <div>
                <div className="ask-question-wrapper">
                    <div className="profile-pic"
                        style={{
                            backgroundImage: `url(${user.profile_pic})`, 
                            backgroundSize: "45px", 
                            backgroundPosition: "center"
                        }}>
                    </div>
                    <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Start your question with "What", "How", "Why", etc.'
                                required
                            />
                    </form>
                </div>
                <div>
                    <div style={{display: "flex", flexDirection: "column", color: "red", marginBottom: "1em", fontSize: "0.8em"}}>
                        {hasErrors && errors.questionWord ? <span>{errors.questionWord}</span> : ''}
                        {hasErrors && errors.questionMark ? <span>{errors.questionMark}</span> : ''}
                    </div>
                    <div className="post-button">
                        {/* {sessionUser.id === question.user.id ?  */}
                        <span> </span>
                        <OpenModalButton
                            buttonText={"Write a Post instead"}
                            modalComponent={<PostModal />}
                        />
                        {/* : ''}                                         */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion;