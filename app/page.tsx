'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,        // ⬅️ added: lets us send a message programmatically
  } = useChat({ api: '/api/chat' });

  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages]);

  // ⬅️ quick send helper
  function sendQuick(text: string) {
    if (isLoading) return;
    append({ role: 'user', content: text });
  }

  return (
    <main className="wrap">
      <header className="header">
        <div className="topline">
          <span className="pill">Only Used Tesla • Support Agent (Demo)</span>
          <span>Ask about listings, dealer plans, cash offers.</span>
        </div>
        <h1>How can we help?</h1>
        <p>Try: “What does the $47 listing include?” or “How do dealers upload inventory?”</p>
      </header>

      <section className="card chat">
        <div ref={scroller} className="msgs" aria-live="polite">
          <div className="system">
            You’re chatting with an AI. It may make mistakes—verify important info.
          </div>

          {messages.map(m => (
            <div key={m.id} className={`msg ${m.role === 'user' ? 'you' : 'ai'}`}>
              <div className={`bubble ${m.role === 'user' ? 'you' : 'ai'}`}>
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="msg ai">
              <div className="bubble ai">Thinking…</div>
            </div>
          )}
        </div>

        {/* ⬇️ Quick-reply chips live here, just above the composer */}
        <div className="chips">
          <button className="chip" onClick={() => sendQuick("What does the $47 listing include?")}>
            $47 listing?
          </button>
          <button className="chip" onClick={() => sendQuick("How do dealers upload inventory (CSV/FTP)?")}>
            Dealer import
          </button>
          <button className="chip" onClick={() => sendQuick("How do cash offers work? What do you need from me?")}>
            Cash offers
          </button>
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <input
            className="input"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your question…"
            autoComplete="off"
          />
          <button className="button" disabled={isLoading} type="submit">
            Send
          </button>
        </form>
      </section>

      <p className="footer">AI answers are informational. For precise offers or billing, we’ll connect you to a human.</p>
    </main>
  );
}

      
