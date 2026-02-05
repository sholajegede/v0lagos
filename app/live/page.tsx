import { Suspense } from "react";
import HeroSection from "@/components/hero-section";

export default function Home() {
    return (
        <>
            <Suspense fallback={null}>
                <HeroSection />
            </Suspense>
        </>
    )
}