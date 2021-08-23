import React, { useState, useContext } from 'react'
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import Tab from './Tab';
import TabContentProfile from './TabContents/Profile/TabContentProfile'
import TabContentAccount from './TabContents/Account/TabContentAccount';
import TabContentWelcome from './TabContents/TabContentWelcome'
import TabContentEvents from './TabContents/Events/TabContentEvents';
import TabContentRequests from './TabContents/Requests/TabContentRequests';
import TabContentVotes from './TabContents/Votes/TabContentVotes';
import AuthApi from '../../../Contexts/AuthApi'

function UserAreaTabs() {
    const Auth = useContext(AuthApi)
    const { path, url } = useRouteMatch();
    const [selectedTab, setSelectedTab] = useState('Welcome')
    const onTabSelect = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <section className="user-tabs-section">
            <div className="tabs">
                <Tab
                    url={url}
                    label='Account'
                    onClickHandler={onTabSelect}
                    selectedTab={selectedTab}
                />
                <Tab
                    url={url}
                    label='Votes'
                    onClickHandler={onTabSelect}
                    selectedTab={selectedTab}
                />
                {!!Auth.auth.is_artist &&
                    <>
                        <Tab
                            url={url}
                            label='Profile'
                            onClickHandler={onTabSelect}
                            selectedTab={selectedTab}
                        />
                        <Tab
                            url={url}
                            label='Events'
                            onClickHandler={onTabSelect}
                            selectedTab={selectedTab}
                        />
                        <Tab
                            url={url}
                            label='Requests'
                            onClickHandler={onTabSelect}
                            selectedTab={selectedTab}
                        />
                    </>}
            </div>

            <div className="contents">
                <Switch>
                    <Route path={`${path}/Welcome`}>
                        <TabContentWelcome />
                    </Route>
                    <Route path={`${path}/Account`}>
                        <TabContentAccount />
                    </Route>
                    <Route path={`${path}/Profile`}>
                        <TabContentProfile />
                    </Route>
                    <Route path={`${path}/Events`}>
                        <TabContentEvents />
                    </Route>
                    <Route path={`${path}/Votes`}>
                        <TabContentVotes />
                    </Route>
                    <Route path={`${path}/Requests`}>
                        <TabContentRequests />
                    </Route>
                </Switch>
            </div>

        </section>

    )
}

export default UserAreaTabs
