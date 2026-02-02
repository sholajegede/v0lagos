"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, X, ExternalLink, Play as PlayIcon, RotateCcw } from "lucide-react"
import { presentationTracks, presentationConfig, agendaItems, logos, sponsors, type Sponsor } from "@/lib/data"
import { ThemeToggle } from '@/components/theme-toggle'

const SLIDES = 9

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoUrl, setVideoUrl] = useState(presentationConfig.videoUrl)
  const [timeRemaining, setTimeRemaining] = useState(45 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null)
  const videoRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const SlideNumber = ({ current }: { current: number }) => (
    <div className="text-center text-xs font-mono text-gray-500 tracking-widest mb-8">
      {String(current + 1).padStart(2, "0")} / {String(SLIDES).padStart(2, "0")}
    </div>
  )

  const SponsorCard = ({
    sponsor,
    delay = 0,
    isVisible = true,
  }: {
    sponsor: Sponsor
    delay?: number
    isVisible?: boolean
  }) => {
    const renderAsset = () => {
      const { assetType, logo, name, height } = sponsor

      if (assetType === "svg") {
        return (
          <img
            src={logo || "/placeholder.svg"}
            alt={name}
            className="w-auto max-w-[184px] transition-opacity duration-300 group-hover:opacity-80"
            style={{ height: height || "auto" }}
          />
        )
      }

      if (assetType === "png" || assetType === "jpg" || assetType === "jpeg") {
        return (
          <Image
            src={logo || "/placeholder.svg"}
            alt={name}
            width={184}
            height={height || 50}
            className="w-auto max-w-[184px] transition-opacity duration-300 group-hover:opacity-80"
            style={{ height: height || "auto" }}
          />
        )
      }

      if (assetType === "remote") {
        return (
          <img
            src={logo || "/placeholder.svg"}
            alt={name}
            className="w-auto max-w-[184px] transition-opacity duration-300 group-hover:opacity-80"
            style={{ height: height || "auto" }}
          />
        )
      }

      return null
    }

    const content = (
      <div
        className="relative w-full sm:w-[calc(50%-0.5px)] lg:w-[342px] h-[140px] lg:h-[173px] border border-[#262626] p-6 lg:p-8 flex flex-col items-center justify-center -mr-px -mb-px group cursor-pointer transition-all duration-700 hover:bg-white/[0.03] hover:border-[#404040]"
        style={{
          transitionDelay: `${delay}ms`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-white opacity-0 translate-x-2 -translate-y-2 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0 group-hover:translate-y-0" />
        {renderAsset()}
      </div>
    )

    return (
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="contents">
        {content}
      </a>
    )
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentSlide === 3) {
        setCurrentSlide(4)
      } else if (e.key === "ArrowRight" || e.code === "Space") {
        e.preventDefault()
        setCurrentSlide((prev) => (prev + 1) % SLIDES)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        setCurrentSlide((prev) => (prev - 1 + SLIDES) % SLIDES)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide])

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES) % SLIDES)

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-white dark:from-black to-transparent">
        <div className="flex items-center gap-[18px] group cursor-pointer">
          <img 
            src={logos.v0 || "/placeholder.svg"} 
            alt="v0" 
            className="h-[24px] w-[50px] transition-opacity duration-300 group-hover:opacity-80" 
          />
            <span className="font-mono text-[12px] text-black dark:text-white tracking-[2.4px] [text-shadow:0px_0px_6px_rgba(0,0,0,0.1)] dark:[text-shadow:0px_0px_6px_rgba(255,255,255,0.4)] transition-colors duration-300 group-hover:text-black dark:group-hover:text-white">
                IRL LAGOS
              </span>
        </div>
        <div className="flex gap-1">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-300 ${
                  i <= currentSlide ? "bg-black dark:bg-white w-4" : "bg-gray-300 dark:bg-gray-300 dark:bg-gray-700 w-2"
                }`}
              />
            ))}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="text-sm font-mono tracking-widest text-black dark:text-white">0{currentSlide + 1} / 0{SLIDES}</div>
        </div>
      </div>

      {/* Main Slide Container */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        {/* Slide 1: Title */}
        {currentSlide === 0 && (
          <div className="text-center">
            <h1 className="text-[60px] md:text-[100px] lg:text-[137px] font-normal leading-[1] lg:leading-[110px] tracking-[-0.04em] lg:tracking-[-5.48px] text-black dark:text-white overflow-hidden mb-12">
              <span className={`block transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                Prompt{' '}
              </span>
              <span className={`block transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                to Production
              </span>
            </h1>
            <p className="text-lg text-black dark:text-white dark:text-black dark:text-white mb-20 font-light tracking-tight">Build Your MVP in One Afternoon - From Idea to Live App Using AI - No Coding Required</p>
          </div>
        )}

        {/* Slide 2: Welcome & Introductions */}
        {currentSlide === 1 && (
          <div className="w-full max-w-3xl">
            <span className="text-xs font-mono text-gray-500 tracking-widest letter-spacing-wide">01 / WELCOME</span>
            <h2 className="text-6xl font-light mb-6 mt-6 tracking-tight">Welcome to <span className="slashed-zero">v0</span> IRL Lagos</h2>
            <p className="text-black dark:text-white mb-8 leading-relaxed font-light">This is a hands-on workshop where we'll build a complete full stack application together and you'll learn how to adapt it to YOUR idea.</p>
            
            {/* Host Introduction */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-2 tracking-tight">Hosted by Shola Jegede</h3>
              <p className="text-sm text-gray-700 dark:text-gray-600 dark:text-gray-400 mb-3 font-light">Official <span className="slashed-zero">v0</span> IRL Founding Host (Vercel Global Program)</p>
              <ul className="space-y-2 text-sm text-black dark:text-white font-light">
                <li>Head of Product & Partnerships, BuildersCabal (800+ builders)</li>
                <li>Founder, NextMVP.tech - Built 8+ MVPs for founders in 2025</li>
                <li>Co-founder, TaxCal - Built with <span className="slashed-zero">v0</span> in 2 hours (400+ users in 5 days)</li>
                <li>Engineering Judge, 2024 Global Entrepreneurship Festival</li>
              </ul>
            </div>
            
            {/* Supporters Section */}
            <div>
              <p className="text-xs font-mono text-gray-500 tracking-widest mb-8">SUPPORTED BY</p>
              <div className="w-full lg:w-[685px] flex flex-wrap">
                {sponsors.map((sponsor, index) => (
                  <SponsorCard 
                    key={index} 
                    sponsor={sponsor}
                    delay={index * 100} 
                    isVisible={true}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: Launch Plan */}
        {currentSlide === 2 && (
          <div className="w-full max-w-3xl">
            <span className="text-xs font-mono text-gray-500 tracking-widest">02 / LAUNCH PLAN</span>
            <h2 className="text-6xl font-light mb-8 mt-6 tracking-tight">The Agenda</h2>
            <div className="space-y-4">
              {[
                { title: "Vercel Team Welcome", desc: "A special video message from the v0 team sharing insights and inspiration for the event." },
                { title: "The Challenge", desc: "Understanding the flow, defining what success looks like, and preparing for the build ahead." },
                { title: "Pick a Track", desc: "Choose an inspiration track to build from based on your goals." },
                { title: "Build Session", desc: "45 minutes of focused building where you transform ideas into deployed applications." },
                { title: "Ship & Showcase", desc: "Deploy to production, submit your work, and watch quick-fire demos from fellow builders." },
              ].map((item, i) => (
                <div key={i} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex gap-4 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                  <span className="font-semibold text-black dark:text-white w-6 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-sm text-black dark:text-white font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 3: Vercel Team Welcome Video */}
        {currentSlide === 3 && (
          <div className="w-full h-screen flex flex-col items-center justify-center px-8">
            <div className="w-full max-w-4xl">
              <span className="text-xs font-mono text-gray-500 tracking-widest mb-8 block">03 / VERCEL TEAM WELCOME</span>
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 group">
                <iframe
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dg1e_qjlYsk?fs=1&autoplay=1"
                  title="Vercel Team Welcome"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
                <button
                  onClick={() => setCurrentSlide(4)}
                  className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition opacity-0 group-hover:opacity-100"
                  title="Close video and continue"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-center text-black dark:text-white text-sm mt-6">Press ESC or click X to continue</p>
            </div>
          </div>
        )}

        {/* Slide 4: The Challenge */}
        {currentSlide === 4 && (
          <div className="w-full max-w-3xl">
            <span className="text-xs font-mono text-gray-500 tracking-widest">04 / THE CHALLENGE</span>
            <h2 className="text-6xl font-light mb-6 mt-6 tracking-tight">From Someday to Shipped</h2>
            <p className="text-black dark:text-white mb-8 leading-relaxed font-light">
              45 minutes. One idea. A working app at a live URL. Ship, showcase, and win.
            </p>
            
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
              <h3 className="font-semibold text-lg mb-4 tracking-tight">Ship your project today.</h3>
              <ul className="space-y-3 text-black dark:text-white text-sm font-light">
                <li className="flex gap-3">
                  <span className="text-black dark:text-white flex-shrink-0">•</span>
                  <span>That internal tool you've been procrastinating?</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-white flex-shrink-0">•</span>
                  <span>The marketing experiment in your backlog?</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-white flex-shrink-0">•</span>
                  <span>The customer app that seemed too complex?</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Slide 5: Pick a Track */}
        {currentSlide === 5 && (
          <div className="w-full max-w-4xl">
            <span className="text-xs font-mono text-gray-500 tracking-widest">05 / CHOOSE YOUR TRACK</span>
            <h2 className="text-6xl font-light mb-4 mt-6 tracking-tight">Pick a Track</h2>
            <p className="text-black dark:text-white mb-8 font-light">Choose an inspiration track to build from based on your goals.</p>
            
            <div className="grid grid-cols-3 gap-4">
              {presentationTracks.map((track) => (
                <div 
                  key={track.id} 
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:border-gray-400 dark:hover:border-gray-600 transition"
                  onClick={() => setExpandedTrack(track.id)}
                >
                  <p className="text-xs text-gray-500 mb-2 font-light">0{track.id}</p>
                  <h3 className="font-semibold mb-2 tracking-tight">{track.title}</h3>
                  <p className="text-xs text-black dark:text-white mb-4 font-light">{track.description}</p>
                  
                  {expandedTrack === track.id && (
                    <div className="space-y-2">
                      {track.ideas.map((idea, idx) => (
                        <p key={idx} className="text-xs text-gray-700 dark:text-gray-400 font-light">• {idea}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 6: Your Credits */}
        {currentSlide === 6 && (
          <div className="w-full max-w-3xl">
            <span className="text-xs font-mono text-gray-500 tracking-widest">06 / REDEEM YOUR CREDITS</span>
            <h2 className="text-6xl font-light mb-8 mt-6 tracking-tight">Your Credits</h2>
            
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-8 mb-8 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
              <p className="text-xs text-gray-500 mb-4 tracking-widest">CREDIT CODE</p>
              <p className="text-4xl font-mono font-light tracking-widest mb-8 bg-gray-200 dark:bg-white/10 text-black dark:text-white px-6 py-4 rounded-lg inline-block">V0PROMPTTOPRODUCTION2026</p>
              
              <h3 className="font-bold text-lg mb-6">How to Redeem</h3>
              <ol className="space-y-3 text-sm">
                <li><span className="font-bold">1</span> Go to <span className="font-mono text-blue-400"><span className="slashed-zero">v0</span>.app</span></li>
                <li><span className="font-bold">2</span> Navigate to <span className="font-mono">Profile → Billing → Redeem Usage Code</span></li>
                <li><span className="font-bold">3</span> Enter the code above</li>
              </ol>
            </div>
            
            <div className="flex gap-6 text-xs text-black dark:text-white">
              <div className="flex items-center gap-2">
                <span>Clock Icon</span> Credits last 2 weeks after redemption
              </div>
              <div className="flex items-center gap-2">
                <span>User Icon</span> One redemption per individual
              </div>
            </div>
          </div>
        )}

        {/* Slide 7: Build Session */}
        {currentSlide === 7 && (
          <div className="w-full max-w-2xl text-center">
            <span className="text-xs font-mono text-gray-500 tracking-widest">07 / BUILD SESSION</span>
            <h2 className="text-6xl font-light mb-4 mt-6 tracking-tight">Build Session</h2>
            <p className="text-black dark:text-white mb-16 font-light">45 minutes of focused building where you transform ideas into deployed applications.</p>
            
            <div className="mb-16">
              <p className="text-8xl font-mono font-light mb-2 tracking-tight">{formatTime(timeRemaining)}</p>
              <p className="text-black dark:text-white font-light">{isTimerRunning ? "Running..." : "Ready"}</p>
            </div>
            
            <div className="flex justify-center gap-4 mb-16">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition"
              >
                <PlayIcon size={24} fill="black" />
              </button>
              <button
                onClick={() => setTimeRemaining(45 * 60)}
                className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center hover:border-gray-400 transition"
              >
                <RotateCcw size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: "Prompt", desc: "Start with a natural language description of what you want to build" },
                { title: "Iterate", desc: "Refine and expand your application with conversational edits" },
                { title: "Deploy", desc: "Ship to production with one click on Vercel's infrastructure" },
              ].map((step, i) => (
                <div key={i} className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                  <h3 className="font-semibold mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-xs text-black dark:text-white font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 8: Ship & Showcase */}
        {currentSlide === 8 && (
          <div className="text-center">
            <span className="text-xs font-mono text-gray-500 tracking-widest">08 / SHIP & SHOWCASE</span>
            <h2 className="text-6xl font-light mb-6 mt-6 tracking-tight">Ship & Showcase</h2>
            <p className="text-black dark:text-white mb-12 max-w-2xl mx-auto font-light">Deploy to production, submit your work, and watch quick-fire demos from fellow builders.</p>
            
            <div className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                { num: "01", title: "Deploy", desc: "Push your creation live to the world" },
                { num: "02", title: "Submit", desc: "Share your deployed URL for the showcase" },
                { num: "03", title: "Demo", desc: "Watch quick-fire demos from fellow builders" },
              ].map((step, i) => (
                <div key={i} className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                  <p className="text-2xl font-light mb-3 tracking-tight">{step.num}</p>
                  <h3 className="font-semibold mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-black dark:text-white font-light">{step.desc}</p>
                </div>
              ))}
            </div>
            
            <p className="text-black dark:text-white mb-8 font-light">Let's build something amazing.</p>
            <div className="flex items-center justify-center">
              <img 
                src={logos.v0 || "/placeholder.svg"} 
                alt="v0" 
                className="h-6 w-12" 
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 left-8 right-8 flex justify-between items-center">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-gray-400 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="text-xs text-gray-500 font-mono">Use arrow keys or spacebar to navigate</p>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-gray-400 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
