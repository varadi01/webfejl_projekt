import '../App.css';

import "primereact/resources/themes/lara-dark-purple/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";


import {Divider} from 'primereact/divider';

import {Image} from 'primereact/image';
import {Accordion, AccordionTab} from "primereact/accordion";
import {Menu} from "primereact/menu";
import React, {useEffect, useRef, useState} from "react";
import {DataScroller} from 'primereact/datascroller';
import {Panel} from 'primereact/panel';

import {Chip} from 'primereact/chip';
import {Card} from "primereact/card";
import {TabPanel, TabView} from "primereact/tabview";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {AutoComplete} from "primereact/autocomplete";
import Cookies from "js-cookie";


const baseUrl = "http://localhost:8080/"

let jwt = ""
let currentUser

export function FeedPage() {
    return PageLayout(Topbar, Sidebar, PostFeed)
}

export function ProfilePage() {
    return PageLayout(Topbar, Sidebar, Profile)
}

export function CommunityPage() {
    return PageLayout(Topbar, Sidebar, Community)
}

export function DiscoverComPage() {
    return PageLayout(Topbar, Sidebar, CommunityDiscover)
}

function PageLayout(top, side, content) {
    jwt = Cookies.get('jwt')
    currentUser = JSON.parse(Cookies.get('user'))
    return (
        <div className="flex flex-column m-0 p-0">
            {top()}
            <div className="flex flex-row m-0 p-0 h-full">
                {side()}
                {content()}
            </div>
        </div>
    )
}




const communityTemplate = (communityData) => {
    const header = (name, owner, id) => {
        //{communityData.name + "  owned by u/" + communityData.owner.username}
        //        <Link to={"/dash/community/" + communityData.id}>
        return (
            <div className="flex flex-row gap-2">
                <Link to={"/dash/community/" + id}>c/{name}</Link>
                <div className="text-color-secondary">
                    owned by
                </div>
                <Link to={"dash/profile/ + owner"}>u/{owner}</Link>
            </div>
        )
    }

    return (
        <Panel header={header(communityData.name, communityData.owner.username, communityData.id)}
               className="text-xl mb-2 mt-2">
            <p className="mt-0 mb-1 text-base">
                {communityData.description}
            </p>
        </Panel>
    )
}

function MakePostForm(visible, setVisible, def_com) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [com, setCom] = useState(def_com == undefined ? 0 : def_com)

    const [items, setItems] = useState([]);

    const [titleEmpty, setTitleEmpty] = useState(false)
    const [comEmpty, setComEmpty] = useState(false)

    useEffect(() => {


        const res2 = fetch(baseUrl + 'member/user/name/' + Cookies.get('username'), {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json().then((data) => {
            if (data[0] != null) { //TODO
                setItems(data.map((rec) => rec.name))
            }
        }))
    }, []);

    const search = () => {
        //TODO
    }

    const makePost = () => {
        if (title == "") {
            setTitleEmpty(true)
            return
        }
        if (com == 0) { //TODO
            setComEmpty(true)
            return;
        }
        const res = fetch(baseUrl + 'post/', {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "author": {
                    "id": currentUser.id
                },
                "title": title,
                "body": body,
                "community": {
                    "id": com
                }
            })
        }).then((res) => {
            if (res.status == 200) {
                setTitle("")
                setBody("")
                setVisible(false)
            } else {
                setTitle("")
                setBody("")
                setVisible(false)
                //setError(true)
            }
        })
    }

    return (
        <Dialog header="Make a post" visible={visible} style={{width: '25vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div className="flex flex-column p-3 gap-2">
                <span>Title your post!</span>
                <InputText value={title} onChange={(e) => setTitle(e.target.value)}
                           placeholder="Title" aria-describedby="title_empty"/>
                {titleEmpty ? <small id="title_empty">
                    Please title your post!
                </small> : null}

                <span>Write your post!</span>
                <InputTextarea autoResize value={body} onChange={(e) => setBody(e.target.value)}
                               rows={5} cols={30} placeholder="Post content"/>
                <span>Select where you'd like to post your post!</span>
                <AutoComplete value={com} suggestions={items} completeMethod={search}
                              onChange={(e) => setCom(e.value)} dropdown placeholder="Community"
                              aria-describedby="com_empty"/>
                {comEmpty ? <small id="com_empty">
                    Please select a community in which to post!
                </small> : null}

                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Post" onClick={() => makePost()}/>
                    <Button label="Cancel" onClick={() => {
                        setTitle("")
                        setBody("")
                        setCom(0)
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function MakeCommunityForm(visible, setVisible) {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [nameNotgiven, setNameNotgiven] = useState(false)
    const [error, setError] = useState(false)

    const makeCom = () => {
        if (name == "") {
            setNameNotgiven(true)
            return
        }
        //TODO NAME EXISTS
        const res = fetch(baseUrl + 'community/', {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "owner": {
                    "id": currentUser.id
                },
                "name": name,
                "description": desc
            })
        }).then((res) => {
            if (res.status == 200) {
                setDesc("")
                setName("")
                setVisible(false)
            } else {
                setDesc("")
                setName("")
                setVisible(false)
                setError(true)
            }
        })
    }

    return (
        <Dialog header="Create a Community" visible={visible} style={{width: '40vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div className="flex flex-column p-3 gap-2">
                {error ? setVisible(false) : null} //TODO

                <span>Name your Community!</span>
                <InputText value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="Name" required={true} aria-describedby="name_error"/>
                {nameNotgiven ? <small id="name_error">
                    Please give a name to your Community!
                </small> : null}

                <span>
                    <p>Give your Community a description!</p>
                    <p>Giving a detailed description of your community helps other users decide whether they'd like to join.<br/>
                        It's a good practice to: Describe what you'd like to discuss in your community, and establish rules that members should follow.
                    </p>
                </span>
                <InputTextarea autoResize value={desc} onChange={(e) => setDesc(e.target.value)}
                               rows={5} cols={30} placeholder="Community description"/>
                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Create" onClick={() => makeCom()}/>
                    <Button label="Cancel" onClick={() => {
                        setDesc("")
                        setName("")
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function EditCommunityForm(visible, setVisible, oldDesc, cid) {
    const [desc, setDesc] = useState(oldDesc) //TEST
    const [descEmpty, setDescEmpty] = useState(false)


    const editCom = () => {
        if (desc == "") {
            setDescEmpty(true)
            return
        }
        const res = fetch(baseUrl + 'community/update', {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "community_id": cid,
                "description": desc
            })
        }).then((res) => {
            if (res.status == 200) {
                setVisible(false)
            } else {
                setVisible(false)
                //setError(true)
            }
        })
    }

    return (
        <Dialog header="Edit your Community's description" visible={visible} style={{width: '30vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div className="flex flex-column p-3 gap-2">
                <span>
                    <p>Change your Community's description!</p>
                </span>
                <InputTextarea autoResize value={desc} onChange={(e) => setDesc(e.target.value)}
                               rows={5} cols={30} placeholder="Community description" aria-describedby="desc_error"/>
                {descEmpty ? <small id="desc_error">
                    Please give a description to your Community!
                </small> : null}

                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Change" onClick={() => editCom()}/>
                    <Button label="Cancel" onClick={() => {
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function PostView(visible, setVisible, postId) {
    const [comment, setComment] = useState("")
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const fetchAgain = () => {
        const res = fetch(baseUrl + 'post/byid/' + postId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((res) => res.json().then((data) => setPost(data)))

        const res2 = fetch(baseUrl + 'comment/' + postId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((res) => res.json().then((data) => setComments(data)))
    } //WORKS DONT TOUCH

    //WORKS DONT TOUCH
    if (postId != post.id) {
        fetchAgain()
    }

    useEffect(() => {
        if (postId == 0) {
            return
        }
        const res = fetch(baseUrl + 'post/byid/' + postId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((res) => res.json().then((data) => setPost(data)))

        const res2 = fetch(baseUrl + 'comment/' + postId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((res) => res.json().then((data) => setComments(data)))
    }, []);

    const vote = (v) => {
        const res = fetch(baseUrl + 'post/vote', {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "post_id": post.id,
                "vote": v
            })
        }).then((res) => res.status == 200 ? post.vote += v : null)
    }

    const voteC = (v, cid) => {
        const res = fetch(baseUrl + 'comment/vote', {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "comment_id": cid,
                "vote": v
            })
        })
    }

    let threads = comments.filter((c) => c.parent_comment == null)
    console.log(threads)

    const threadHeadTemplate = (data) => {
        let children = comments.filter((c) => c.parent_comment != null)
            .filter((c) => c.parent_comment.id == data.id)

        return (
            <Panel header={"u/" + data.author.username + " TODO ago"} className="text-base mb-2 p-0" toggleable>
                <div className="flex flex-row align-items-start m-0">
                    <div className="flex flex-column justify-content-center m-0 p-0">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => voteC(1, data.id)}/>
                        <div className="flex justify-content-center">{data.votes}</div>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text
                                onClick={() => voteC(-1, data.id)}/>
                    </div>
                    <div>
                        <p className="m-1 text-sm">
                            {data.text}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row align-content-center justify-content-center">
                    <InputText value={comment} onChange={(e) => setComment(e.target.value)}
                               placeholder="Write a comment"/>
                    {comment.length != 0 ?
                        <Button label="" icon="pi pi-check" style={{color: 'green'}} text onClick={
                            () => console.log(comment)
                            //TODO
                        }/> : null}
                    {comment.length != 0 ? <Button label="" icon="pi pi-times" style={{color: 'red'}} text onClick={
                        () => setComment("")
                    }/> : null}
                </div>
                <Divider className="m-1"/>
                {children.length != 0 ?
                    <DataScroller value={children} itemTemplate={threadBodyTemplate}
                                  rows={5} buffer={0.4}/> : null}
            </Panel>
        )
    }

    const threadBodyTemplate = (data) => {
        let children = comments.filter((c) => c.parent_comment != null)
            .filter((c) => c.parent_comment.id == data.id)


        return (
            <Panel header={"u/" + data.author.username + " TODO ago"} className="text-base mb-2 ml-0 p-0" toggleable>
                <div className="flex flex-row align-items-start m-0">
                    <div className="flex flex-column justify-content-center m-0 p-0">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => voteC(1, data.id)}/>
                        <div className="flex justify-content-center">{data.votes}</div>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text
                                onClick={() => voteC(-1, data.id)}/>
                    </div>
                    <div>
                        <p className="m-1 text-sm">
                            {data.text}
                        </p>
                    </div>
                </div>
                {children.length != 0 ?
                    <Divider className="m-1"/> : null}
                {children.length != 0 ?
                    <DataScroller value={children} itemTemplate={threadBodyTemplate}
                                  rows={5} buffer={0.4}/> : null}
            </Panel>
        )
    }

    return (
        <Dialog header={post.title}
                visible={visible} style={{width: '45vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <Divider className="m-0"/>
            <div className="flex flex-column">
                <div id="postPart">
                    <div className="flex flex-row justify-content-start gap-2 align-items-center">
                        <div className="flex flex-column justify-content-center">
                            <Button icon="pi pi-caret-up" rounded text onClick={() => vote(1)}></Button>
                            <div className="flex justify-content-center">{post.votes}</div>
                            <Button icon="pi pi-caret-down" severity="secondary" rounded text onClick={() => vote(-1)}/>
                        </div>
                        <Divider layout="vertical" className="ml-1 mr-1"/>
                        <div>
                            <p>
                                {post.body}
                            </p>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className="flex flex-row align-content-center justify-content-center">
                    <InputText value={comment} onChange={(e) => setComment(e.target.value)}
                               placeholder="Write a comment"/>
                    {comment.length != 0 ? <Button label="" icon="pi pi-check" style={{color: 'green'}} text onClick={
                        () => console.log(comment)
                        //TODO
                    }/> : null}
                    {comment.length != 0 ? <Button label="" icon="pi pi-times" style={{color: 'red'}} text onClick={
                        () => setComment("")
                    }/> : null}
                </div>
                <div id="commentsPart">
                    <div>
                        {threads.length != 0 ?
                            <DataScroller value={threads} itemTemplate={threadHeadTemplate}
                                          rows={5} buffer={0.4} header="Comments"/>
                            : null}
                    </div>
                </div>
            </div>

            {/*<div className="flex flex-column p-3 gap-2">*/}
            {/*    <span>*/}
            {/*        <p>Change your Community's description!</p>*/}
            {/*    </span>*/}
            {/*    <InputTextarea autoResize value={desc} onChange={(e) => setDesc(e.target.value)}*/}
            {/*                   rows={5} cols={30} placeholder="Community description" aria-describedby="desc_error"/>*/}
            {/*    {descEmpty ? <small id="desc_error">*/}
            {/*        Please give a description to your Community!*/}
            {/*    </small> : null}*/}

            {/*    <div className="flex flex-row justify-content-between mt-3 mb-0">*/}
            {/*        <Button label="Change" onClick={() => editCom()}/>*/}
            {/*        <Button label="Cancel" onClick={() => {*/}
            {/*            setVisible(false)*/}
            {/*        }}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Dialog>
    )
}

function EditBioDialog(visible, setVisible, oldBio, uid){
    const [newBio, setNewBio] = useState(oldBio)

    const editBio = () => {
        const res = fetch(baseUrl + 'user/bio', {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "bio": newBio
            })
        }).then((res) => {
            if (res.status == 200) {
                setVisible(false)
            } else {
                setVisible(false)
                //setError(true)
            }
        })
    }

    return (
        <Dialog header="Update your Bio" visible={visible} style={{width: '30vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div>
                <div>
                    <InputTextarea value={newBio} onChange={(e) => setNewBio(e.target.value)}
                                   rows={5} cols={50} className="m-1" autoResize placeholder="Biography"/>
                </div>
                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Change" onClick={() => editBio()}/>
                    <Button label="Cancel" onClick={() => {
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function Sidebar() {
    const navigate = useNavigate()
    const [topCommunitiesList, setTopCommunitiesList] = useState([])
    const [yourCommunitiesList, setYourCommunitiesList] = useState([])
    const [makeComVisible, setMakeComVisible] = useState(false)

    useEffect(() => {
        const res = fetch(baseUrl + 'community/', {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setTopCommunitiesList(data.map(
            (community) => <li key={community.id}><Link reloadDocument
                                                        to={"/dash/community/" + community.id}>{community.name}</Link>
            </li>
        )))

        const res2 = fetch(baseUrl + 'member/user/name/' + Cookies.get('username'), {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json())
            .then((data) => {
                if (data[0] != null) {
                    setYourCommunitiesList(data.map(
                        (community) => <li key={community.id}><Link reloadDocument
                                                                    to={"/dash/community/" + community.id}>{community.name}</Link>
                        </li>))
                }
            })

    }, []);

    function handleHomeButton() {
        navigate("/dash/feed") //TODO CHILDREN
    }

    function handlePopularButton() {
        navigate("/dash/feed") //TODO CHILDREN
    }

    function handleCommunitiesButton() {
        navigate("/dash/discover")
    }

    return (
        <div className="flex-row w-2 p-3 surface-card h-full">
            <Button label="Home" icon="pi pi-home" className="w-full" onClick={handleHomeButton}/>
            <Button label="Popular" icon="pi pi-arrow-up-right" className="w-full mt-3" onClick={handlePopularButton}/>
            <Divider className="p-4 m-0"/>
            <Button label="Browse Communities" icon="pi pi-globe" className="w-full mb-3"
                    onClick={() => handleCommunitiesButton()}/>

            <Accordion multiple activeIndex={[0, 1]}>
                <AccordionTab header="Top Communities">
                    <ul className="p-0 m-2">
                        {topCommunitiesList}
                    </ul>
                </AccordionTab>
                <AccordionTab header="Your Communities">
                    <Button label="Create a community" icon="pi pi-plus" className="w-full"
                            onClick={() => setMakeComVisible(true)}/>
                    {MakeCommunityForm(makeComVisible, setMakeComVisible)}
                    <ul className="p-0 m-2">
                        {yourCommunitiesList}
                    </ul>
                </AccordionTab>
            </Accordion>
        </div>
    )
}

function Topbar() {
    let items = [
        {label: 'Profile', icon: 'pi pi-fw pi-user'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'},
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out'}
    ];
    let menu = useRef < Menu > (items);

    useEffect(() => {

    }, []);

    return (
        <div className="flex flex-row justify-content-between align-items-center">
            <div className="flex-row flex align-items-start">
                <Image src="LOGO.png" alt="Logo" width="60"/>
                <h1 className="ml-2">Rabbit</h1>
            </div>
            <div>
                <InputText id="search" type="text" placeholder="Type here to search"/>
            </div>
            <div>
                <Menu model={items} popup={true}/>
                <Button icon="pi pi-bars" className="w-50" size="large"/>
            </div>
        </div>
    )
}

function PostFeed() {
    const [posts, setPosts] = useState([])
    const [makePostVisible, setMakePostVisible] = useState(false)
    const [postViewVisible, setPostViewVisible] = useState(false)
    const [postViewId, setPostViewId] = useState(1)

    useEffect(() => {
        const res = fetch(baseUrl + 'post/hot', {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setPosts(data))
    }, []);


    //parts
    const postTemplate = (postData) => {
        let truncatedPostBody = postData.body

        const vote = (v) => {
            const res = fetch(baseUrl + 'post/vote', {
                method: "PUT",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + jwt,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    "user_id": currentUser.id,
                    "post_id": postData.id,
                    "vote": v
                })
            }).then((res) => res.status == 200 ? postData.vote += v : null)
        }

        const postHeaderTemplate = (headerData) => {
            return (
                <div className="flex-column flex">
                    <div className="mt-1 mb-2 flex flex-row justify-content-between">
                        <span className="font-bold text-2xl">{postData.title}</span>
                        <div className="mr-4">
                            {headerData.togglerElement}
                        </div>
                    </div>
                    <div className="flex flex-row justify-content-start">
                        <div>
                        <span className="text-sm">
                            Posted in
                            c/{postData.community.name} by
                            <Link to={"/dash/profile/" + postData.author.id}>u/{postData.author.username}</Link>
                        </span>
                        </div>
                        <div>
                        <span className="p-text-secondary ml-2">
                            Posted {Date.now() - postData.created_at} ago
                        </span>
                        </div>
                    </div>

                </div>
            )
        }

        const postFooterTemplate = (footerData) => {

            return (
                <div className="flex flex-row">
                    <div className="flex align-items-center gap-2">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => vote(1)}></Button>
                        <span>{postData.votes}</span>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text onClick={() => vote(-1)}/>
                    </div>
                    <div className="ml-8">
                        <Button label="Comments" icon="pi pi-comments" rounded text onClick={() => {
                            setPostViewId(postData.id)
                            setPostViewVisible(true)
                        }}/>
                    </div>
                </div>
            )
        }

        return (
            <Panel headerTemplate={postHeaderTemplate} footerTemplate={postFooterTemplate} toggleable>
                <div className="flex flex-row justify-content-between">
                    <div>
                        {postData.edited && <Chip label="Edited"/>}
                        {postData.author.id == currentUser.id ? <Chip label="Authored by you"/> : null}
                    </div>
                    <div>
                        {postData.author.id == currentUser.id ?
                            <Button label="Edit" icon="pi pi-pencil" size="small"/> : null}
                    </div>
                </div>

                <p>
                    {truncatedPostBody}
                </p>
            </Panel>
        )
    }

    //should be deferred// probably is
    return (
        <div className="flex flex-column w-10 h-full">
            <div className="flex justify-content-center">
                <Button label="Create a post" onClick={() => setMakePostVisible(true)}/>
                {MakePostForm(makePostVisible, setMakePostVisible)}
                {PostView(postViewVisible, setPostViewVisible, postViewId)}
            </div>

            <DataScroller value={posts} itemTemplate={postTemplate} className="w-full ml-1" rows={20}
                          inline scrollHeight="2000px" header="Scroll Down to Load More"/>
        </div>
    )
}

function Profile() {
    const {userId} = useParams()
    const [user, setUser] = useState({})
    const [postsU, setPostsU] = useState([])
    const [commentsU, setCommentsU] = useState([])

    const [makePostVisible, setMakePostVisible] = useState(false)
    const [postViewVisible, setPostViewVisible] = useState(false)
    const [postViewId, setPostViewId] = useState(1)
    const [editBioVisible, setEditBioVisible] = useState(false)

    const fetchStuff = () => {

        const res = fetch(baseUrl + 'user/' + userId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setUser(data))

        const res2 = fetch(baseUrl + 'post/user/' + userId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setPostsU(data))

        const res3 = fetch(baseUrl + 'comment/user/' + userId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setCommentsU(data))
    }

    useEffect(() => {
        fetchStuff()
    }, []);

    const postTemplate = (postData) => {
        let truncatedPostBody = postData.body

        const vote = (v) => {
            const res = fetch(baseUrl + 'post/vote', {
                method: "PUT",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + jwt,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    "user_id": currentUser.id,
                    "post_id": postData.id,
                    "vote": v
                })
            }).then((res) => res.status == 200 ? postData.vote += v : null)
        }

        const postHeaderTemplate = (headerData) => {
            return (
                <div className="flex-column flex">
                    <div className="mt-1 mb-2 flex flex-row justify-content-between">
                        <span className="font-bold text-2xl">{postData.title}</span>
                        <div className="mr-4">
                            {headerData.togglerElement}
                        </div>
                    </div>
                    <div className="flex flex-row justify-content-start">
                        <div>
                        <span className="text-sm">
                            Posted in
                            c/{postData.community.name} by
                            <Link to={"/dash/profile/" + postData.author.id}>u/{postData.author.username}</Link>
                        </span>
                        </div>
                        <div>
                        <span className="p-text-secondary ml-2">
                            Posted {Date.now() - postData.created_at} ago
                        </span>
                        </div>
                    </div>

                </div>
            )
        }

        const postFooterTemplate = (footerData) => {

            return (
                <div className="flex flex-row">
                    <div className="flex align-items-center gap-2">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => vote(1)}></Button>
                        <span>{postData.votes}</span>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text onClick={() => vote(-1)}/>
                    </div>
                    <div className="ml-8">
                        <Button label="Comments" icon="pi pi-comments" rounded text onClick={() => {
                            setPostViewId(postData.id)
                            setPostViewVisible(true)
                        }}/>
                    </div>
                </div>
            )
        }

        return (
            <Panel headerTemplate={postHeaderTemplate} footerTemplate={postFooterTemplate} toggleable>
                <div className="flex flex-row justify-content-between">
                    <div>
                        {postData.edited && <Chip label="Edited"/>}
                    </div>
                    <div>
                        {postData.author.id == currentUser.id ?
                            <Button label="Edit" icon="pi pi-pencil" size="small"/> : null}
                    </div>
                </div>

                <p>
                    {truncatedPostBody}
                </p>
            </Panel>
        )
    }

    const commentTemplate = (commentData) => {
        let title = commentData.parent_comment == null ? ("By u/" + commentData.author.username
        ) : (
            "By u/" + commentData.author.username + " replying to u/" + commentData.parent_comment.author.username )
        return (
            <Panel header={title} toggleable className="pb-2 pt-2">
                <div className="flex flex-row">
                    <div className="flex flex-column justify-content-center m-0 p-0">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => voteC(1, commentData.id)}/>
                        <div className="flex justify-content-center">{commentData.votes}</div>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text
                                onClick={() => voteC(-1, commentData.id)}/>
                    </div>
                    <div>
                        <p className="m-0">
                            {commentData.text}
                        </p>
                    </div>
                </div>

            </Panel>
        )
    }

    const voteC = (v, cid) => {
        const res = fetch(baseUrl + 'comment/vote', {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "comment_id": cid,
                "vote": v
            })
        })
    }

    return (
        <div className="flex flex-column w-full">
            <Card title={user.display_name + "'s profile"} className="p-1 m-2">

                <p>User tag: u/{user.username} </p>
                Bio: <p>{user.bio}
            </p>
                {EditBioDialog(editBioVisible, setEditBioVisible, user.bio, userId)}
                {currentUser.id == userId &&
                    <Button label="Edit" icon="pi pi-pencil" onClick={() => setEditBioVisible(true)}/>}
            </Card>

            <TabView >
                <TabPanel header="Posts" className="">
                    <div className="flex flex-column w-10 h-full">
                        <div className="flex justify-content-center">
                            <Button label="Create a post" onClick={() => setMakePostVisible(true)}/>
                            {MakePostForm(makePostVisible, setMakePostVisible)}
                            {PostView(postViewVisible, setPostViewVisible, postViewId)}
                        </div>

                        <DataScroller value={postsU} itemTemplate={postTemplate} className="w-full ml-1" rows={20}
                                      inline scrollHeight="2000px" header="Scroll Down to Load More"/>
                    </div>
                </TabPanel>
                <TabPanel header="Comments">
                    <div>
                        <DataScroller value={commentsU} itemTemplate={commentTemplate} rows={5} inline scrollHeight="500px"
                                      header="Scroll Down to Load More"/>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    )
}

function Community() {
    const {communityId} = useParams()

    const [comName, setComName] = useState("")
    const [comDesc, setComDesc] = useState("")
    const [comOwner, setComOwner] = useState()

    const [posts, setPosts] = useState([])
    const [makePostVisibleC, setMakePostVisibleC] = useState(false)
    const [editVisible, setEditVisible] = useState(false)


    useEffect(() => {
        const res2 = fetch(baseUrl + 'community/' + communityId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => {
            setComName(data.name)
            setComOwner(data.owner)
            setComDesc(data.description)
        })

        const res = fetch(baseUrl + 'post/' + communityId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setPosts(data))
    }, []);

    //parts
    const postTemplate = (postData) => {
        let truncatedPostBody = postData.body

        const vote = (v) => {
            const res = fetch(baseUrl + 'post/vote', {
                method: "PUT",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + jwt,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    "user_id": currentUser.id,
                    "post_id": postData.id,
                    "vote": v
                })
            }).then((res) => res.status == 200 ? postData.vote += v : null)
        }

        const postHeaderTemplate = (headerData) => {
            return (
                <div className="flex-column flex">
                    <div className="mt-1 mb-2 flex flex-row justify-content-between">
                        <span className="font-bold text-2xl">{postData.title}</span>
                        <div className="mr-4">
                            {headerData.togglerElement}
                        </div>
                    </div>
                    <div className="flex flex-row justify-content-start">
                        <div>
                        <span className="text-sm">
                            Posted in
                            c/{postData.community.name}
                            by
                            u/{postData.author.username}
                        </span>
                        </div>
                        <div>
                        <span className="p-text-secondary ml-2">
                            Posted {Date.now() - postData.created_at} ago
                        </span>
                        </div>
                    </div>

                </div>
            )
        }

        const postFooterTemplate = (footerData) => {

            return (
                <div className="flex flex-row">
                    <div className="flex align-items-center gap-2">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => vote(1)}></Button>
                        <span>{postData.votes}</span>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text onClick={() => vote(-1)}/>
                    </div>
                    <div className="ml-8">
                        <Button label="Comments" icon="pi pi-comments" rounded text/>
                    </div>
                </div>
            )
        }

        return (
            <Panel headerTemplate={postHeaderTemplate} footerTemplate={postFooterTemplate} toggleable>
                <div className="flex flex-row justify-content-between">
                    <div>
                        {postData.edited && <Chip label="Edited"/>}
                        {postData.author.id == currentUser.id ? <Chip label="Authored by you"/> : null}
                    </div>
                    <div>
                        {postData.author.id == currentUser.id ?
                            <Button label="Edit" icon="pi pi-pencil" size="small"/> : null}
                    </div>
                </div>

                <p>
                    {truncatedPostBody}
                </p>
            </Panel>
        )
    }

    return (
        <div className="flex flex-column w-full">
            {EditCommunityForm(editVisible, setEditVisible, comDesc, communityId)}
            <Card title={comName} className="p-1 mt-0 ml-4 w-8">
                <p>NUMBER members</p>
                <p>Owned by: u/{comOwner == undefined ? null : comOwner.username}</p>
                Description: <p>{comDesc}</p>
                {comOwner != undefined && currentUser.id == comOwner.id &&
                    <Button label="Edit" icon="pi pi-pencil" onClick={() => setEditVisible(true)}/>}
            </Card>
            <Divider/>
            <div className="flex flex-column w-full h-full">
                <div className="flex justify-content-center">
                    <Button label="Create a post" onClick={() => setMakePostVisibleC(true)}/>
                    {MakePostForm(makePostVisibleC, setMakePostVisibleC, communityId)}
                </div>

                <DataScroller value={posts} itemTemplate={postTemplate} className="w-full ml-1" rows={5} inline
                              scrollHeight="500px" header="Scroll Down to Load More"/>
            </div>
        </div>
    )
}

function CommunityDiscover() {
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        const res = fetch(baseUrl + 'community/', {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setCommunities(data))
    }, []);

    return (
        <div className="flex flex-column w-10 h-full">
            <DataScroller value={communities} itemTemplate={communityTemplate} className="w-full ml-1" rows={20} inline
                          scrollHeight="2000px"/>
        </div>
    )
}
