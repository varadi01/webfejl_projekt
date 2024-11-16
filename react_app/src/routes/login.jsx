import '../App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-dark-purple/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";
import Cookies from 'js-cookie'



import { Divider } from 'primereact/divider';
import { DeferredContent } from 'primereact/deferredcontent'; //MUST USE

import { Image } from 'primereact/image';
import {Accordion, AccordionTab} from "primereact/accordion";
import {Menu} from "primereact/menu";
import React, {useEffect, useRef, useState} from "react";
import { DataScroller } from 'primereact/datascroller';
import { Panel } from 'primereact/panel';

import { Chip } from 'primereact/chip';
import { Tag } from 'primereact/tag';
import {Card} from "primereact/card";
import {TabPanel, TabView} from "primereact/tabview";
import {Link, useNavigate} from "react-router-dom";




const baseUrl = "http://localhost:8080/"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()

    const [showRegister, setShowRegister] = useState(false)

    function toggleReg () {
        setShowRegister(!showRegister)
    }

    async function  handleLogin() {
        const res = await fetch("http://localhost:8080/login",{
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (res.status == 200){
            res.text().then((t) => {
                let parts = t.split(';')
                let jwt=parts[0]
                Cookies.set('jwt', jwt)
                let currentUserName=parts[1]
                Cookies.set('username', currentUserName) //TODO REMOVE, dont need
                //TODO this makes too many requests
                const res2 = fetch(baseUrl + 'user/userbyname/' + Cookies.get('username'), {
                    method: "GET",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + jwt
                    }
                }).then((res) => res.json()
                    .then((data) => {
                        Cookies.set('user', JSON.stringify(data))
                        console.log(data)
                    }))

            }).finally(() => navigate("/dash/feed"))
        } else {
            setShowError(true)
            console.log("showerror")
        }
    }



    return (<div className="flex align-items-center justify-content-center p-8">
        {showRegister ? <RegisterPopup toggle={toggleReg}/> :
            <div className="surface-card shadow-2 border-round w-full lg:w-4 p-6">
                <div className="text-center mb-5">
                    <Image src="LOGO.png" alt="Logo" width="60"/>
                    <div className="text-900 text-3xl font-medium mb-3">Welcome to Rabbit!</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={toggleReg}>Create
                        today!</a>
                </div>

                {showError ? <Card title="Incorrect Credentials!" className="bg-black-alpha-10 p-0 m-0" >
                    <p className="m-0 p-0">The credentials you have provided don't match that of any registered users! If you haven't registered yet, do so with the link above. </p>
                </Card> : null}
                <div className="w-full">
                    <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                    <InputText id="username" value={username} onChange={e => setUsername(e.target.value)}
                               type="text" placeholder="Username" className="w-full mb-3"/>

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" value={password} onChange={e => setPassword(e.target.value)}
                               type="password" placeholder="Password" className="w-full mb-3"/>


                        <Button label="Sign In" icon="pi pi-sign-in" className="w-full" onClick={handleLogin}/>

                </div>
            </div>}
    </div>)
}


function RegisterPopup(toggleReg) {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [showRegError, setShowRegError] = useState(false)


    async function handleRegister(){
        const res = await fetch("http://localhost:8080/register",{
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: usernameReg,
                password: passwordReg
            })
        }).then((res) => res.status == 200 ? toggleReg.toggle() : setShowRegError(true))
    }

    return (
        <div className="flex align-items-center justify-content-center p-6
                        surface-card shadow-2 border-round">
            <div className="w-full vertical-align-middle">
                <div className="text-900 text-3xl font-medium mb-3 p-3">Registration</div>
                {showRegError ? <Card title="Username already taken!" className="bg-black-alpha-10 p-0 m-0" >
                    <p className="m-0 p-0">Your given username is already in use, please choose another one!</p>
                </Card> : null}
                <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                <InputText id="username" value={usernameReg} onChange={e => setUsernameReg(e.target.value)}
                           type="text" placeholder="Email address" className="w-full mb-3"/>

                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                <InputText id="password" value={passwordReg} onChange={e => setPasswordReg(e.target.value)}
                           type="password" placeholder="Password" className="w-full mb-3"/>

                <Button label="Register" icon="pi pi-user" className="w-4" onClick={handleRegister}/>
                <Button label="Cancel" icon="pi pi-times" className="w-3 " onClick={toggleReg.toggle}/>
            </div>
        </div>
    )
}