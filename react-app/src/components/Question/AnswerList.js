import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnswersThunk } from "../../store/answer";


function AnswerList({ answers }) {
    const dispatch = useDispatch();
    const answersObj = useSelector(state => state.answer.answers)

    // useEffect(() => {
    //     dispatch(getAllAnswersThunk(questionId))
    // }, [])

    console.log(answers)


    return (
        <p></p>
    )
}

export default AnswerList