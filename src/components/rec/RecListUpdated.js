import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import RecCardUpdated from "./RecCardUpdated";
import dbAPI from '../../modules/dbAPI';

const RecListUpdated = props => {

    const [recs, setRecs] = useState([]);
    const [matchedUserObject, setMatchedUserObject] = useState(null);

    const activeUserId = props.activeUserId;
    let topMatchedUser = "";

    async function getActiveUserHates() {
        const hatedDbidArray = [];
        await dbAPI.getHatesByUser(activeUserId)
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    hatedDbidArray.push(res[i].attributes.dbid);
                };
            });

        dbAPI.getAllHates()
            .then(res => {
                const otherUserHates = res.filter(h => h.attributes.userId !== activeUserId);
                const matchedArray = [];
                if (hatedDbidArray.length > 0) {
                    hatedDbidArray.forEach(dbid => {
                        if (otherUserHates.length > 0) {
                            for (let i = 0; i < otherUserHates.length; i++) {
                                if (otherUserHates[i].attributes.dbid !== dbid) {
                                    matchedArray.push(otherUserHates[i]);
                                };
                            };
                        };
                    });

                    const userIdArry = matchedArray.map(object => object.attributes.userId);
                    const userIdSet = [...new Set(userIdArry)];
                    const userTallyArr = [];

                    userIdSet.forEach(element => {
                        const tallyObject = { userId: element, tally: 0 };
                        userTallyArr.push(tallyObject);
                    });

                    matchedArray.forEach(matchedAarrayObject => {
                        for (let i = 0; i < userIdSet.length; i++) {
                            if (matchedAarrayObject.userId === userIdSet[i]) {
                                const tallyIndex = userTallyArr.findIndex(element => element.userId === matchedAarrayObject.userId);
                                userTallyArr[tallyIndex].tally += 1;
                            };
                        };
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
                    });

                    tallyToSort.length > 0 ? topMatchedUser = tallyToSort[0].userId : topMatchedUser = null;

                    let userLovedMovies = "";
                    
                    dbAPI.getLovesByUser(activeUserId)
                        .then(userLoves => {
                            userLovedMovies = userLoves;

                            dbAPI.getLovesByUser(topMatchedUser)
                                .then(topMatchedLoves => {
                                    setRecs(topMatchedLoves);

                                    dbAPI.fetchObjectByClassNameAndId("User", topMatchedUser)
                                        .then(res => {
                                            setMatchedUserObject(res);
                                        });
                                });
                        });
                };
            });
    };

    useEffect(() => {
        getActiveUserHates();
    }, []);

    if (recs.length === 0) {
        return (<h2>Waiting for more users and ratings to give you a sweet Recommendation!</h2>);
    } else if (matchedUserObject) {
        return (
            <>
                <h2 className="headline headlineGreen headlineTextBlack">Movies You Might'nt Hate</h2>
                <div className="headline headlineRed headlineTextWhite">From User:
            <Link to={`/${matchedUserObject.id}`} className="linkText">
                        {matchedUserObject.attributes.username}
                    </Link>
                </div>
                <div className="marginTop resultsPage">
                    <div className="cardGroup">
                        {recs.map(res => 
                        <RecCardUpdated key={res.id} result={res} dbid={res.attributes.dbid} activeUserId={activeUserId}/>)}
                    </div>
                </div>
            </>
        );
    } else {return (null)};
};

export default RecListUpdated;