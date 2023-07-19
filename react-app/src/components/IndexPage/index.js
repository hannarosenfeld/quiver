import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import { getAllPostsThunk } from "../../store/post";

import AskQuestion from "./AskQuestion";
import Question from "../Question"
import Post from "../Post";
import "./IndexPage.css"

function IndexPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const questionsObj = useSelector(state => state.question.question.questions)
    const questions = Object.values(questionsObj)
    const postsObj = useSelector(state => state.post.post.posts)
    const posts = Object.values(postsObj)
    const postsAndQuestions = [...posts, ...questions]

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
        <div className="index-page-wrapper">
            <div className="index-page">
                <div className="spaces">
                    <div>   
                        <span>+ Create Space</span>
                    </div>
                </div>
                <div className="index-page-feed">
                    <AskQuestion user={sessionUser}/>
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
        </div>
    )
}

export default IndexPage;