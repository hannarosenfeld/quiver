import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import IndexPage from "./components/IndexPage";
import QuestionPage from "./components/QuestionPage"
import ProfilePage from "./components/ProfilePage";
import Footer from "./components/Footer"



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {sessionUser ? (
              <>
                <Navigation isLoaded={isLoaded} />
                <IndexPage />
                <Footer />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/questions/:questionId">
            <Navigation isLoaded={isLoaded} />
            <QuestionPage />
            <Footer />
          </Route>
          <Route path="/profile/:userId">
            <Navigation isLoaded={isLoaded} />
            <ProfilePage />
            <Footer />
          </Route>
          <Route path="/login">
            <LoginFormPage />
            <Footer />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
            <Footer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;