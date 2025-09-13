// App.jsx
import Key from "./components/Key";
import "./App.css";
import { useEffect } from "react";
import Audio from "./components/Audio";
import clap from "./audios/clap.mp3"
import hihat from "./audios/hihat.mp3"
import kick from "./audios/kick.mp3"
import openhat from "./audios/openhat.wav"
import boom from "./audios/boom.mp3"
import ride from "./audios/ride.wav"
import tom from "./audios/tom2.wav"
import snare from "./audios/snare.mp3"
import tink from "./audios/tink.mp3"

export default function App() {
  function playSound(code) {
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    const audio = document.querySelector(`audio[data-key="${code}"]`);
    const key = document.querySelector(`.key[data-key="${code}"]`);

    if (!audio || !key) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("playing");
  }

  useEffect(() => {
    function handleKeyDown(event) {
      playSound(event.code);
    }

    window.addEventListener("keydown", handleKeyDown);

    const keys = document.querySelectorAll(".key");

    keys.forEach((key) =>
      key.addEventListener("transitionend", removeTransition)
    );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      keys.forEach((key) =>
        key.removeEventListener("transitionend", removeTransition)
      );
    };
  }, []);

  const keyData = [
    { code: "KeyA", letter: "A", sound: "clap", path: clap},
    { code: "KeyS", letter: "S", sound: "hihat", path: hihat },
    { code: "KeyD", letter: "D", sound: "kick", path: kick },
    {
      code: "KeyF",
      letter: "F",
      sound: "openhat",
      path: openhat,
    },
    { code: "KeyG", letter: "G", sound: "boom", path: boom },
    { code: "KeyH", letter: "H", sound: "ride", path: ride },
    { code: "KeyJ", letter: "J", sound: "snare", path: snare },
    { code: "KeyK", letter: "K", sound: "tom", path: tom },
    { code: "KeyL", letter: "L", sound: "tink", path: tink },
  ];
  return (
    <main>
      <div className="keys">
          {keyData.map((keyData) => (
            <Key
              key={keyData.code}
              keyName={keyData.code}
              keyLetter={keyData.letter}
              soundName={keyData.sound}
              onPlay={playSound}
            />
          ))}
        </div>
      {keyData.map((keyData)=>(
        <Audio
          key={keyData.code}
          audioPath={keyData.path}
          code={keyData.code}
        />
      ))}
    </main>
  );
}
