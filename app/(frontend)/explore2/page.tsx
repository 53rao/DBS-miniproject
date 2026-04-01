"use client"

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Movie } from '@/lib/types';
import Card1 from "@/components/card1";
import Navbar from '@/components/navbar';
import Hero from '@/sections/hero';

const messages: Record<string, string> = {
  not_admin: "Only admins can view that page",
}

export default function Explore() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const { data } = await res.json();
      setMovies(data);
      setTimeout(() => setLoaded(true), 150);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error && messages[error]) {
      toast.error(messages[error]);
      router.replace("/explore", { scroll: false });
    }
  }, [searchParams]);

  // Random glitch pulse every 4–9s
  useEffect(() => {
    const schedule = () => {
      const delay = 4000 + Math.random() * 5000;
      return setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 300);
        schedule();
      }, delay);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');

        :root {
          --void:    #03050f;
          --panel:   #080d1a;
          --cyan:    #00f5ff;
          --magenta: #ff2d78;
          --acid:    #b4ff00;
          --white:   #e8edf5;
          --dim:     #3a4560;
          --border:  rgba(0,245,255,0.18);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--void); cursor: crosshair; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--void); }
        ::-webkit-scrollbar-thumb { background: var(--cyan); }

        /* ── Root ─────────────────────────────────── */
        .cp-root {
          position: relative;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          background: var(--void);
          color: var(--white);
          font-family: 'Rajdhani', sans-serif;
        }

        /* ── Scanlines ────────────────────────────── */
        .cp-scan {
          position: fixed; inset: 0; z-index: 1;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.08) 3px,
            rgba(0,0,0,0.08) 4px
          );
        }

        /* ── CRT vignette ─────────────────────────── */
        .cp-vignette {
          position: fixed; inset: 0; z-index: 2;
          pointer-events: none;
          background: radial-gradient(ellipse 90% 90% at 50% 50%,
            transparent 60%,
            rgba(0,0,0,0.65) 100%
          );
        }

        /* ── Grid overlay ─────────────────────────── */
        .cp-gridlines {
          position: fixed; inset: 0; z-index: 0;
          pointer-events: none;
          opacity: .035;
          background-image:
            linear-gradient(var(--cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--cyan) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Glitch state ─────────────────────────── */
        .cp-root.glitch .cp-heading {
          animation: glitchText .28s steps(2) forwards;
        }
        .cp-root.glitch .cp-hero-zone {
          animation: glitchShift .28s steps(2) forwards;
        }

        @keyframes glitchText {
          0%   { text-shadow: 3px 0 var(--magenta), -3px 0 var(--cyan); clip-path: inset(10% 0 80% 0); }
          25%  { text-shadow: -4px 0 var(--cyan), 4px 0 var(--magenta); clip-path: inset(50% 0 30% 0); }
          50%  { text-shadow: 2px 0 var(--acid), -2px 0 var(--magenta); clip-path: inset(70% 0 5% 0); }
          75%  { text-shadow: -3px 0 var(--cyan), 3px 0 var(--magenta); clip-path: inset(20% 0 60% 0); }
          100% { text-shadow: none; clip-path: none; }
        }

        @keyframes glitchShift {
          0%   { transform: translateX(4px); filter: hue-rotate(90deg); }
          50%  { transform: translateX(-4px); filter: hue-rotate(-90deg); }
          100% { transform: none; filter: none; }
        }

        /* ── Navbar zone ──────────────────────────── */
        .cp-nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 200;
        }

        /* ── Hero zone ────────────────────────────── */
        .cp-hero-zone {
          width: 100%;
          min-height: 100svh;
          position: relative;
        }

        /* ── Corner deco ──────────────────────────── */
        .cp-corner {
          position: absolute;
          width: 24px; height: 24px;
          pointer-events: none;
        }
        .cp-corner--tl { top: 0; left: 0; border-top: 2px solid var(--cyan); border-left: 2px solid var(--cyan); }
        .cp-corner--tr { top: 0; right: 0; border-top: 2px solid var(--cyan); border-right: 2px solid var(--cyan); }
        .cp-corner--bl { bottom: 0; left: 0; border-bottom: 2px solid var(--cyan); border-left: 2px solid var(--cyan); }
        .cp-corner--br { bottom: 0; right: 0; border-bottom: 2px solid var(--cyan); border-right: 2px solid var(--cyan); }

        /* ── Divider bar ──────────────────────────── */
        .cp-divbar {
          position: relative; z-index: 3;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            var(--void),
            var(--magenta) 20%,
            var(--cyan) 50%,
            var(--magenta) 80%,
            var(--void)
          );
          box-shadow: 0 0 18px var(--cyan), 0 0 36px rgba(0,245,255,.3);
        }

        /* ── Status bar ───────────────────────────── */
        .cp-statusbar {
          position: relative; z-index: 3;
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: .5rem clamp(1.25rem, 5vw, 5rem);
          background: var(--panel);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .cp-statusbar::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(0,245,255,.04), transparent 40%);
          pointer-events: none;
        }
        .cp-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--acid);
          box-shadow: 0 0 8px var(--acid);
          animation: blink 1.4s ease infinite;
          flex-shrink: 0;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .25; }
        }
        .cp-status-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: .6rem;
          color: var(--acid);
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .cp-status-sep {
          color: var(--dim);
          font-family: 'Share Tech Mono', monospace;
          font-size: .55rem;
        }
        .cp-status-ping {
          font-family: 'Share Tech Mono', monospace;
          font-size: .55rem;
          color: var(--dim);
          letter-spacing: .1em;
          margin-left: auto;
        }
        .cp-status-ping span {
          color: var(--cyan);
        }

        /* ── TRENDING SECTION ─────────────────────── */
        .cp-section {
          padding: 4rem clamp(1.25rem, 5vw, 5rem) 8rem;
          position: relative; z-index: 3;
        }

        /* ── Section header ───────────────────────── */
        .cp-header {
          margin-bottom: 3.5rem;
          position: relative;
        }
        .cp-header-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: .6rem;
        }
        .cp-header-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: .58rem;
          color: var(--magenta);
          letter-spacing: .28em;
          text-transform: uppercase;
          border: 1px solid var(--magenta);
          padding: .2rem .55rem;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(255,45,120,.3), inset 0 0 8px rgba(255,45,120,.05);
        }
        .cp-header-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, var(--magenta), transparent);
          opacity: .35;
        }
        .cp-heading {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2.4rem, 6.5vw, 6rem);
          font-weight: 900;
          line-height: .92;
          letter-spacing: -.01em;
          color: var(--white);
          text-shadow:
            0 0 30px rgba(0,245,255,.25),
            0 0 60px rgba(0,245,255,.1);
        }
        .cp-heading .neon {
          color: var(--cyan);
          text-shadow:
            0 0 10px var(--cyan),
            0 0 30px var(--cyan),
            0 0 60px rgba(0,245,255,.5);
        }
        .cp-header-sub {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: .8rem;
        }
        .cp-counter {
          font-family: 'Share Tech Mono', monospace;
          font-size: .65rem;
          color: var(--dim);
          letter-spacing: .1em;
        }
        .cp-counter span { color: var(--cyan); }
        .cp-subline {
          flex: 1; height: 1px;
          background: linear-gradient(to right, var(--border), transparent);
        }

        /* ── Grid ─────────────────────────────────── */
        .cp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          box-shadow: 0 0 40px rgba(0,245,255,.04);
        }
        @media (min-width: 560px) {
          .cp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 860px) {
          .cp-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 1200px) {
          .cp-grid { grid-template-columns: repeat(6, 1fr); }
        }

        /* ── Card cell ────────────────────────────── */
        .cp-cell {
          background: var(--panel);
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: cellIn .5s ease forwards;
          transition: background .25s;
        }
        .cp-cell:hover {
          background: #0d1428;
          z-index: 10;
        }
        .cp-cell::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,245,255,.05), transparent 60%);
          opacity: 0;
          transition: opacity .3s;
          pointer-events: none;
        }
        .cp-cell:hover::after { opacity: 1; }

        /* neon border glow on hover */
        .cp-cell::before {
          content: '';
          position: absolute; inset: 0;
          border: 1px solid transparent;
          transition: border-color .3s, box-shadow .3s;
          pointer-events: none;
          z-index: 2;
        }
        .cp-cell:hover::before {
          border-color: rgba(0,245,255,.5);
          box-shadow: inset 0 0 20px rgba(0,245,255,.08);
        }

        @keyframes cellIn {
          from { opacity: 0; transform: scale(.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ── Skeleton ─────────────────────────────── */
        .cp-skel {
          aspect-ratio: 2/3;
          background: linear-gradient(110deg, #080d1a 30%, #0f1525 50%, #080d1a 70%);
          background-size: 200% 100%;
          animation: cellIn .4s ease forwards, skel 1.8s ease infinite;
        }
        @keyframes skel {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Floating corner coords ───────────────── */
        .cp-coord {
          position: absolute;
          bottom: .4rem; right: .5rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: .45rem;
          color: var(--dim);
          letter-spacing: .08em;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          transition: opacity .25s;
        }
        .cp-cell:hover .cp-coord { opacity: 1; }

        /* ── Ambient glows ────────────────────────── */
        .cp-glow-a {
          position: absolute;
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,255,.07), transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          animation: driftA 12s ease-in-out infinite alternate;
        }
        .cp-glow-b {
          position: absolute;
          bottom: -100px; right: -100px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,45,120,.07), transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          animation: driftB 10s ease-in-out infinite alternate;
        }
        @keyframes driftA {
          from { transform: translate(0,0); }
          to   { transform: translate(80px, 60px); }
        }
        @keyframes driftB {
          from { transform: translate(0,0); }
          to   { transform: translate(-60px, -40px); }
        }
      `}</style>

      <div className={`cp-root${glitch ? ' glitch' : ''}`}>
        <div className="cp-gridlines" aria-hidden />
        <div className="cp-scan" aria-hidden />
        <div className="cp-vignette" aria-hidden />

        {/* Ambient glows */}
        <div className="cp-glow-a" aria-hidden />
        <div className="cp-glow-b" aria-hidden />

        {/* Navbar */}
        <div className="cp-nav"><Navbar /></div>

        {/* Hero */}
        <section className="cp-hero-zone" style={{ position: 'relative' }}>
          <Hero />
          <div className="cp-corner cp-corner--tl" />
          <div className="cp-corner cp-corner--tr" />
          <div className="cp-corner cp-corner--bl" />
          <div className="cp-corner cp-corner--br" />
        </section>

        {/* Neon divider */}
        <div className="cp-divbar" aria-hidden />

        {/* Status bar */}
        <div className="cp-statusbar">
          <div className="cp-status-dot" />
          <span className="cp-status-text">STREAM ACTIVE</span>
          <span className="cp-status-sep">//</span>
          <span className="cp-status-text">CATALOGUE SYNC</span>
          <span className="cp-status-sep">//</span>
          <span className="cp-status-text">NODE 04-ALPHA</span>
          <span className="cp-status-ping">
            PING <span>12ms</span>
          </span>
        </div>

        {/* Trending section */}
        <section className="cp-section">
          <div className="cp-header">
            <div className="cp-header-top">
              <span className="cp-header-tag">SYS::TRENDING</span>
              <div className="cp-header-line" />
            </div>
            <h2 className="cp-heading">
              NOW <span className="neon">PLAYING</span>
            </h2>
            <div className="cp-header-sub">
              <span className="cp-counter">
                SHOWING <span>{String(Math.min(6, movies.length || 6)).padStart(2,'0')}</span> / {String(movies.length || 0).padStart(2,'0')} TITLES
              </span>
              <div className="cp-subline" />
            </div>
          </div>

          <div className="cp-grid">
            {loaded && movies.length > 0
              ? movies.slice(0, 6).map((movie, i) => (
                  <div
                    key={movie.title}
                    className="cp-cell"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <Card1 movie={movie} />
                    <span className="cp-coord">
                      [{String(i + 1).padStart(2,'0')}:{String(Math.floor(Math.random()*99)).padStart(2,'0')}]
                    </span>
                  </div>
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="cp-cell"
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    <div className="cp-skel" />
                  </div>
                ))
            }
          </div>
        </section>
      </div>
    </>
  );
}