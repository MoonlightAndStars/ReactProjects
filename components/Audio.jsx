export default function Audio({audioPath, code}) {
  return <audio className="sound" src={audioPath} data-key={code}></audio>;
}
