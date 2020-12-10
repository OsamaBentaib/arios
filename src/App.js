import React, { useRef, useState } from "react";
import { TweenMax } from "gsap";
import i1 from "./assets/images/1.jpg";
import i2 from "./assets/images/2.jpg";
import i3 from "./assets/images/3.jpg";
import i4 from "./assets/images/4.jpg";
export const content = [
  { background: i1, link: "Watch", tag: "Adrienne Watch" },
  { background: i2, link: "Addidas", tag: "Adrienne Addidas" },
  { background: i3, link: "Parfume", tag: "Adrienne Hoareau" },
  { background: i4, link: "glasses", tag: "Adrienne Glasses" },
];
function App() {
  const [current, setCurrent] = useState(0);
  const refs = useRef([]);
  /**
   * with this method on refs we will have an arrays of current
   * so for each screen it's will have an ref
   * ==========================================
   * this will help us to use an infinite refs instad of
   * writing useRef for each screen
   */
  // hide screen function take a index as screen
  const hideScreen = (screen) => {
    /**
     * we have to access for this screen ref
     * by adding refs.current[screen]
     * screen === index of content
     */
    TweenMax.set(refs.current[screen], { zIndex: 10 });
    TweenMax.to(refs.current[screen], 0.4, {
      ease: "Power2.easeOut",
      opacity: 0,
      onComplete: () => TweenMax.set(refs.current[screen], { zIndex: 1 }),
    });
  };
  const showScreen = (screen) => {
    /**
     * first for animation we have to update the opacity and index to 1
     */
    TweenMax.set(refs.current[screen], { opacity: 1, zIndex: 1 });

    TweenMax.to(refs.current[screen], 1.8, {
      ease: "Power2.easeOut",
      startAt: { scale: 1.07 },
      scale: 1,
    });
  };
  const onMouseEnter = (position) => {
    /**
     * The screen that we just hover it it's the current
     * screen so we don't have to do anything
     */
    if (position === current) return;
    /**
     * update the current screen with the new position
     */
    setCurrent(position);
    /**
     * Hide the previews background
     * we pass the index of the screen
     */
    hideScreen(current);
    /**
     * Show the previews background
     * we pass the index of the screen
     */
    showScreen(position);
  };
  return (
    <main>
      <div className="frame">
        <h1 className="frame__pagetitle">Arios</h1>
      </div>
      <div className="screens" aria-hidden="true">
        {content.map((screen, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            className="screen__item"
          >
            <div
              className="screen screen--full"
              style={{ backgroundImage: `url(${screen.background})` }}
            ></div>
            <div
              className="screen screen--clip screen--clip-1"
              style={{ backgroundImage: `url(${screen.background})` }}
            ></div>
            <div
              className="screen screen--clip screen--clip-2"
              style={{ backgroundImage: `url(${screen.background})` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="content">
        <nav className="menu">
          {content.map((screen, index) => (
            <span
              key={index}
              onMouseEnter={() => onMouseEnter(index)}
              className="menu__item"
            >
              <span className="menu__item-tag">{screen.tag}</span>
              <span className="menu__item-link">{screen.link}</span>
            </span>
          ))}
        </nav>
      </div>
    </main>
  );
}

export default App;
