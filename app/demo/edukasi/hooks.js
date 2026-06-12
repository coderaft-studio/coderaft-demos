"use client";
import { useEffect } from "react";

export function useAnimateOnScroll(selector=".ed-wow", animClass="ed-animated", delay=0) {
  useEffect(()=>{
    const timer = setTimeout(()=>{
      const observer = new IntersectionObserver(
        (entries)=>{
          entries.forEach(entry=>{
            if(entry.isIntersecting){
              entry.target.classList.add(animClass);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll(`${selector}:not(.${animClass})`).forEach(el=>observer.observe(el));
      return ()=>observer.disconnect();
    }, delay);
    return ()=>clearTimeout(timer);
  },[selector, animClass, delay]);
}
