"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100">
      <h2 className="text-xl font-bold text-cyber-main mb-6">Send a Message</h2>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CheckCircle2 className="w-14 h-14 text-cyber-promo mb-4" />
          <h3 className="text-xl font-bold text-cyber-main mb-2">Message sent!</h3>
          <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-cyber-main mb-1.5">Name</label>
            <input
              type="text"
              required
              placeholder="Roesnay"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cyber-main mb-1.5">Email</label>
            <input
              type="email"
              required
              placeholder="roesnay@exemple.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cyber-main mb-1.5">Message</label>
            <textarea
              rows={4}
              required
              placeholder="How can we help you?"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyber-promo focus:ring-2 focus:ring-cyber-promo/10 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyber-main disabled:opacity-60 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
