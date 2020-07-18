import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import jAPI from "../../modules/apiManager";
import RecCard from "./RecCard";
import LoveHates from "../profile/LoveHates"
import mAPI from "../../modules/movieManager";
import "../search/Search.css"

const RecList = (props) => {

  const activeUserId = props.activeUserId

  const [recommendations, setRecommendations] = useState([]);
  const [topMatch, setTopMatch] = useState([]);
  const [changed, setChanged] = useState(false);

  let topMatchedUser = "";

  const recEngine = () => {

    return jAPI.userMovieExpand("loveHates", activeUserId)
      .then(userLoveHates => {
        const userHates = userLoveHates.filter(element => element.isHated === true);
        jAPI.movieExpand("loveHates")
          .then(overallLoveHates => {
            const overallHates = overallLoveHates.filter(olh => olh.userId !== activeUserId && olh.isHated === true);
            const sameSameArr = [];
            userHates.forEach(userHate => {
              for (let i = 0; i < overallHates.length; i++) {
                if (userHate.movieId === overallHates[i].movieId) {
                  sameSameArr.push(overallHates[i]);
                }
              }
            });

            const userIdArry = sameSameArr.map(object => object.userId);
            const userIdSet = [...new Set(userIdArry)];
            const userTallyArr = [];

            userIdSet.forEach(element => {
              const tallyObject = { userId: element, tally: 0 }
              userTallyArr.push(tallyObject);
            });;

            sameSameArr.forEach(sameSame => {
              for (let i = 0; i < userIdSet.length; i++) {
                if (sameSame.userId === userIdSet[i]) {
                  const tallyIndex = userTallyArr.findIndex(element => element.userId === sameSame.userId)
                  userTallyArr[tallyIndex].tally += 1
                }
              }
            });

            const tallyToSort = userTallyArr
            tallyToSort.sort(function compare(a, b) {
              if (a.tally > b.tally) {
                return -1;
              }
              if (a.tally < b.tally) {
                return 1;
              }
              return 0;
            })


            tallyToSort.length > 0 ? topMatchedUser = tallyToSort[0].userId : topMatchedUser = 1;


            jAPI.userMovieExpand("loveHates", topMatchedUser)
              .then(topMatchLoveHates => {
                const loveArr = [];
                const hateArr = [];
                topMatchLoveHates.forEach(lh => {

                  lh.isHated ? hateArr.push(lh) : loveArr.push(lh);

                })

                const loveArrPruned = loveArr.filter(lovedMovie => userLoveHates.filter(rated => lovedMovie.movieId !== rated.movieId));
                const loveArrToPrune = [];
                loveArr.map(lovedMovie => {
                  let count = 0
                  for (let i = 0; i < userLoveHates.length; i++) {
                    if (userLoveHates[i].movieId !== lovedMovie.movieId) { count++ }
                  }
                  if (count === userLoveHates.length) {
                    loveArrToPrune.push(lovedMovie)
                  }
                });

                jAPI.getWithId("users", topMatchedUser)
                  .then(matchedUser => setTopMatch(matchedUser));
                setRecommendations(loveArrToPrune);
              });
          });
      });
  };

  useEffect(() => {
    recEngine();
  }, []);

  if (recommendations.length === 0) {
    return (<h2>Waiting for more users and ratings to give you a sweet Recommendation!</h2>);
  } else {
    return (
      <>
        <h2 className="headline headlineGreen headlineTextBlack">Movies You Might'nt Hate</h2>
        <div className="headline headlineRed headlineTextWhite">From User:
        <Link to={`/${topMatch.id}`} className="linkText">
            {topMatch.username}
          </Link>
        </div>
        <div className="marginTop resultsPage">
          <div className="cardGroup">
            {recommendations.map(res => <RecCard changed={changed} setChanged={setChanged} activeUserId={activeUserId} key={res.id} result={res} recUpdated={props.recUpdated} setRecUpdated={props.setRecUpdated} recEngine={recEngine} mvid={res.movie.id}
              {...props} />)}
          </div>
        </div>
      </>
    );
  };
};

export default RecList;