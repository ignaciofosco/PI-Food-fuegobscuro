import React from "react";
import { Route, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import CreateForm from "./views/CreateForm/CreateForm";
import RecipeDetail from "./views/RecipeDetail/RecipeDetail";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="App">
      {!isLandingPage && <NavBar />}{" "}
      {/* Render the navigation bar if not on the landing page */}
      <Route exact path="/" component={Landing} />
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/recipes/:id" component={RecipeDetail} />
      <Route path="/create" component={CreateForm} />
    </div>
  );
}

export default App;
