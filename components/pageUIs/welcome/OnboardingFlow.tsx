"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const OnboardingSlide = ({
  data,
  currentIndex,
  onNext,
  onBack,
  onSkip,
  gotToDashboard,
}: {
  data: { title: string; description: string; image: string };
  currentIndex: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  gotToDashboard: () => void;
}) => {
  return (
    <div className="w-full  h-screen flex  flex-col   gap-10">
      <div className="w-full h-[45%]">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="h-[55%] p-5 flex flex-col justify-start">
        <h2 className="text-2xl font-bold text-center mb-4">{data.title}</h2>

        <p className="text-gray-600 text-center mb-8">{data.description}</p>

        <div className="flex justify-between gap-4">
          {currentIndex > 0 ? (
            <button
              onClick={onBack}
              className="w-full px-4 py-2 border border-teal-700 text-teal-700 rounded hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onSkip}
              className="w-full px-4 py-2 border border-teal-700 text-teal-700 rounded hover:bg-gray-50"
            >
              Skip
            </button>
          )}

          <button
            onClick={() => {
              currentIndex === 2 ? gotToDashboard() : onNext();
            }}
            className="w-full px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800"
          >
            {currentIndex === 2 ? "Start Selling" : "Continue"}
          </button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-1 w-8 rounded ${
                currentIndex === index ? "bg-teal-700" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const OnboardingFlow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Farm Guard",
      description:
        "FarmGuard simplifies livestock management. Track health, record births, manage vaccinations, and get real-time market updates—right from your mobile device.",
      image: "/imgs/hello.jpg",
    },
    {
      title: "Manage Your Livestock Anywhere",
      description:
        "Monitor livestock health, schedule vaccinations, and track treatments effortlessly. ",
      image: "/imgs/globe.jpg",
    },
    {
      title: "Boost Your Productivity",
      description:
        "FarmGuard automates tasks and helps you make smart decisions to improve livestock health and productivity.",
      image: "/imgs/space.jpg",
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle completion - you can add navigation to main app here
      console.log("Onboarding completed");
    }
  };

  const handleBack = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleSkip = () => {
    // Handle skip - you can add navigation to main app here
    console.log("Onboarding skipped");
  };
  const gotToDashboard = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen">
      <OnboardingSlide
        data={slides[currentIndex]}
        currentIndex={currentIndex}
        onNext={handleNext}
        onBack={handleBack}
        onSkip={handleSkip}
        gotToDashboard={gotToDashboard}
      />
    </div>
  );
};

export default OnboardingFlow;
