"use client"

import Image, { StaticImageData } from "next/image";
import avatarUrl from "../public/img/user.png"
import users from "../data/users.json"
import { useEffect, useState } from "react"

// Post images
import postImproveImg from "../public/img/improve.jpg"
import postMathImg from "../public/img/math.jpg"
import postPassportImg from "../public/img/passport.jpg"
import postSWToolsImg from "../public/img/software-engineering-tools.jpg"
import postSQLImg from "../public/img/sql-query-logical-order.jpg"
import postCardNumberImg from "../public/img/card-number.png"
import postFourierImg from "../public/img/the-fourier-transform.jpg"
import postWorkImg from "../public/img/work-based-on-dreams.jpg"

class User {
  avatarUrl: string
  name: string
  handle: string
  verified: boolean
  constructor(avatarUrl: string, name: string, handle: string, verified: boolean) {
    this.avatarUrl = avatarUrl
    this.name = name
    this.handle = handle
    this.verified = verified
  }
}

const Post = ({ user,
  date,
  text,
  img,
  comments,
  rekeets,
  isRekeets,
  likes,
  views }: {
    user?: User,
    date: string,
    text: string,
    img?: StaticImageData
    comments: string,
    rekeets: string,
    isRekeets?: boolean,
    likes: number,
    views: string
  }) => {
  const [liked, setLiked] = useState<boolean>()
  const [bookmarked, setBookmarked] = useState<boolean>()

  const handleLike = () => {
    setLiked((prev) => {
      return !prev
    })
  }

  const handleBookmarked = () => {
    setBookmarked((prev) => {
      return !prev
    })
  }

  const renderLike = (count: number): string => {
    const text = count.toString()
    let processed = ""
    if (text.length < 4) {
      processed += text
    } else if (text.length > 3 && text.length < 7) {
      const numbers = text.slice(0, text.length - 3)
      const trail = text.charAt(text.length - 3)
      processed += numbers
      if (trail != "0") {
        processed += "," + trail
      }
      processed += "k"
    } else if (text.length > 6 && text.length < 10) {
      const numbers = text.slice(0, text.length - 6)
      const trail = text.charAt(text.length - 6)
      processed += numbers
      if (trail != "0") {
        processed += "," + trail
      }
      processed += "m"
    } else {
      return "Unimplemented"
    }
    return processed
  }

  const renderBody = () => {
    if (img != null) {
      return (
        <Image
          src={img}
          alt={text}
          className="rounded-md"
        />
      )
    } else {
      return (
        <p className="text-sm">{text}</p>
      )
    }
  }

  if (user != undefined) {
    return (
      <div className=" flex items-start gap-2 border-b border-gray-300 pb-2 pt-2 px-4">
        {/* Header */}
        <Image
          src={`/img/${user.avatarUrl}`}
          alt={user.avatarUrl}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-col">
          <div className="flex gap-1 items-center">
            <p className="font-semibold">{user?.name ?? "Loading name"}</p>
            {user.verified &&
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-blue-400">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>}
            <p className="text-gray-500">@{user?.handle ?? "Loading handle"}</p>
            <p className="text-gray-500">·</p>
            <p className="text-gray-500">{date}</p>
          </div>
          {/* Body */}
          {renderBody()}
          <div className="h-2"></div>
          {/* Footer */}
          <div className="flex justify-between  ">
            {/* Comment */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <p className="text-xs">{comments}</p>
            </div>
            {/* Repost */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${isRekeets && 'text-green-700'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
              </svg>
              <p className="text-xs">{rekeets}</p>
            </div>
            {/* Likes */}
            <div className="flex items-center gap-1">
              {liked
                ? <svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-red-700">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
                : <svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>}
              <p className="text-xs">{renderLike(likes + (liked ? 1 : 0))}</p>
            </div>
            {/* View Count */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              <p className="text-xs">{views}</p>
            </div>
            <div className="flex gap-2">
              {/* Bookmark */}
              {bookmarked
                ? <svg onClick={handleBookmarked} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-blue-700">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                </svg>
                : <svg onClick={handleBookmarked} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>}
              {/* Share */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function Home() {
  const [snowden, setSnowden] = useState<User>()
  const [nana, setNana] = useState<User>()
  const [lexy, setLexy] = useState<User>()

  useEffect(() => {
    const snowdenData = users[0] as User
    const nanaData = users[1] as User
    const lexyData = users[2] as User

    setSnowden(snowdenData)
    setNana(nanaData)
    setLexy(lexyData)
  }, [])

  return (
    <div className="bg-gray-50 w-96 m-auto min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="bg-gray-50 fixed w-full white pt-3 px-3 pb-[1px] border-b border-gray-300">
        {/* Head */}
        <div className="relative flex items-center justify-between">
          <Image
            aria-hidden
            src={avatarUrl}
            alt="Avatar icon"
            width={36}
            height={36}
          />
          <p className="absolute m-auto inset-0 flex items-center justify-center font-bold text-lg">P</p>
          <div className="flex gap-2 items-center">
            <p className="text-sm">Upgrade</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </div>
        </div>
        <div className="h-2"></div>
        {/* For You */}
        <div className="inline-block">
          <p>For You</p>
          <div className="w-full h-[2px] bg-blue-500"></div>
        </div>
      </header>
      <div className="h-20"></div>
      <main>
        <Post
          user={nana}
          date="2s"
          text="“The code you write makes you a programmer. The code you delete makes you a good one. The code you don't have to write makes you a great one.” - Patrick McKenzie"
          comments="3"
          rekeets="12"
          isRekeets={true}
          likes={16}
          views="7"
        />
        <Post
          user={nana}
          date="3h"
          text=""
          img={postMathImg}
          comments="211"
          rekeets="4,1k"
          isRekeets={true}
          likes={3471}
          views="431k" />
        <Post
          user={nana}
          date="3h"
          text="“Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.” - Patrick McKenzie"
          comments="7"
          rekeets="113"
          isRekeets={true}
          likes={1723}
          views="175,9k"
        />
        <Post
          user={snowden}
          date="30m"
          text=""
          img={postImproveImg}
          comments="201"
          rekeets="1,1k"
          likes={2699}
          views="411,9k" />
        <Post
          user={snowden}
          date="1h"
          text=""
          img={postPassportImg}
          comments="29"
          rekeets="23"
          likes={8132}
          views="13,2k" />
        <Post
          user={lexy}
          date="6d"
          text=""
          img={postSWToolsImg}
          comments="1,6k"
          rekeets="8,4k"
          isRekeets={true}
          likes={107391}
          views="871,1k" />
        <Post
          user={lexy}
          date="1w"
          text=""
          img={postSQLImg}
          comments="2,1k"
          rekeets="1,3k"
          isRekeets={true}
          likes={12145}
          views="75,8k" />
        <Post
          user={nana}
          date="2d"
          text=""
          img={postCardNumberImg}
          comments="89"
          rekeets="662"
          likes={9711}
          views="211k" />
        <Post
          user={nana}
          date="1d"
          text=""
          img={postFourierImg}
          comments="31"
          rekeets="9"
          likes={657}
          views="3,2k" />
        <Post
          user={snowden}
          date="2m"
          text=""
          img={postWorkImg}
          comments="71,9k"
          rekeets="100.1k"
          isRekeets={true}
          likes={499613}
          views="3,1m" />
      </main>
    </div>
  );
}
