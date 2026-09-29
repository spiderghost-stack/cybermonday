"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 bg-cyber-accent text-cyber-main relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">DON&apos;T MISS THE NEXT DEAL</h2>
        <p className="text-xl mb-8 font-medium">Get notified about exclusive offers, new deals and Cyber Monday updates.</p>
        
        {submitted ? (
          <div className="flex flex-col items-center justify-center space-y-2 p-6 bg-white/20 rounded-xl backdrop-blur-sm max-w-md mx-auto">
            <CheckCircle2 className="w-12 h-12 text-green-700" />
            <h3 className="text-2xl font-bold text-cyber-main">You&apos;re on the list!</h3>
            <p className="text-cyber-main font-medium">Get ready for the best deals.</p>
          </div>
        ) : (
          <form 
            className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto" 
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-lg outline-none text-cyber-main font-medium border-2 border-transparent focus:border-cyber-main transition-colors"
              required
            />
            <button type="submit" className="bg-cyber-main text-white font-bold px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors">
              SIGN ME UP
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
