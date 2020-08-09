import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import dbAPI from "../../modules/dbAPI";
import LoveHates from "../profile/LoveHates"
import RecList from "../rec/RecList"
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


const UserProfile = props => {

    const userId = props.userId;
    const activeUserId = parseInt(sessionStorage.getItem("userId"));

    const [userObject, setUserObject] = useState(null);
    const [loveState, setLoveState] = useState([]);
    const [hateState, setHateState] = useState([]);
    const [recUpdated, setRecUpdated] = useState(false);
    const [isActiveUser, setIsActiveUser] = useState(false);
    const [refresh, setRefresh] = useState(null)
    const [userMoviesFound, setUserMoviesFound] = useState(null)

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const getUserObject = (id) => {
        return dbAPI.fetchObjectByClassNameAndId("User", id)
            .then(user => setUserObject(user))
    };
    async function getUserMovies(id) {
        return dbAPI.getLoveHates(id)
            .then(loveHates => {

                const loveArr = [];
                const hateArr = [];
                loveHates.forEach(lh => {

                    const pushObject = {
                        dbid: lh.attributes.dbid,
                        LHid: lh.id,
                        userId: lh.attributes.userId,
                        isHated: lh.attributes.isHated
                    }

                    if (lh.attributes.isHated !== true) {
                        loveArr.push(pushObject);
                    } else {
                        hateArr.push(pushObject);
                    }
                });

                setLoveState(loveArr);
                setHateState(hateArr);
                // setRefresh(true)
                setUserMoviesFound(true)
            });
    };

    useEffect(() => {
        getUserObject(userId);
        getUserMovies(userId);
        setRefresh(null)
    }, []);

    if (userMoviesFound === null) {return <div></div>}
    else {
    return (
        <>
            {userMoviesFound && userObject ?
                <>
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >HATES</NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >LOVES</NavLink>

                            </NavItem>
                        </Nav>

                        <TabContent activeTab={activeTab}>

                            <TabPane tabId="1">
                                <h2 className="headline headlineRed headlineTextBlack">{userObject.attributes.username}</h2>
                                <h2 className="headline headlineGreen headlineTextWhite">HATES</h2>
                                <div className="marginTop">
                                    <div id={`hate--${userObject.id}`} className="cardGroup">
                                        {hateState.map(res =>
                                            <LoveHates
                                                user={userObject}
                                                key={res.dbid}
                                                loveHateObject={res}
                                                getUserMovies={getUserMovies}
                                                getUserObject={getUserObject}
                                                userId={res.userId}
                                                recUpdated={recUpdated}
                                                setRecUpdated={setRecUpdated}
                                                activeUserId={activeUserId}
                                                isActiveUser={isActiveUser}
                                                setIsActiveUser={setIsActiveUser}
                                                {...props}

                                                movieObject={res}
                                            />)}
                                    </div>
                                </div>
                            </TabPane>

                            <TabPane tabId="2">
                                <h2 className="headline headlineGreen headlineTextBlack">{userObject.attributes.username}</h2>
                                <h2 className="headline headlineRed headlineTextWhite">LOVES</h2>
                                <div className="marginTop">
                                    <div id={`love--${userObject.id}`} className="cardGroup">
                                        {loveState.map(res =>
                                            <LoveHates
                                                user={userObject}
                                                key={res.dbid}
                                                loveHateObject={res}
                                                getUserMovies={getUserMovies}
                                                getUserObject={getUserObject}
                                                userId={userId}
                                                recUpdated={recUpdated}
                                                setRecUpdated={setRecUpdated}
                                                activeUserId={activeUserId}
                                                isActiveUser={isActiveUser}
                                                setIsActiveUser={setIsActiveUser}
                                                {...props}

                                                movieObject={res}
                                            />)}
                                    </div>
                                </div>
                            </TabPane>

                        </TabContent>
                    </div>
                </> : null} </>
    )}
};

export default UserProfile;