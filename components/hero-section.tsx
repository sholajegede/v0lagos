"use client";

import { TextEffect } from "@/components/motion-primitives/text-effect";
import LanyardWithControls from "@/components/lanyard-with-controls";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import NextLink from "next/link";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import Lanyard from "@/components/ui/lanyard";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CardTemplate, {
  type CardTemplateRef,
  type CardVariant,
} from "@/components/card-template";
import { Download, Link, Check } from "lucide-react";
import { encryptLanyardData } from "@/lib/utils";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const MAX_CHARACTERS = 20;

export default function HeroSection() {
  const defaultName = "";
  const defaultVariant = "dark";
  const searchParams = useSearchParams();
  const highlightOverride = searchParams.get("highlight"); // 'tracks', 'ship', or 'off'
  const eventState = searchParams.get("event"); // 'completed' to force finished state

  const [currentTime, setCurrentTime] = useState(new Date());
  const [inputValue, setInputValue] = useState(defaultName);
  const [appliedName, setAppliedName] = useState(defaultName);
  const [cardVariant, setCardVariant] = useState<CardVariant>(defaultVariant);
  const [appliedVariant, setAppliedVariant] =
    useState<CardVariant>(defaultVariant);
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>(
    undefined
  );
  const [textureKey, setTextureKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const cardTemplateRef = useRef<CardTemplateRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!defaultName) {
      setIsInitialized(true);
      return;
    }

    const timer = setTimeout(async () => {
      if (cardTemplateRef.current) {
        await cardTemplateRef.current.captureTexture();
      }
      setIsInitialized(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [defaultName]);

  const getShareableUrl = useCallback(() => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    if (appliedName) {
      const encrypted = encryptLanyardData(appliedName, appliedVariant);
      return `${baseUrl}/live?u=${encrypted}`;
    }
    return `${baseUrl}/live`;
  }, [appliedName, appliedVariant]);

  const shareMessage = appliedName
    ? `I'm at @v0 Prompt to Production Lagos! Check out my personalized card`
    : `Check out v0 IRL Lagos! Create your personalized event card`;

  const handleShareX = useCallback(() => {
    const url = getShareableUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareMessage
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  }, [getShareableUrl, shareMessage]);

  const handleShareLinkedIn = useCallback(() => {
    const url = getShareableUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  }, [getShareableUrl]);

  const handleCopyLink = useCallback(async () => {
    const url = getShareableUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  }, [getShareableUrl]);

  const characterCount = inputValue.length;
  const isAtLimit = characterCount >= MAX_CHARACTERS;
  const isNearLimit = characterCount >= MAX_CHARACTERS - 5;
  const hasChanges =
    inputValue !== appliedName || cardVariant !== appliedVariant;

  const handleTextureReady = useCallback((dataUrl: string) => {
    setCardTextureUrl(dataUrl);
    setTextureKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getLagosTime = (date: Date) => {
    return new Date(date.toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
  };

  const lagosTime = getLagosTime(currentTime);

  let isEventDay =
    lagosTime.getFullYear() === 2026 &&
    lagosTime.getMonth() === 1 &&
    lagosTime.getDate() === 7;
  let currentHour = lagosTime.getHours();
  let currentMinute = lagosTime.getMinutes();
  const isEventCompleted = eventState === "completed";

  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const scheduleTimes = [
    {
      start: 11 * 60,
      end: 11 * 60 + 15,
      title: "Doors open, networking & setup",
    },
    {
      start: 11 * 60 + 15,
      end: 11 * 60 + 30,
      title: "Welcome + special video from the v0 team",
    },
    {
      start: 11 * 60 + 30,
      end: 11 * 60 + 45,
      title: "v0 fundamentals & prompting strategies",
    },
    { start: 11 * 60 + 45, end: 12 * 60 + 30, title: "Start building" },
    {
      start: 12 * 60 + 30,
      end: 13 * 60,
      title: "Showcase projects + community voting",
    },
    {
      start: 13 * 60,
      end: 14 * 60,
      title: "Wrap up, photos, hang out",
    },
  ];

  const getCurrentScheduleIndex = () => {
    if (!isEventDay) return -1;
    for (let i = 0; i < scheduleTimes.length; i++) {
      if (
        currentTimeInMinutes >= scheduleTimes[i].start &&
        currentTimeInMinutes < scheduleTimes[i].end
      ) {
        return i;
      }
    }
    return -1;
  };

  const currentScheduleIndex = getCurrentScheduleIndex();
  const isEventOngoing = isEventDay && currentScheduleIndex >= 0;

  let highlightTracksButtons = false;
  let highlightSubmitButton = false;

  if (isEventCompleted) {
    highlightTracksButtons = false;
    highlightSubmitButton = false;
  } else if (highlightOverride === "tracks") {
    highlightTracksButtons = true;
  } else if (highlightOverride === "ship") {
    highlightSubmitButton = true;
  } else if (highlightOverride !== "off") {
    if (isEventDay) {
      if (currentScheduleIndex === 1) {
        highlightTracksButtons = true;
      } else if (currentScheduleIndex === 3) {
        highlightSubmitButton = true;
      }
    }
  }

  const handleExport = () => {
    cardTemplateRef.current?.exportCard();
  };

  const handleApplyName = async () => {
    setAppliedName(inputValue);
    setAppliedVariant(cardVariant);
    await cardTemplateRef.current?.captureTexture();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && hasChanges) {
      handleApplyName();
    }
  };

  return (
    <main className="overflow-x-hidden scroll-smooth">
      <section className="min-h-dvh overflow-hidden flex flex-col lg:relative">
        <div className="flex-shrink-0 pb-4 pt-6 sm:pt-8 lg:pb-8 lg:pt-36 lg:w-1/2 relative z-10">
          <div className="relative mx-auto flex max-w-xl flex-col px-4 sm:px-6 lg:block">
            <div className="mx-auto max-w-2xl text-center lg:ml-0 lg:text-left">
              <div className="mb-2 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      isEventCompleted
                        ? "bg-muted-foreground"
                        : isEventOngoing
                        ? "bg-green-500 animate-pulse"
                        : isEventDay
                        ? "bg-green-500 animate-pulse"
                        : "bg-red-500 animate-pulse"
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-800">
                    {isEventCompleted
                      ? "Event completed"
                      : isEventOngoing
                      ? "Ongoing"
                      : isEventDay
                      ? "Ongoing"
                      : "Not started"}
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="max-w-2xl text-balance text-2xl font-medium md:text-3xl xl:text-4xl"
                >
                  Prompt to Production - Lagos
                </TextEffect>
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.1}
                  as="p"
                  className="mt-2 text-sm text-white"
                >
                  February 7, 2026
                </TextEffect>
              </div>

              <div className="mt-3 sm:mt-4 rounded-xl bg-white/6 backdrop-blur-2xl p-3 sm:p-4 relative overflow-hidden">
                {isEventCompleted && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 text-center gap-4">
                    <span className="text-md font-geist text-white">
                      Thank you for attending!!!
                    </span>
                    <span className="text-sm font-geist text-white">
                      We hope to see you again soon for another v0 or Ship It
                      First event ;)
                    </span>
                    <span className="text-sm font-geist text-white">- RF</span>
                  </div>
                )}
                <h3 className="mb-2 sm:mb-4 text-base sm:text-lg font-semibold text-white">
                  Schedule
                </h3>
                <div className="space-y-1 sm:space-y-2">
                  {scheduleTimes.map((item, index) => {
                    const hour24 = Math.floor(item.start / 60);
                    const hour12 =
                      hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
                    const startTime = `${hour12}:${(item.start % 60)
                      .toString()
                      .padStart(2, "0")} ${item.start < 12 * 60 ? "AM" : "PM"}`;
                    const isActive = index === currentScheduleIndex;
                    const isPast =
                      isEventDay && currentTimeInMinutes > item.end;
                    const isInactiveDay = !isEventDay;

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-white/20 border border-white/30"
                            : isPast
                            ? "opacity-60"
                            : ""
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm font-mono min-w-[70px] sm:min-w-[80px] ${
                            isActive
                              ? "text-white"
                              : isInactiveDay
                              ? "text-muted-foreground/60"
                              : "text-muted-foreground"
                          }`}
                        >
                          {startTime}
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isActive
                              ? "text-white"
                              : isInactiveDay
                              ? "text-muted-foreground/60"
                              : isPast
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {item.title}
                        </span>
                        {isActive && (
                          <div className="ml-auto">
                            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col items-center justify-center gap-2 sm:gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className={`px-4 backdrop-blur-md rounded-md transition-all duration-300 ${
                    highlightSubmitButton
                      ? "bg-blue-500/30 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <NextLink
                    href="https://v0-v0prompttoproduction2026.vercel.app/submit"
                    target="_blank"
                  >
                    <span className="text-nowrap">Submit your project</span>
                  </NextLink>
                </Button>
                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className={`px-4 backdrop-blur-md rounded-md transition-all duration-300 ${
                    highlightTracksButtons
                      ? "bg-blue-500/30 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <NextLink
                    href="https://v0lagos.vercel.app/prompt-packs"
                    target="_blank"
                  >
                    <span className="text-nowrap">Prompt Tracks</span>
                  </NextLink>
                </Button>
                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className={`px-4 backdrop-blur-md rounded-md transition-all duration-300 ${
                    highlightTracksButtons
                      ? "bg-blue-500/30 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <NextLink
                    href="https://v0-v0prompttoproduction2026.vercel.app/browse"
                    target="_blank"
                  >
                    <span className="text-nowrap">
                      Browse Submitted Projects
                    </span>
                  </NextLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:top-0 lg:right-0 lg:w-1/2 relative w-full flex-1 min-h-[200px] lg:h-screen bg-radial lg:from-transparent lg:to-transparent from-muted to-background select-none flex items-center justify-center">
          <Image
            src="/1.png"
            width={400}
            height={400}
            alt="image"
            className="object-contain max-w-full h-auto mb-12 mt-12 lg:mb-20 lg:mt-0"
          />
        </div>
        <div className="mt-3 px-6 pb-8 lg:absolute lg:bottom-8 lg:right-6 lg:w-auto lg:px-0">
          <div className="mx-auto max-w-md lg:mx-0 lg:ml-auto">
            <div className="mb-4 flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground px-2 py-1 backdrop-blur-md bg-black/10 rounded-md">
                Personalize your card
              </label>
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-1.5">
                  <input
                    title="dark background"
                    type="radio"
                    name="cardVariant"
                    value="dark"
                    checked={cardVariant === "dark"}
                    onChange={() => setCardVariant("dark")}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 bg-black transition-all ${
                      cardVariant === "dark"
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border"
                    }`}
                  >
                    {cardVariant === "dark" && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-1.5">
                  <input
                    title="white background"
                    type="radio"
                    name="cardVariant"
                    value="light"
                    checked={cardVariant === "light"}
                    onChange={() => setCardVariant("light")}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white transition-all ${
                      cardVariant === "light"
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border"
                    }`}
                  >
                    {cardVariant === "light" && (
                      <span className="h-2 w-2 rounded-full bg-black" />
                    )}
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="userName"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your name"
                  maxLength={MAX_CHARACTERS}
                  className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 pr-16 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                />
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs transition-colors ${
                    isAtLimit
                      ? "text-destructive"
                      : isNearLimit
                      ? "text-amber-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {characterCount}/{MAX_CHARACTERS}
                </span>
              </div>
              <Button
                onClick={handleApplyName}
                disabled={!hasChanges}
                size="default"
                className="shrink-0"
              >
                Apply
              </Button>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleExport}
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export as PNG</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {isAtLimit && (
              <p className="mt-1.5 text-xs text-destructive">
                Character limit reached
              </p>
            )}

            {appliedName && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground px-2 py-1 backdrop-blur-md bg-black/10 rounded-md">
                  Share:
                </span>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleShareX}
                        variant="outline"
                        size="icon"
                        className="shrink-0 dark:bg-background"
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on X</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleShareLinkedIn}
                        variant="outline"
                        size="icon"
                        className="shrink-0 dark:bg-background"
                      >
                        <LinkedInIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleCopyLink}
                        variant="outline"
                        size="icon"
                        className="shrink-0 dark:bg-background"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Link className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy link"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </section>
      <CardTemplate
        ref={cardTemplateRef}
        userName={appliedName}
        variant={appliedVariant}
        onTextureReady={handleTextureReady}
        city=""
        date=""
      />
    </main>
  );
}