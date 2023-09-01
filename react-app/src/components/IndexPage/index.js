import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import { getAllPostsThunk } from "../../store/post";

import AskQuestion from "./AskQuestion";
import Question from "./Question";
import Post from "./Post";
import "./IndexPage.css";

function IndexPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const questionsObj = useSelector((state) => state.question.question.questions);
  const questions = Object.values(questionsObj);
  const posts = useSelector((state) => state.post.allPosts); // Use 'state.post.allPosts' directly

  const postsAndQuestions = [...(posts || []), ...questions]; // Add a conditional check for posts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllQuestionsThunk());
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  useEffect(() => {
    // Check if posts and questions are available
    if (posts?.length > 0 && questions?.length > 0) {
      setLoading(false);
    }
  }, [posts, questions]);

  if (loading) {
    // Show a loading message or spinner while waiting for data
    return <div style={{minHeight: "77vh"}}>Loading...</div>;
  }

  const sortedPostsAndQuestions = postsAndQuestions?.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.created_at) - new Date(b.created_at);
  });

  // TODO: this is adding the unique_id to posts
  for (let i = 0; i < sortedPostsAndQuestions?.length; i++) {
    sortedPostsAndQuestions[i].unique_id = i;
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
          <AskQuestion user={sessionUser} />
          <div className="question-list-wrapper">
            <ul>
              {sortedPostsAndQuestions?.map((e) => {
                if (e.title) return <li key={e.unique_id}><Question question={e} /></li>;
                else return <li key={e.unique_id}><Post post={e} /></li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
