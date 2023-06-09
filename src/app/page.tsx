"use client";

import React, {useState, useEffect, useRef} from "react"
import Image from "next/image"
import axios from "axios"
import cloneai_logo from "../assets/img/cloneai_logo.png"
import ai_animation from "@/assets/anims/ai-animation.json"
import Lottie from "lottie-react"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  //Animation
  const[animationParent] = useAutoAnimate();
  
  const defaultMessage = "Ask something or type whatever you want.."

  const[aiResponse, setAiResponse] = useState("");
  const[promptMessage, setPromptMessage] = useState("");
  const[sendingStatus, setSendingStatus] = useState(false);

  async function getAIResponse() {
    
    /** If prompt is empty show an alert and make user focus textarea to prompt  */
    if( String(promptMessage).length < 1 ){
      toast.error("You need to ask something!", {
        position: toast.POSITION.TOP_RIGHT
      });

      return false;
    }

    //Set AI response empty string
    setAiResponse("");

    // Set Sending status true
    setSendingStatus(true);
  
    const randomNum = Math.floor(Math.random() * 10) + 1;
    const fakeWait = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 2000)
    })
    const aiResponse = await axios.post('/askai', {
      question: promptMessage
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then( (r) => r );
    
    setSendingStatus(false);

    if(aiResponse.status == 200){
      setAiResponse(aiResponse.data.body);
      setPromptMessage("");
    }

  }

  return (
    <>

      <header className="w-full h-18 bg-slate-200">
        <Image alt="resim aciklamasi" src={cloneai_logo} className="ml-5 w-16"></Image>
      </header>

      <div className="flex justify-center items-center">
        <textarea value={promptMessage} onChange={(e) => setPromptMessage(e.target.value)} placeholder={defaultMessage} className="mt-5 rounded border border-zinc-950 text-sm p-3 resize-none" cols={60} rows={5}></textarea>
      </div>
    
      <div className="flex justify-center items-center">
        <button 
        onClick={getAIResponse} 
        className="w-36 h-10 bg-purple-400 border border-purple-500 mt-2 disabled:opacity-75"
        disabled={sendingStatus}
        >
          {sendingStatus && <>Sending...</>}
          {!sendingStatus && <>Send AI</>}
          </button>
      </div>


      <div ref={animationParent}>
      {aiResponse.length > 0 && (<div className="flex justify-center items-center">
        <div className="w-[492px] mt-20 px-10 py-3 bg-green-200 max-h-96 overflow-auto">
        <p className="text-center text-sm">
          {aiResponse}
        </p>
        </div>
      </div>)}
      </div>
      

      {sendingStatus &&
        (<div className="flex justify-center items-center">
          <div className="w-[256px] h-[256px] bg-slate-500 mt-12" style={{backgroundColor: "#d0d7e0"}} >
            <Lottie animationData={ai_animation} className="bg-white-400"/>
          </div>
        </div>)
      }
      
      <footer className="flex w-full h-8 fixed bottom-0 bg-gray-400 justify-center items-center text-sm">
        <a className="hover:underline font-extralight" target="_blank" href="https://ugurcengiz.com">Made with ♥ by Uğur Cengiz</a>
      </footer>

      <ToastContainer/>
    </>
  )
}
