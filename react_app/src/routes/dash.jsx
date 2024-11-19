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
import {SelectButton} from "primereact/selectbutton";
import {Toast} from "primereact/toast";
import {Checkbox} from "primereact/checkbox";
import {Sidebar} from "primereact/sidebar";

import "../comment-thread-styling.css";


const baseUrl = "http://localhost:8080/"

let jwt = ""
let currentUser

export function FeedPage() {
    return PageLayout(Topbar, DashSidebar, PostFeed)
}

export function ProfilePage() {
    return PageLayout(Topbar, DashSidebar, Profile)
}

export function CommunityPage() {
    return PageLayout(Topbar, DashSidebar, Community)
}

export function DiscoverComPage() {
    return PageLayout(Topbar, DashSidebar, CommunityDiscover)
}

function PageLayout(top, side, content) {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    jwt = Cookies.get('jwt')
    currentUser = JSON.parse(Cookies.get('user'))
    return (

        <div className="m-0 p-0">
            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}
                     className="w-full  lg:w-20rem" modal={false} showCloseIcon={false} dismissable={false}>
                <div className="flex flex-column">
                    <div className="mb-2 align-self-end flex">
                        <Button icon="pi pi-arrow-left" onClick={() => setSidebarVisible(false)}/>
                    </div>
                    <DashSidebar/>
                </div>
            </Sidebar>
            <Sidebar visible={!sidebarVisible} onHide={() => setSidebarVisible(false)}
                     className="lg:w-5rem ml-0" modal={false} showCloseIcon={false}>
                <div className="m-0">
                    <Button icon="pi pi-arrow-right" onClick={() => setSidebarVisible(true)} className="m-0"/>
                </div>
            </Sidebar>
            <div className="flex flex-column ml-8 justify-content-center">
                <div className="flex align-self-center w-9">
                    {top()}
                </div>
                <div className="flex align-self-center w-8">
                    {content()}
                </div>
            </div>
        </div>
    )
}

//TODO setError(true)
//TODO comment edit
function CreateCommunityDialog(visible, setVisible) {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [nameNotgiven, setNameNotgiven] = useState(false)
    const [nameNotAvailable, setNameNotAvailable] = useState(false)
    const [error, setError] = useState(false)

    const makeCom = () => {
        if (name == "") {
            setNameNotgiven(true)
            return
        }
        setNameNotgiven(false)
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
                setNameNotAvailable(true)
            }
        })
        setNameNotAvailable(false)
    }

    return (
        <Dialog header="Create a Community" visible={visible} style={{width: '40vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div className="flex flex-column p-3 gap-2">
                <span>Name your Community!</span>
                <InputText value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="Name" required={true} aria-describedby="name_error"/>
                {nameNotgiven ? <small id="name_error">
                    Please give a name to your Community!
                </small> : (nameNotAvailable ? (
                    <small id="name_error">
                        This name is already taken. Please choose another one!
                    </small>
                ) : null)}

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

function EditCommunityDialog(visible, setVisible, oldDesc, cid) {
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

function DeleteCommunityDialog(visible, setVisible, cid) {
    const [deleteLocked, setDeleteLocked] = useState(true)
    const deleteCommunity = () => {
        const res = fetch(baseUrl + 'community/del_com', {
            method: "DELETE",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "community_id": cid,
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
        <Dialog header="Are you sure you want to delete this Community?" visible={visible} style={{width: '20vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div className="flex flex-column">
                <div>
                    <p>
                        Are you REALLY sure you want to delete this Community?
                    </p>
                    <p>
                        All traces of this community will be removed! All posts and comments will be removed!
                        Please consider the feelings of the community's members.
                    </p>
                </div>
                <div className="flex flex-row justify-content-center align-items-center">
                    <div>
                        Check this, to enable the Delete button
                    </div>
                    <Checkbox onChange={e => setDeleteLocked(!deleteLocked)} checked={!deleteLocked}></Checkbox>
                </div>
                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Delete" disabled={deleteLocked} onClick={() => {
                        deleteCommunity()
                        setVisible(false)
                    }}/>
                    <Button label="Cancel" onClick={() => {
                        setDeleteLocked(true)
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function EditBioDialog(visible, setVisible, oldBio, uid) {
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

function ReplyToCommentDialog(visible, setVisible, comment) {
    const [newComment, setNewComment] = useState("")

    const registerComment = () => {
        //cant be empty bc, of how we handle buttons
        const res = fetch(baseUrl + 'comment/', {
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
                "post": {
                    "id": comment.post.id
                },
                "parent_comment": {
                    "id": comment.id
                },
                "text": newComment
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
        <Dialog header="Reply to comment" visible={visible} style={{width: '30vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div>
                <div>
                    <p>
                        {comment.text}
                    </p>
                    <p className="text-color-secondary">
                        By u/{comment.author.username}
                    </p>
                </div>
                <Divider/>
                <div>
                    <InputText value={newComment} onChange={(e) => setNewComment(e.target.value)}
                               placeholder="Write a comment" className="w-8"/>
                    {newComment.length != 0 ?
                        <Button label="" icon="pi pi-check" style={{color: 'green'}} text onClick={() =>
                            registerComment()
                        }/> : null}
                    {newComment.length != 0 ?
                        <Button label="" icon="pi pi-times" style={{color: 'red'}} text onClick={() =>
                            setNewComment("")
                        }/> : null}
                </div>
            </div>
        </Dialog>
    )
}

function PostView(visible, setVisible, postId) {
    const [comment, setComment] = useState("")
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [showReply, setShowReply] = useState(false)
    const [replyComment, setReplyComment] = useState({
        "author": "",
    })

    const fetchAgain = () => {
        fetch(baseUrl + 'post/byid/' + postId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((res) => res.json().then((data) => setPost(data)));
        const res2 = fetch(baseUrl + 'comment/' + postId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((res) => res.json().then((data) => setComments(data)))
    } //WORKS DONT TOUCH

    const registerComment = () => {
        //cant be empty bc, of how we handle buttons
        const res = fetch(baseUrl + 'comment/', {
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
                "post": {
                    "id": post.id
                },
                "text": comment
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


    const threadHeadTemplate = (data) => {
        let children = comments.filter((c) => c.parent_comment != null)
            .filter((c) => c.parent_comment.id == data.id)

        const headerC = () => {
            return (
                <div>
                    {
                        (data.parent_comment == null) ? (<div>
                            Commented by <Link to={"/dash/profile/" + data.author.id}>
                            u/{data.author.username}</Link>
                            on
                            {data.post.title.substring(0, 25)}
                        </div>) : (<div>
                            Commented by <Link to={"/dash/profile/" + data.author.id}>
                            u/{data.author.username}</Link>
                            replying to
                            <Link
                                to={"/dash/profile/" + data.parent_comment.author.id}>u/{data.parent_comment.author.username}</Link>
                        </div>)
                    }
                </div>
            )
        }

        return (
            <Panel header={headerC()} className="text-base mb-2 p-0" toggleable>
                <div className="flex flex-row m-0">
                    <div className="flex flex-column justify-content-center m-0 p-0">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => voteC(1, data.id)}/>
                        <div className="flex justify-content-center">{data.votes}</div>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text
                                onClick={() => voteC(-1, data.id)}/>
                    </div>
                    <div>
                        <p className="text-color-secondary m-0 p-0">
                            Commented {convertDateTimeToAgo(data.created_at)}
                        </p>
                        <p className="m-1 text-sm">
                            {data.text}
                        </p>
                    </div>
                    <div className="">
                        <Button icon="pi pi-reply" label="Reply" size="small" onClick={() => {
                            setShowReply(true)
                            setReplyComment(data)
                        }}/>
                    </div>
                </div>
                <div className="flex flex-row align-content-center justify-content-center">

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

        const headerC = () => {
            return (
                <div>
                    {
                        (data.parent_comment == null) ? (<div>
                            Commented by <Link to={"/dash/profile/" + data.author.id}>
                            u/{data.author.username}</Link>
                            on
                            {data.post.title.substring(0, 25)}
                        </div>) : (<div>
                            Commented by <Link to={"/dash/profile/" + data.author.id}>
                            u/{data.author.username}</Link>
                            replying to
                            <Link
                                to={"/dash/profile/" + data.parent_comment.author.id}>u/{data.parent_comment.author.username}</Link>
                        </div>)
                    }
                </div>
            )
        }

        return (
            <Panel header={headerC()} className="text-base mb-2 ml-0 p-0 comment-thread" toggleable>
                <div className="flex flex-row align-items-start m-0">
                    <div className="flex flex-column justify-content-center m-0 p-0">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => voteC(1, data.id)}/>
                        <div className="flex justify-content-center">{data.votes}</div>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text
                                onClick={() => voteC(-1, data.id)}/>
                    </div>
                    <div>
                        <p className="text-color-secondary m-0 p-0">
                            Commented {convertDateTimeToAgo(data.created_at)}
                        </p>
                        <p className="m-1 text-sm">
                            {data.text}
                        </p>
                    </div>
                    <div className="">
                        <Button icon="pi pi-reply" label="Reply" size="small" onClick={() => {
                            setShowReply(true)
                            setReplyComment(data)
                        }}/>
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
            {ReplyToCommentDialog(showReply, setShowReply, replyComment)}
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
                    <div className="flex justify-content-center">
                        <InputText value={comment} onChange={(e) => setComment(e.target.value)}
                                   placeholder="Write a comment" className="w-6"/>
                        {comment.length != 0 ?
                            <Button label="" icon="pi pi-check" style={{color: 'green'}} text onClick={
                                () => {
                                    registerComment()
                                    setComment("")
                                }
                            }/> : null}
                        {comment.length != 0 ? <Button label="" icon="pi pi-times" style={{color: 'red'}} text onClick={
                            () => setComment("")
                        }/> : null}
                    </div>
                </div>
                <Divider/>
                <div className="flex flex-row align-content-center justify-content-center">
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

function CreatePostDialog(visible, setVisible, def_com) {
    //TODO doesent automatically insert com in comview
    const [items, setItems] = useState([]);
    const [initialItems, setInitialItems] = useState([])
    const [joinedCommunities, setJoinedCommunities] = useState([])

    const [titleEmpty, setTitleEmpty] = useState(false)
    const [comEmpty, setComEmpty] = useState(false)
    const [illegalPlaceOfPost, setIllegalPlaceOfPost] = useState(false)

    const translateComNameToId = (name) => {
        try {
            return joinedCommunities.find((c) => c.name == comName).id
        } catch (e) {
            return 0
        }

    }

    const translateComIdToName = (id) => {
        try {
            return joinedCommunities.filter((c) => c.id == id)[0].name
        } catch (e) {
            return ""
        }
    }

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [comName, setComName] = useState("")

    useEffect(() => {
        const res2 = fetch(baseUrl + 'member/user/name/' + Cookies.get('username'), {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json().then((data) => {
            setJoinedCommunities(data)
            setInitialItems(data.map((rec) => rec.name))
            setItems(initialItems)
        }))
    }, []);

    const search = () => {
        let filteredItems = initialItems.filter((i) => i.toString().includes(comName))
        setItems(filteredItems)
    }

    const makePost = () => {
        if (title == "") {
            setTitleEmpty(true)
            return
        }
        if (comName == "") {
            setComEmpty(true)
            return;
        }
        setComEmpty(false)
        if (joinedCommunities.find((c) => c.name == comName) == undefined){
            setIllegalPlaceOfPost(true)
            return;
        }
        setIllegalPlaceOfPost(false)

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
                    "id": translateComNameToId(comName)
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
                <AutoComplete value={comName} suggestions={items} completeMethod={search}
                              onChange={(e) => {
                                  setComName(e.value)
                              }} dropdown placeholder="Community"
                              aria-describedby="com_empty"/>
                {comEmpty ? (<small id="com_empty">
                    Please select a community in which to post!
                </small>) : (
                    (!illegalPlaceOfPost) ? null : <small id="com_empty">
                        You can only post in communities you have joined!</small>
                )}


                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Post" onClick={() => {
                        makePost()
                    }}/>

                    <Button label="Cancel" onClick={() => {
                        setTitle("")
                        setBody("")
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function EditPostDialog(visible, setVisible, pid, oldBody) {
    const [newBody, setNewBody] = useState(oldBody)
    //TODO initialize newBody as oldBody
    const editpost = () => {
        const res = fetch(baseUrl + 'post/update', {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "post_id": pid,
                "body": newBody
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
        <Dialog header="Update post" visible={visible} style={{width: '30vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div>
                <div>

                    <InputTextarea value={newBody} onChange={(e) => setNewBody(e.target.value)}
                                   rows={5} cols={50} className="m-1" autoResize placeholder="Post body"/>
                </div>
                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Change" onClick={() => {
                        editpost()
                        setVisible(false)
                    }}/>
                    <Button label="Cancel" onClick={() => {
                        setNewBody(oldBody)
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function DeletePostDialog(visible, setVisible, pid) {
    const deletePost = () => {
        const res = fetch(baseUrl + 'post/del', {
            method: "DELETE",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "post_id": pid,
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
        <Dialog header="Are you sure you want to delete this post?" visible={visible} style={{width: '20vw'}}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
            <div className="flex flex-column">
                <div>
                    Are you sure you want to delete this post?
                </div>
                <div className="flex flex-row justify-content-between mt-3 mb-0">
                    <Button label="Delete" onClick={() => {
                        deletePost()
                        setVisible(false)
                    }}
                            severity="danger"/>
                    <Button label="Cancel" onClick={() => {
                        setVisible(false)
                    }}/>
                </div>
            </div>
        </Dialog>
    )
}

function PostDataScroller(com_id = null, usr_id = null) {
    const [posts, setPosts] = useState([])
    const [makePostVisible, setMakePostVisible] = useState(false)
    const [postViewVisible, setPostViewVisible] = useState(false)
    const [postViewId, setPostViewId] = useState(1)
    const [editPostVisible, setEditPostVisible] = useState(false)
    const [postEditId, setPostEditId] = useState(0)
    const [postEditBody, setPostEditBody] = useState("")
    const [deletePostVisible, setDeletePostVisible] = useState(false)
    const [postDeleteId, setPostDeleteId] = useState(0)
    const [passedComId, setPassedComId] = useState(com_id)

    useEffect(() => {
        //basic feed
        if (com_id == null && usr_id == null) {
            const res = fetch(baseUrl + 'post/hot', {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + jwt
                }
            }).then((res) => res.json()).then((data) => setPosts(data))
        }
        //profile feed
        if (com_id == null && usr_id != null) {
            const res = fetch(baseUrl + 'post/user/' + usr_id, {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + jwt
                }
            }).then((res) => res.json()).then((data) => setPosts(data))
        }
        //community feed
        if (usr_id == null && com_id != null) {
            const res = fetch(baseUrl + 'post/' + com_id, {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + jwt
                }
            }).then((res) => res.json()).then((data) => setPosts(data))
        }
    }, []);

    const postTemplate = (postData) => {
        let truncatedPostBody = postData.body.substring(0, 200)

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

        const postHeaderTemplate = () => {
            return (
                <div className="flex-column flex">
                    <div className="mt-1 mb-2 flex flex-row justify-content-between">
                        <span className="font-bold text-2xl">{postData.title}</span>
                    </div>
                    <div className="flex flex-row justify-content-start">
                        <div>
                        <span className="text-sm">
                            Posted in
                            <Link to={"/dash/community/" + postData.community.id}>c/{postData.community.name}</Link>
                            by
                            <Link to={"/dash/profile/" + postData.author.id}>u/{postData.author.username}</Link>
                        </span>
                        </div>
                        <div>
                        <span className="p-text-secondary ml-2">
                            Posted {convertDateTimeToAgo(postData.created_at)}
                        </span>
                        </div>
                    </div>

                </div>
            )
        }

        const postFooterTemplate = (footerData) => {

            return (
                <div className="flex flex-row mt-0 mb-2">
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
            <Panel header={postHeaderTemplate} footerTemplate={postFooterTemplate} toggleable className="mt-1">
                <div className="flex flex-row justify-content-between">
                    <div>
                        {postData.edited && <Chip label="Edited"/>}
                        {postData.author.id == currentUser.id ? <Chip label="Authored by you"/> : null}
                    </div>
                    <div className="flex flex-row gap-1">
                        {postData.author.id == currentUser.id ?
                            <Button label="Edit" icon="pi pi-pencil" size="small" onClick={() => {
                                setEditPostVisible(true)
                                setPostEditId(postData.id)
                            }}/>
                            : null}
                        {postData.author.id == currentUser.id ?
                            <Button label="Delete" icon="pi pi-trash" size="small"
                                    onClick={() => {
                                        setDeletePostVisible(true)
                                        setPostDeleteId(postData.id)
                                    }} severity="danger"/>
                            : null}
                    </div>
                </div>
                <div onClick={() => {
                    setPostViewId(postData.id)
                    setPostViewVisible(true)
                }}>
                    <p>
                        {truncatedPostBody}
                    </p>
                </div>

            </Panel>
        )
    }

    return (
        <div>
            <div className="flex justify-content-start">
                <Button label="Create a post" onClick={() => setMakePostVisible(true)}/>
            </div>
            <Divider/>
            {CreatePostDialog(makePostVisible, setMakePostVisible, passedComId)}
            {PostView(postViewVisible, setPostViewVisible, postViewId)}
            {EditPostDialog(editPostVisible, setEditPostVisible, postEditId, postEditBody)}
            {DeletePostDialog(deletePostVisible, setDeletePostVisible, postDeleteId)}
            <DataScroller value={posts} itemTemplate={postTemplate} className="w-full ml-1" rows={20}
                          inline scrollHeight="2000px"/>
        </div>
    )
}

function DashSidebar() {
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
        navigate("/dash/feed")
    }

    function handlePopularButton() {
        navigate("/dash/feed") //TODO CHILDREN
    }

    function handleCommunitiesButton() {
        navigate("/dash/discover")
    }

    return (
        <div className="flex flex-column w-full p-1 surface-card h-full">
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
                    {CreateCommunityDialog(makeComVisible, setMakeComVisible)}
                    <ul className="p-0 m-2">
                        {yourCommunitiesList}
                    </ul>
                </AccordionTab>
            </Accordion>
        </div>
    )
}

function Topbar() {
    const navigate = useNavigate()
    const menu = useRef(null)
    const toast = useRef(null)

    const [searchString, setSearchString] = useState("")
    const [searchItems, setSearchItems] = useState([])
    const [initialSearchItems, setInitialSearchItems] = useState([])

    const searchmode = Object.freeze({
        COMMUNITY : "c",
        USER : "u",
        POST : "p"
    })
    const [searchMode, setSearchMode] = useState(searchmode.COMMUNITY)

    const completeSearch = () => {
        switch (searchMode){
            case searchmode.COMMUNITY:
                let cid = initialSearchItems.find((c) => c.name == searchString).id
                navigate("/dash/community/" + cid)
                break
            case searchmode.USER:
                let pid = initialSearchItems.find((c) => c.username == searchString).id
                navigate("/dash/profile/" + pid)
                break
        }
    }

    function logout() {
        const res = fetch(baseUrl + 'logout', {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        })
        Cookies.remove("jwt")
        navigate("/login")
    }

    let items = [
            {
                label: "Menu",
                items: [
                    {
                        label: 'Profile', icon: 'pi pi-fw pi-user',
                        command: () => navigate("/dash/profile/" + currentUser.id)
                    },
                    {
                        label: 'Settings', icon: 'pi pi-fw pi-cog',
                        command: () => null
                    },
                    {
                        label: 'Logout', icon: 'pi pi-fw pi-sign-out',
                        command: () => logout()
                    }
                ]
            }
        ]
    ;

    const fetchUsers = () => {
        const res = fetch(baseUrl + 'user/', {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setInitialSearchItems(data))
    }

    const fetchCommunities = () => {
        const res = fetch(baseUrl + 'community/', {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setInitialSearchItems(data))
    }

    const search = () => {
        if (!searchString.includes("/")) {
            setSearchItems(["u/  -> Users", "c/  -> Communities"])
            setInitialSearchItems([])
        } else {
            if (initialSearchItems.length == 0) {
                if (searchString.includes("u/")) {
                    fetchUsers()
                    setSearchMode(searchmode.USER)
                }
                if (searchString.includes("c/")) {
                    fetchCommunities()
                    setSearchMode(searchmode.COMMUNITY)
                }
            } else {
                if (searchString.includes("u/")) {
                    let filteredItems = initialSearchItems.map((item => item.username))
                        .filter((i) => i.toString().includes(searchString.substring(2)))

                    setSearchItems(filteredItems)
                }
                if (searchString.includes("c/")) {
                    let filteredItems = initialSearchItems.map((item => item.name))
                        .filter((i) => i.toString().includes(searchString.substring(2)))
                    setSearchItems(filteredItems)
                }

            }
        }

    }

    return (
        <div className="flex flex-row justify-content-between align-items-center ml-3 mr-3 w-full">
            <div className="flex-row flex align-items-start">
                <Image src="/LOGO.png" alt="Logo" width="75"/>
                <h1 className="ml-2">Rabbit</h1>
            </div>
            <div>
                <AutoComplete value={searchString} suggestions={searchItems} dropdown
                              completeMethod={search} onChange={(e) => setSearchString(e.value)}
                              placeholder="Search Communities/Users/Posts" className="w-30rem"/>
                <Button className="ml-1" icon="pi pi-search" onClick={() => completeSearch()}/>
            </div>
            <div>
                <Toast ref={toast}></Toast>
                <Menu model={items} popup ref={menu} id="popup_menu"/>
                <Button icon="pi pi-bars" className="w-50" size="large"
                        onClick={(event) => menu.current.toggle(event)}
                        aria-controls="popup_menu" aria-haspopup/>
            </div>
        </div>
    )
}

function PostFeed() {
    return (
        <div className="flex flex-column w-full h-full">
            <Card title="Feed">
                {PostDataScroller(null, null)}
            </Card>
        </div>
    )
}

function Profile() {
    const {userId} = useParams()
    const [user, setUser] = useState({})
    const [commentsU, setCommentsU] = useState([])

    const [postViewVisible, setPostViewVisible] = useState(false)
    const [postViewId, setPostViewId] = useState(1)
    const [editBioVisible, setEditBioVisible] = useState(false)
    const [commentUnderEdit, setCommentUnderEdit] = useState(0)
    const [editedComment, setEditedComment] = useState("")

    const fetchStuff = () => {

        const res = fetch(baseUrl + 'user/' + userId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setUser(data))

        const res3 = fetch(baseUrl + 'comment/user/' + userId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setCommentsU(data))
    }

    const editComment = () => {
        const res = fetch(baseUrl + 'comment/update', {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "user_id": currentUser.id,
                "comment_id": commentUnderEdit,
                "body": editedComment
            })
        }).then((res) => {
            if (res.status == 200) {
                setCommentUnderEdit(0)
            } else {
                setCommentUnderEdit(0)
                //setError(true)
            }
        })
    }

    useEffect(() => {
        fetchStuff()
    }, []);

    const commentTemplate = (commentData) => {
        const headerC = () => {
            return (
                <div onClick={() => {
                    setPostViewVisible(true)
                    setPostViewId(commentData.post.id)
                }}>
                    {
                        (commentData.parent_comment == null) ? (<div>
                            Commented by <Link to={"/dash/profile/" + commentData.author.id}>
                            u/{commentData.author.username}</Link>
                            on
                            {commentData.post.title.substring(0, 25)}
                        </div>) : (<div>
                            Commented by <Link to={"/dash/profile/" + commentData.author.id}>
                            u/{commentData.author.username}</Link>
                            replying to
                            <Link
                                to={"/dash/profile/" + commentData.parent_comment.author.id}>u/{commentData.parent_comment.author.username}</Link>
                        </div>)
                    }
                </div>
            )
        }
        return (
            <Panel header={headerC} toggleable className="pb-2 pt-2">
                <div className="flex flex-row m-0 p-0">
                    <div className="flex flex-column justify-content-center m-0 p-0">
                        <Button icon="pi pi-caret-up" rounded text onClick={() => voteC(1, commentData.id)}/>
                        <div className="flex justify-content-center">{commentData.votes}</div>
                        <Button icon="pi pi-caret-down" severity="secondary" rounded text
                                onClick={() => voteC(-1, commentData.id)}/>
                    </div>
                    <div className="flex flex-row justify-content-between w-full" >
                        <div>
                            <p className="text-color-secondary">Commented {convertDateTimeToAgo(commentData.created_at)}</p>
                            <div className="m-0 p-0">
                                <p className="m-0">
                                    {commentUnderEdit == commentData.id ?
                                        <div>
                                            {editedComment.length ==0 ? setEditedComment(commentData.text) : null}
                                            <InputTextarea value={editedComment}
                                                           onChange={(e) => setEditedComment(e.target.value)}
                                                           autoResize placeholder="Edited comment"/>
                                            {editedComment.length != 0 ?
                                                <Button label="" icon="pi pi-check" style={{color: 'green'}} text onClick={
                                                    () => {
                                                        editComment()
                                                    }
                                                }/> : null}
                                            {editedComment.length != 0 ? <Button label="" icon="pi pi-times" style={{color: 'red'}} text onClick={
                                                () => setCommentUnderEdit(0)
                                            }/> : null}
                                        </div>
                                    :
                                        (commentData.text)}

                                </p>
                            </div>
                        </div>
                        <div>
                            <Button label="Edit" icon="pi pi-pencil" size="small" onClick={() => setCommentUnderEdit(commentData.id)}/>
                        </div>
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
            <Card title={user.display_name + "'s profile"} className="p-1 mb-1 text-lg">

                <p>User tag: u/{user.username} </p>
                Bio: <p>{user.bio}
            </p>
                {EditBioDialog(editBioVisible, setEditBioVisible, user.bio, userId)}
                {currentUser.id == userId &&
                    <Button label="Edit" icon="pi pi-pencil" onClick={() => setEditBioVisible(true)}/>}
            </Card>

            <TabView className="text-lg ">
                <TabPanel header="Posts" className="">
                    <div className="flex flex-column w-10 h-full">
                        {PostDataScroller(null, userId)}
                    </div>
                </TabPanel>
                <TabPanel header="Comments">
                    <div>
                        {PostView(postViewVisible, setPostViewVisible, postViewId)}
                        <DataScroller value={commentsU} itemTemplate={commentTemplate} rows={10}
                                      scrollHeight="2000px"
                        />
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
    const [numberOfMembers, setNumberOfMembers] = useState(0)

    const [editVisible, setEditVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)

    const [joinedCommunities, setJoinedCommunities] = useState([])

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

        const res3 = fetch(baseUrl + 'member/com/' + communityId, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.text().then((data) => setNumberOfMembers(parseInt(data))))

        const res4 = fetch(baseUrl + 'member/user/name/' + Cookies.get('username'), {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setJoinedCommunities(data))
    }, []);

    return (
        <div className="flex flex-column w-full">
            {EditCommunityDialog(editVisible, setEditVisible, comDesc, communityId)}
            {DeleteCommunityDialog(deleteVisible, setDeleteVisible, communityId)}
            <Card title={comName} className="p-1 mt-0 ml-4 w-8">
                <div className="flex flex-row align-items-center justify-content-between">
                    <div>
                        <p className="text-xl">{numberOfMembers} members</p>
                        <p className="text-xl">Owned by:
                            <Link to={comOwner == undefined ? null : "/dash/profile/" + comOwner.id}>
                                u/{comOwner == undefined ? null : comOwner.username}
                            </Link>
                        </p>
                        <p className="text-base">
                            Description: <br/>
                            {comDesc}
                        </p>
                    </div>
                    <div className="flex flex-column gap-2">
                        {comOwner != undefined && currentUser.id == comOwner.id &&
                            <Button label="Edit" icon="pi pi-pencil" onClick={() => setEditVisible(true)}/>}
                        {comOwner != undefined && currentUser.id == comOwner.id &&
                            <Button label="Delete" icon="pi pi-trash" onClick={() => setDeleteVisible(true)}
                                    severity="danger"/>}
                        {comOwner != undefined && currentUser.id != comOwner.id &&
                        joinedCommunities.length == 0 ? null
                            :
                            (joinedCommunities.map((c) => c == null ? 0 : c.id)
                                    .find((i) => i == communityId) == undefined ?
                                    <Button label="Join" onClick={() => joinCom(communityId)}/>
                                    :
                                    <Button label="Leave" onClick={() => leaveCom(communityId)} severity="danger"/>
                            )
                        }
                    </div>
                </div>
            </Card>
            <Divider/>
            <div className="flex flex-column w-full h-full">
                <div className="ml-4">
                    <Card title="Posts">
                        {PostDataScroller(communityId, null)}
                    </Card>
                </div>
            </div>
        </div>
    )
}

function CommunityDiscover() {
    const [communities, setCommunities] = useState([])
    const [joinedCommunities, setJoinedCommunities] = useState([])
    const [unjoinedCommunities, setUnjoinedCommunities] = useState([])


    useEffect(() => {
        const res = fetch(baseUrl + 'community/', {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setCommunities(data))

        const res2 = fetch(baseUrl + 'member/user/name/' + Cookies.get('username'), {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => res.json()).then((data) => setJoinedCommunities(data))
            .then(() => {
                setUnjoinedCommunities(communities.filter((c) =>
                    joinedCommunities.map((co) => co.id)
                        .find((item) => item == c.id) == undefined))
            })


    }, []);

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
            <div className="w-full">
                <Panel header={header(communityData.name, communityData.owner.username, communityData.id)}
                       className="text-xl mb-2 mt-2">
                    <div className="flex flex-row justify-content-between">
                        <div>
                            <p className="mt-0 mb-1 text-base">
                                {communityData.description}
                            </p>
                        </div>
                        <div className="mr-4">
                            {joinedCommunities.length == 0 ? null
                                :
                                (joinedCommunities.map((c) => c == null ? 0 : c.id)
                                        .find((i) => i == communityData.id) == undefined ?
                                        <Button label="Join" onClick={() => joinCom(communityData.id)}/>
                                        :
                                        <Button label="Leave" onClick={() => leaveCom(communityData.id)}
                                                severity="danger"/>
                                )
                            }
                        </div>
                    </div>
                </Panel>
            </div>
        )
    }


    const options = ['On', 'Off'];
    const [value, setValue] = useState(options[0]);

    return (
        <div className="flex flex-column w-full h-full">
            <Panel header="Browse Communities">
                <div className="flex flex-column">
                    <div>
                        <p>
                            Here, you can browse all existing communities! See which one you'd like to join!
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <div>
                            <p>
                                Show joined Communities:
                            </p>
                        </div>
                        <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options}/>
                    </div>
                </div>
            </Panel>

            {value == "On" ?
                <DataScroller value={communities} itemTemplate={communityTemplate} className="w-full ml-1" rows={20}
                              inline
                              scrollHeight="2000px"/>
                :
                <DataScroller value={unjoinedCommunities} itemTemplate={communityTemplate} className="w-full ml-1"
                              rows={20} inline
                              scrollHeight="2000px"/>}

        </div>
    )
}

const convertDateTimeToAgo = (dt) => {
    //not totally accurate
    let display = ""
    let val = (Date.now().valueOf() - Date.parse(dt).valueOf()) / 1000 //in seconds
    let iterations = 0
    while (val / 60 > 1 && iterations < 3) {
        val = val / 60
        iterations += 1
    }
    if (val / 24 > 1) {
        val = val / 24
        iterations += 1
    }
    if (val / 7 > 1) {
        val = val / 7
        iterations += 1
    }
    if (val / 4.25 > 1) {
        val = val / 4.25
        iterations += 1
    }
    if (val / 12 > 1) {
        val = val / 12
        iterations += 1
    }
    switch (iterations) {
        case 0: //seconds
            display = "Just now"
            break
        case 1: //minutes
            display = Math.floor(val).toString() + " minutes ago"
            break
        case 2: //hours
            display = Math.floor(val).toString() + " hours ago"
            break
        case 3: //days
            display = Math.floor(val).toString() + " days ago"
            break
        case 4: //weeks
            display = Math.floor(val).toString() + "  ago"
            break
        case 5: //months
            display = Math.floor(val).toString() + " months ago"
            break
        case 6: //years
            display = Math.floor(val).toString() + " years ago"
            break
    }
    return display
}

const joinCom = (cid) => {
    const res = fetch(baseUrl + 'member/join', {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + jwt,
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            "user": {
                "id": currentUser.id
            },
            "community": {
                "id": cid
            }
        })
    })
}

const leaveCom = (cid) => {
    const res = fetch(baseUrl + 'member/leave', {
        method: "DELETE",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + jwt,
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            "user": {
                "id": currentUser.id
            },
            "community": {
                "id": cid
            }
        })
    })
}
