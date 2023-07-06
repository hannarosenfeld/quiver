import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import { getAllPostsThunk } from "../../store/post";

import { NavLink } from "react-router-dom";

import Question from "../Question"
import Post from "../Post";
import OpenModalButton from "../OpenModalButton";
import EditQuestionModal from "../EditQuestionModal"
import DeleteQuestionModal from "../DeleteQuestionModal";
import "./QuestionsList.css"

function QuestionsList() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const questionsObj = useSelector(state => state.question.question.questions)
    const questions = Object.values(questionsObj)
    const postsObj = useSelector(state => state.post.post.posts)
    const posts = Object.values(postsObj)
    const postsAndQuestions = [...posts, ...questions]
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
        dispatch(getAllPostsThunk())
    }, [dispatch])

    const sortedPostsAndQuestions = postsAndQuestions.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.created_at) - new Date(b.created_at);
    });

    for (let i = 0; i < sortedPostsAndQuestions.length; i++) {
        sortedPostsAndQuestions[i].unique_id = i
    }

    return (
        <div className="wrapper">
                <div className="homepage-wrapper">
                    <div className="question-list-wrapper">
                        <ul>
                        {sortedPostsAndQuestions.map(e => {
                            if (e.title) return (<li key={e.unique_id}><Question question={e} /></li>)
                            else return (<li key={e.unique_id}><Post post={e}/></li>)
                        })}
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default QuestionsList;