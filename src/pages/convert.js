import { useState } from "react";

function Convert() {
  const [originalText, setOriginalText] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleButtonClick = () => {
    const headerOneRegex = /^#{1}\s(.*)/gm; // h1

    const headerTwoRegex = /^#{2}\s(.*)/gm; // h2

    const headerThreeRegex = /^#{3}\s(.*)/gm; // h3

    const imageRegex = /!\[\[(.*?)\]\]/g;

    const codeBlockRegex = /```([^`]+)```/g;

    const inlineCodeRegex = /`([^`\n]+)`/g;
    // const specialCharRegex = /(?<![{}])[_&](?![{}])/g; // TODO:  fix this some time so that it doesn't escape things within codeblocks

    const boldItalicRegex = /\*\*\*(.*?)\*\*\*/g;

    const boldRegex = /\*\*(.*?)\*\*/g;

    const italicRegex = /\*(.*?)\*/g;

    const linkRegex = /\[(.*?)\]\((.*?)\)/g;

    setOriginalText(displayText);

    let isInCodeBlock = false;
    let replacedText = displayText
      .split("\n")
      .map((line) => {
        if (line.startsWith("```")) {
          isInCodeBlock = !isInCodeBlock;
        }

        if (!isInCodeBlock) {
          line = line
            .replace(headerOneRegex, "\\section*{$1}")
            .replace(headerTwoRegex, "\\subsection*{$1}")
            .replace(headerThreeRegex, "\\subsubsection*{$1}");
        }

        return line;
      })
      .join("\n");

    replacedText = replacedText.replace(inlineCodeRegex, "\\lstinline{$1}");
    replacedText = replacedText.replace(imageRegex, function (match, p1) {
      return `
\\begin{figure}[h]
  \\centering
  \\includegraphics[width=0.6\\textwidth]{${p1}}
  \\caption{Caption}
  \\label{fig:${p1.replace(/\s/g, "_")}}
\\end{figure}
  `;
    });

    replacedText = replacedText.replace(codeBlockRegex, function (match, p1) {
      return `
\\begin{lstlisting}[language=python, caption={caption here}]${p1}\\end{lstlisting}
  `;
    });

    replacedText = replacedText.replace(boldItalicRegex, "\\textbf{\\textit{$1}}");
    replacedText = replacedText.replace(boldRegex, "\\textbf{$1}");
    replacedText = replacedText.replace(italicRegex, "\\textit{$1}");

    replacedText = replacedText.replace(linkRegex, "\\href{$2}{$1}");

    setDisplayText(replacedText);
  };

  const undoConvert = () => {
    setDisplayText(originalText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayText);
  };
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col">
      <textarea
        className="w-4/5 h-4/5 bg-white p-4 shadow-lg rounded-md overflow-auto resize-none"
        placeholder="Type something..."
        value={displayText}
        onChange={(e) => setDisplayText(e.target.value)}
        style={{ minHeight: "80vh", minWidth: "80vw" }}></textarea>
      <div className="flex mt-4">
        <button
          className="mr-2 px-4 py-2 bg-primary-300 hover:bg-primary-400 rounded-lg shadow-md focus:outline-none"
          onClick={handleButtonClick}>
          Submit
        </button>
        <button
          className="mr-2 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 rounded-lg shadow-md focus:outline-none"
          onClick={undoConvert}>
          Undo
        </button>
        <button
          className="px-4 py-2 bg-emerald-200 hover:bg-emerald-400 rounded-lg shadow-md focus:outline-none"
          onClick={copyToClipboard}>
          Copy to clipboard
        </button>
      </div>
    </div>
  );
}

export default Convert;
