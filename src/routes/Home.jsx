import { useState } from "react";
import Feeds from "../components/Feeds";
import PopularTags from "../components/PopularTags";
import TagContextProvider from "../contexts/TagContextProvider";

const Home = () => {
  return (
    <TagContextProvider>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <Feeds />
            </div>

            <div className="col-md-3">
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </TagContextProvider>
  );
};
export default Home;
