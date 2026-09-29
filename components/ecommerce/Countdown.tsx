"use client";

import { useState, useEffect } from "react";

const SALE_END_DATE = "2026-11-30T23:59:59";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEnded, setIsEnded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date(SALE_END_DATE) - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        setIsEnded(true);
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch

  if (isEnded) {
    return (
      <div className="bg-red-600 text-white p-4 font-bold text-xl text-center rounded-md">
        SALE ENDED
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-bold text-cyber-promo tracking-widest uppercase mb-2">
        Cyber Monday Ends In
      </div>
      <div className="flex space-x-2 sm:space-x-4">
        <TimeBox value={timeLeft.days} label="Days" />
        <span className="text-3xl font-bold text-cyber-white self-start pt-2">:</span>
        <TimeBox value={timeLeft.hours} label="Hours" />
        <span className="text-3xl font-bold text-cyber-white self-start pt-2">:</span>
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <span className="text-3xl font-bold text-cyber-white self-start pt-2">:</span>
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-cyber-secondary border border-gray-800 rounded-md w-14 h-16 sm:w-16 sm:h-20 flex items-center justify-center shadow-lg shadow-black/50">
        <span className="text-2xl sm:text-4xl font-bold text-cyber-white">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}
