import React from "react";

const HomePage = (props) => {
  return (
    <div className="bodyContainer">
      <div>
        <div className="homePageHeader">
          <div className="homePage">h!pst@r</div>
          <div className="version1"> v.1</div>
        </div>
        <div>an app created by Michael Clark</div>
        <div>front-end capstone at Nashville Software School</div>
        <div>and powered by The Movie Database <a href="https://www.themoviedb.org/">(TMDB)</a></div>
        <div>check in again for future versions</div>
        <div>to get in touch please visit my <a href="https://www.linkedin.com/in/michaelclarknashville/" className="mdcLink">LinkedIn</a></div>
        <div>or my portfolio site at <a href="https://www.michaelclarknashville.com/"className="mdcLink">michaelclarknashville.com</a></div>
        <div>check it out on<a href="https://github.com/mister-michael/hipstar_back4app">Github</a>.</div>
      </div>
    </div>
  );
};

export default HomePage;
