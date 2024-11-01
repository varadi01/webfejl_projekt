import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-dark-purple/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";


import { Divider } from 'primereact/divider';
import { DeferredContent } from 'primereact/deferredcontent'; //MUST USE

import { Image } from 'primereact/image';
import {Accordion, AccordionTab} from "primereact/accordion";
import {Menu} from "primereact/menu";
import React, {useRef} from "react";
import { DataScroller } from 'primereact/datascroller';
import { Panel } from 'primereact/panel';

import { Chip } from 'primereact/chip';
import { Tag } from 'primereact/tag';
import {Card} from "primereact/card";
import {TabPanel, TabView} from "primereact/tabview";

function App() {
  return Community()
}

function feedPage(){
    return PageLayout(Topbar, Sidebar, postFeed)
}

function ProfilePage(){
    return PageLayout(Topbar, Sidebar, Profile)
}

function CommunityPage(){
    return PageLayout(Topbar, Sidebar, Community)
}

function PageLayout(top, side, content){
    return (
        <div className="grid m-0 p-0">
            <div className="col-12">
                {top}
            </div>
            <div className="col">
                {side}
            </div>
            <div className="col">
                {content}
            </div>
        </div>
    )
}


//parts
const postTemplate = (postData) => {
    //panel

    //community in which it is posted
    //author
    //ago
    //title
    const postHeaderTemplate = (headerData) => {

        return (
            <div className="flex ">
                <div className="justify-content-space-between">
                    <div className="flex align-items-center gap-2">
                        <span>
                            Posted in
                            c/link
                            by
                            u/link
                        </span>

                    </div>
                    <span className="p-text-secondary">Posted {} ago</span>
                </div>
                <span>TITLE</span>
            </div>
        )
    }


    //edited flair
    //body, if over x characters, truncate
    let truncatedPostBody

    //voting
    //comments
    const postFooterTemplate = (footerData) => {

        return (
            <div>
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-caret-up" rounded text></Button>
                    <span></span>
                    <Button icon="pi pi-caret-down" severity="secondary" rounded text></Button>
                </div>
                <div>
                    <Button label="Comments" icon="pi pi-comments" rounded text></Button>
                </div>
            </div>
        )
    }

    return (
        <Panel headerTemplate={postHeaderTemplate} footerTemplate={postFooterTemplate} toggleable>
            {true && <Chip label="Edited" />}
            <p>
                {truncatedPostBody}
            </p>
        </Panel>
    )
}

const commentTemplate = (commentData) => {
    let title = true ? ("By USER"
            ) : (
                "By USER replying to USER2")
    const children = []
    return (
        <Panel header={title} toggleable>
            <p>
                COMMENT BODY
            </p>
            <div>
                CHILDREN
            </div>
        </Panel>
    )
}

function loginPage() {
    return (<div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div className="text-center mb-5">
                <img src="../public/LOGO.png" alt="hyper" height={50} className="mb-3"/>
                <div className="text-900 text-3xl font-medium mb-3">Welcome to Rabbit!</div>
                <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
            </div>

            <div>
                <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3"/>

                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                <InputText id="password" type="password" placeholder="Password" className="w-full mb-3"/>

                <Button label="Sign In" icon="pi pi-user" className="w-full"/>
            </div>
        </div>
    </div>)
}

function Sidebar(){
    let topCommunitiesList = []
    let yourCommunitiesList  = []

    let communityListItems = []

    /*
    fetch("http://localhost:8080/community/cont/", {
        credentials: "same-origin"
    }).then((res) => topCommunitiesList= res.json()).then(
        communityListItems = topCommunitiesList.map(item =>
        <li key={item.id}>
            {item.name}
        </li>)
    )

     */


    return (
        <div className="w-4 p-3 surface-card">
            <Button label="Home" icon="pi pi-home" className="w-full"/>
            <Button label="Popular" icon="pi pi-arrow-up-right" className="w-full"/>
            <Divider className="p-0 m-0" />

            <Button label="Communities" icon="pi pi-globe" className="w-full"/>

            <Accordion multiple activeIndex={[0,1]}>
                <AccordionTab header="Top Communities" >
                    <ul>
                        {communityListItems}
                    </ul>
                </AccordionTab>
                <AccordionTab header="Your Communities">
                    <Button label="Create a community" icon="pi pi-plus" className="w-full"/>
                    Your Comm
                </AccordionTab>
            </Accordion>
        </div >
    )
}

function Topbar(){
    let items = [
        {label: 'Profile', icon: 'pi pi-fw pi-user'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'},
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out'}
    ];
    let menu = useRef<Menu>(null);

    return (
        <div className="grid p-3 ">
            <div className="col-2 align-content-center">
                <div className="grid p-0 text-center">
                    <Image src="LOGO.png" alt="Image" width="60"/>
                    <h1>Rabbit</h1>
                </div>
            </div>
            <div className="col-6 col-offset-1 align-content-endr">
                <InputText  id="search" type="text" placeholder="Type here to search" className="w-full mb-3"/>
            </div>
            <div className="col-2  col-offset-1 align-content-center">
                <Menu model={items} popup={true}/>
                <Button icon="pi pi-bars" className="w-50"/>

            </div>
            <Divider className="m-0 p-0"/>
        </div>

        //logo

        //searchbar??? user/community/post??

        //Settings
        //profile
    )
}

function postFeed() {
    let posts
    //should be deferred// probably is
    return (
        <DataScroller value={posts} itemTemplate={postTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
    )
}

function commentFeed(){
    let comments
    //should be deferred// probably is
    return (
        <DataScroller value={comments} itemTemplate={commentTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
    )
}

function Profile() {

    return (
        <div>
            <Card title="USER's profile" className="p-1">

                    <p>User tag: u/ </p>
                    Bio: <p>BIOGRAPHY
                    </p>

                {true &&
                    <Button label="Edit" icon="pi pi-pencil" />}
            </Card>

            <TabView>
                <TabPanel header="Posts">
                    {postFeed()}
                </TabPanel>
                <TabPanel header="Comments">
                    {commentFeed()}
                </TabPanel>
            </TabView>
        </div>
    )
}

function Community(){
    return (
        <div>
            <Card title="COMMUNITY NAME" className="p-1">
                <p>NUMBER members</p>
                <p>Owned by: USER</p>
                Description: <p>DESCRIPTION
            </p>

                {true &&
                    <Button label="Edit" icon="pi pi-pencil" />}
            </Card>
            <Divider />
            {postFeed()}
        </div>
    )
}

export default App;
