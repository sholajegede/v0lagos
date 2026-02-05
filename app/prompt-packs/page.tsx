"use client";

export default function PromptPacks() {
  return (
    <>
      <style jsx global>{`
        html, body, div#__next {
          margin: 0;
          height: 100%;
          overflow: hidden;
        }
        iframe {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>

      <iframe 
        src="https://shipitfirst.notion.site/ebd//2fccb1824ca08004933cfc6834ca59d9"
        frameBorder="0"
        title="Notion Page"
        allowFullScreen
      />
    </>
  );
}