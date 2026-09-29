import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Laptop, Headphones, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | CyberMonday",
  description: "Join our team and help shape the future of tech e-commerce.",
};

const roles = [
  { title: "Frontend Engineer", dept: "Engineering", location: "Paris / Remote", type: "Full-time", icon: Laptop },
  { title: "Head of Customer Support", dept: "Support", location: "Paris", type: "Full-time", icon: Headphones },
  { title: "Growth Marketing Manager", dept: "Marketing", location: "Remote", type: "Full-time", icon: BarChart3 },
];

export default function CareersPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-cyber-main tracking-tight mb-3">Join Our Team</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We're building the future of tech e-commerce. Come work with a passionate team that loves great products.
          </p>
        </div>

        <div className="bg-cyber-main rounded-2xl p-8 text-white mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-cyber-promo/20 p-5 rounded-full">
            <Briefcase className="w-10 h-10 text-cyber-promo" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Why CyberMonday?</h2>
            <p className="text-gray-300">Competitive salary, remote-friendly culture, great gear budget, and the chance to build something people love every Cyber Monday.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-cyber-main mb-6">Open Positions</h2>
        <div className="space-y-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div key={role.title} className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md hover:border-cyber-promo/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-cyber-promo/10 p-3 rounded-full">
                    <Icon className="w-5 h-5 text-cyber-promo" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cyber-main">{role.title}</h3>
                    <p className="text-sm text-gray-500">{role.dept} · {role.location} · {role.type}</p>
                  </div>
                </div>
                <Link href="/contact" className="bg-cyber-main text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Apply Now
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Don't see your role? <Link href="/contact" className="text-cyber-promo hover:underline font-medium">Send us your CV anyway.</Link>
        </p>
      </div>
    </div>
  );
}
