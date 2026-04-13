"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "@/components/pages/home/Navbar";
import Footer from "@/components/pages/home/Footer";
import ProjectDetails from "@/components/pages/home/ProjectDetails";
import ScrollToTop from "@/components/pages/home/ScrollToTop";
import { projects } from "@/data/projects";
import Link from 'next/link';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-6xl font-headline font-black mb-6 tracking-tighter">404</h1>
        <p className="text-white/40 mb-12 font-medium max-w-sm">The project you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="px-8 py-4 rounded-full bg-primary text-black font-headline font-black hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-black">
      <Navbar />
      <ProjectDetails 
        project={project} 
        onBack={() => router.push('/#work')} 
      />
      <Footer />
      <ScrollToTop />
    </main>
  );
}