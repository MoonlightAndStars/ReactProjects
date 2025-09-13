export default function Key({ keyName, keyLetter, soundName, onPlay }) {
  return (
    <div className="key" data-key={keyName} onClick={() => onPlay(keyName)}>
      <kbd>{keyLetter}</kbd> <span className="sound">{soundName}</span>
    </div>
  );
}
