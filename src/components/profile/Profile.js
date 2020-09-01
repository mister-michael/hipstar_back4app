import React, { useState, useEffect } from "react"
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import LoveHates from "./LoveHates";
import dbAPI from "../../modules/dbAPI";


const Profile = props => {

  const activeUserId = sessionStorage.getItem("userId");

  const [userObject, setUserObject] = useState(null);
  const [loveState, setLoveState] = useState([]);
  const [hateState, setHateState] = useState([]);
  const [recUpdated, setRecUpdated] = useState(null);
  const [isActiveUser, setIsActiveUser] = useState(true);

  async function getUserObject(userId) {
    return await dbAPI.fetchObjectByClassNameAndId("User", userId)
      .then(user => {
        setUserObject(user);
      });
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
          };

          if (lh.attributes.isHated !== true) {
            loveArr.push(pushObject);
          } else {
            hateArr.push(pushObject);
          }
        });

        setLoveState(loveArr);
        setHateState(hateArr);
      });
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getUserObject(activeUserId);
    getUserMovies(activeUserId);
  }, []);

  return (
    <>
      {userObject ?
        <div className="">
          <Nav tabs>
            <NavItem className="pointer">
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                HATES
          </NavLink>
            </NavItem>
            <NavItem className="pointer">
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                LOVES
          </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1" >
              <h2 className="headline headlineRed headlineTextBlack">{userObject.attributes.username}</h2>
              <h2 className="headline headlineGreen headlineTextWhite">HATES</h2>
              <div className="marginTop">
                <div id={`hate--${userObject.id}`}
                  className="cardGroup profileResultsPage">
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
                    <LoveHates key={res.dbid}
                      loveHateObject={res}
                      getUserMovies={getUserMovies}
                      getUserObject={getUserObject}
                      userId={res.userId}
                      recUpdated={recUpdated}
                      setRecUpdated={setRecUpdated}
                      isActiveUser={isActiveUser}
                      setIsActiveUser={setIsActiveUser}
                      {...props}

                      user={userObject}
                      movieObject={res}
                    />)

                  }
                </div>
              </div>
            </TabPane>
          </TabContent>
        </div>
        : null}
    </>
  );
};

export default Profile;