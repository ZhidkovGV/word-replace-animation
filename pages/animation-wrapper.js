import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Animate.module.css'

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function AnimateText({ children, dictionary }) {
  const [selectedIndex, setIndexCallback] = useState(0);
  const strings = [children, ...dictionary];
  useInterval(
    () => setIndexCallback(selectedIndex + 1 > strings.length - 1 ? 0 : selectedIndex + 1),
    2000)
  return (
    <span className={styles.container}>
      {
        strings.map((string, i) => {
          return (<span key={i} className={`${styles.item} ${i === selectedIndex ? styles.active : ''}`}>
            {string}
          </span>);
        })}
      {strings.sort((a, b) => b.length - a.length)[0]}
    </span>
  )
}