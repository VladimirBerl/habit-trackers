export function splitText(text: string): React.JSX.Element[] {
  return text.split("\n").map((line, idx) => <p key={idx}>{line}</p>);
}
