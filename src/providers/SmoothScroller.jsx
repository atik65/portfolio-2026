// "use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroller({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div ref={lenisRef}>{children}</div>;
}

// import { ReactLenis } from "lenis/react";
// import { cancelFrame, frame } from "framer-motion";
// import { useEffect, useRef } from "react";

// function SmoothScroller({ children }) {
//   const lenisRef = useRef(null);

//   useEffect(() => {
//     function update(data) {
//       const time = data.timestamp;
//       lenisRef.current?.lenis?.raf(time);
//     }

//     frame.update(update, true);

//     return () => cancelFrame(update);
//   }, []);

//   // return <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />;

//   return <ReactLenis ref={lenisRef}> {children} </ReactLenis>;
// }

// export default SmoothScroller;
