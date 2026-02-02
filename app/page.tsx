"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { eventData, agendaItems, experienceItems, sponsors, logos, formatIndex, type Sponsor } from "@/lib/data"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

// Custom hook for scroll-triggered animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

export default function V0LagosEvent() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const descriptionSection = useInView(0.3)
  const agendaSection = useInView(0.2)
  const experienceSection = useInView(0.2)
  const sponsorSection = useInView(0.2)
  const ctaSection = useInView(0.3)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Check if at bottom of page
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const isBottom = scrollTop + windowHeight >= documentHeight - 10
      setIsAtBottom(isBottom)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        {/* Blur and gradient background - only visible when scrolled */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-0 py-8 lg:py-[49px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[18px] group cursor-pointer">
              <img 
                src={logos.v0 || "/placeholder.svg"} 
                alt="v0" 
                className="h-[24px] w-[50px] transition-opacity duration-300 group-hover:opacity-80" 
              />
              <span className="font-mono text-[12px] text-white tracking-[2.4px] [text-shadow:0px_0px_6px_rgba(255,255,255,0.4)] transition-colors duration-300 group-hover:text-white">
                IRL - LAGOS
              </span>
            </div>
            <div className="flex items-center gap-[18px]">
              <a 
                href={eventData.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-[#0f172a] px-6 py-3 rounded-full text-[16px] font-medium leading-[24px] transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center"
              >
                Register
                <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100">
                  <ExternalLink className="w-4 h-4 ml-2" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-dvh lg:h-[948px] flex flex-col items-center justify-center overflow-hidden">
        {/* African Pattern Background */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="/african-pattern-nigeria.webp" 
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[204px] bg-gradient-to-b from-transparent to-black pointer-events-none" />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1383px] px-6 lg:px-0 flex flex-col gap-[30px]">
          <div className="px-0 lg:px-5 overflow-hidden">
            <p className={`font-mono text-[14px] text-white tracking-[2.8px] transition-all duration-1000 delay-300 [text-shadow:0px_0px_8px_rgba(255,255,255,0.5)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {eventData.greeting}
            </p>
          </div>
          
          <h1 className="text-[60px] md:text-[100px] lg:text-[137px] font-normal leading-[1] lg:leading-[110px] tracking-[-0.04em] lg:tracking-[-5.48px] text-white overflow-hidden">
            <span className={`block transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              Prompt{' '}
            </span>
            <span className={`block transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              to Production
            </span>
          </h1>
          
          <div className={`flex gap-[44px] px-0 lg:px-5 transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col gap-4 group cursor-default">
              <p className="font-mono text-[14px] text-white tracking-[2.8px] transition-colors duration-300 group-hover:text-[#fff] [text-shadow:0px_0px_6px_rgba(255,255,255,0.4)]">
                WHEN
              </p>
              <p className="font-mono text-[16px] text-white tracking-[-0.64px] font-extralight transition-all duration-300 group-hover:translate-x-1">
                {eventData.date}
              </p>
            </div>
            <a 
              href={eventData.venueAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-4 group cursor-pointer"
            >
              <p className="font-mono text-[14px] text-white tracking-[2.8px] transition-colors duration-300 group-hover:text-[#fff] [text-shadow:0px_0px_6px_rgba(255,255,255,0.4)]">
                LOCATION
              </p>
              <p className="font-mono text-[16px] text-white tracking-[-0.64px] font-extralight transition-all duration-300 group-hover:translate-x-1 flex items-center gap-2">
                {eventData.venue}
                <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </p>
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-[40px] left-0 right-0 z-20 transition-all duration-1000 delay-1200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-full max-w-[1383px] mx-auto px-6 lg:px-5">
            <button 
              onClick={() => {
                const mainContent = document.querySelector('main')
                if (mainContent) {
                  mainContent.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="font-mono text-[14px] text-white tracking-[2.8px] flex items-center gap-3 group cursor-pointer hover:text-[#fff] transition-colors duration-300 [text-shadow:0px_0px_6px_rgba(255,255,255,0.4)]"
            >
              <span>SCROLL TO LEARN MORE</span>
              <span className="inline-block animate-bounce">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] bg-black">
        {/* Description Section */}
        <section 
          ref={descriptionSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] min-h-[300px] lg:h-[402px] flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0"
        >
          <p className={`text-[22px] lg:text-[30px] font-light leading-[1.5] lg:leading-[46px] tracking-[-0.225px] text-white max-w-[774px] transition-all duration-1000 ${descriptionSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {eventData.description}
          </p>
        </section>

        {/* Agenda Section */}
        <section 
          ref={agendaSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row gap-8 items-start justify-center"
        >
          <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] lg:self-start transition-all duration-700 ${agendaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
              AGENDA
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-auto">
            {agendaItems.map((item, index) => (
              <AgendaItem 
                key={index}
                number={formatIndex(index)} 
                title={item.title} 
                description={item.time} 
                delay={index * 100} 
                isVisible={agendaSection.isInView}
                isLast={index === agendaItems.length - 1}
              />
            ))}
          </div>
        </section>

        {/* The Experience Section */}
        <section 
          ref={experienceSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row gap-8 items-start justify-center"
        >
          <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] lg:self-start transition-all duration-700 ${experienceSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
              THE EXPERIENCE
            </p>
          </div>
          <div className="w-full lg:w-[685px] flex flex-wrap">
            {experienceItems.map((item, index) => (
              <ExperienceCard 
                key={index}
                number={formatIndex(index)} 
                title={item.title} 
                description={item.description}
                delay={index * 100}
                isVisible={experienceSection.isInView}
              />
            ))}
          </div>
        </section>

        {/* Sponsors Section */}
        <section 
          ref={sponsorSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row gap-8 items-start justify-center"
        >
          <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] lg:self-start transition-all duration-700 ${sponsorSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
              SUPPORTED BY
            </p>
          </div>
          <div className="w-full lg:w-[685px] flex flex-wrap">
            {sponsors.map((sponsor, index) => (
              <SponsorCard 
                key={index} 
                sponsor={sponsor}
                delay={index * 100} 
                isVisible={sponsorSection.isInView}
              />
            ))}
          </div>
        </section>

        {/* CTA Footer with African Pattern Background */}
        <section 
          ref={ctaSection.ref}
          className="relative border-t lg:border border-[#262626] min-h-[200px] lg:h-[245px] px-6 lg:px-[88px] py-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-[30px] overflow-hidden lg:mb-16"
        >
          {/* African Pattern Background */}
          <div className="absolute inset-0 pointer-events-none">
            <img 
              src="/african-pattern-nigeria.webp" 
              alt=""
              className="w-full h-full object-cover opacity-35"
            />
          </div>
          
          {/* Content */}
          <h2 className={`relative z-10 flex-1 text-[36px] lg:text-[68px] font-semibold leading-[1.1] lg:leading-[72px] tracking-[-0.04em] lg:tracking-[-2.72px] text-white text-center lg:text-left transition-all duration-1000 ${ctaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {eventData.ctaText}
          </h2>
          <div className={`relative z-10 transition-all duration-1000 delay-200 ${ctaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <a 
              href={eventData.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white text-[#0f172a] px-6 py-3 rounded-full text-[16px] font-medium leading-[24px] transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center"
            >
              Register
              <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100">
                <ExternalLink className="w-4 h-4 ml-2" />
              </span>
            </a>
          </div>
        </section>
      </main>
      
      {/* Fixed Bottom Gradient - hidden when at bottom */}
      <div 
        className={`fixed bottom-0 left-0 right-0 h-[120px] pointer-events-none z-40 transition-opacity duration-500 ${isAtBottom ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>
    </div>
  )
}

function AgendaItem({ 
  number, 
  title, 
  description,
  delay = 0,
  isVisible = true,
  isLast = false 
}: { 
  number: string
  title: string
  description: string
  delay?: number
  isVisible?: boolean
  isLast?: boolean
}) {
  return (
    <div 
      className={`w-full lg:w-[685px] flex items-center gap-[10px] py-6 border-b border-[#262626] ${isLast ? 'border-b-0' : ''} group cursor-default transition-all duration-700 hover:bg-white/[0.02] hover:pl-2`}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <span className="font-mono text-[10px] text-[#737373] tracking-[-0.4px] font-extralight transition-all duration-300 group-hover:text-white">
        {number}
      </span>
      <span className="text-[18px] lg:text-[20px] text-white leading-[28px] transition-all duration-300 group-hover:translate-x-1">
        {title}
      </span>
      <div className="flex-1 flex items-center justify-end">
        <span className="text-[12px] lg:text-[14px] text-[#737373] leading-[24px] text-right transition-all duration-300 group-hover:text-[#999]">
          {description}
        </span>
      </div>
    </div>
  )
}

function ExperienceCard({ 
  number, 
  title, 
  description,
  delay = 0,
  isVisible = true
}: { 
  number: string
  title: string
  description: string
  delay?: number
  isVisible?: boolean
}) {
  return (
    <div 
      className="w-full sm:w-[calc(50%-0.5px)] lg:w-[342px] border border-[#262626] p-6 lg:p-8 flex flex-col gap-[10px] justify-center -mr-px -mb-px group cursor-default transition-all duration-700 hover:bg-white/[0.03] hover:border-[#404040]"
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0
      }}
    >
      <p className="font-mono text-[10px] text-[#737373] tracking-[-0.4px] font-extralight transition-colors duration-300 group-hover:text-white">
        {number}
      </p>
      <h3 className="text-[20px] lg:text-[24px] text-white leading-[28px] transition-all duration-300 group-hover:translate-x-1">
        {title}
      </h3>
      <p className="text-[13px] lg:text-[14px] text-[#737373] leading-[24px] transition-colors duration-300 group-hover:text-[#999]">
        {description}
      </p>
    </div>
  )
}

function SponsorCard({ 
  sponsor,
  delay = 0, 
  isVisible = true
}: { 
  sponsor: Sponsor
  delay?: number
  isVisible?: boolean
}) {
  const renderAsset = () => {
    const { assetType, logo, name, height } = sponsor
    
    // Handle SVG
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
    
    // Handle PNG/JPG with Next.js Image
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
    
    // Handle remote URLs
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
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* External link icon - top right */}
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
