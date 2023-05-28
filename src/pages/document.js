import { useState } from "react";
import { latexCode, taskCode } from "../components/codeSnippits";

const CodeViewer = ({ code, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const toggleOpen = () => setIsOpen(!isOpen);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy text");
    }
  };

  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-2 cursor-pointer" onClick={toggleOpen}>
          {title} (click to {isOpen ? "collapse" : "expand"})
        </h2>
      </div>
      {copySuccess && <div className="text-sm text-green-500">{copySuccess}</div>}
      {isOpen && (
        <div className="relative bg-gray-300 p-4 rounded overflow-auto">
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 bg-primary-300 hover:bg-primary-500 text-white font-bold py-2 px-4 rounded">
            Copy
          </button>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

function Document() {
  return (
    <div className="flex justify-center  h-screen bg-slate-200 p-8">
      <div className="bg-white rounded-lg w-4/5 p-8">
        <h1 className="text-2xl  mb-4">
          This is my document setup for Overleaf. I have a file named template.tex then my main document for whatever
          I'm handing in that is named like 10.3P etc.
        </h1>
        <CodeViewer code={latexCode} title="Here is the code for template.tex:" />
        <CodeViewer code={taskCode} title="Here is the code for the document:" />
      </div>
    </div>
  );
}

export default Document;
