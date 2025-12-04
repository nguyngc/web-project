import { useState } from "react";

const ChatAiWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I’m the iVision Clinic assistant. How can we help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Get token from sessionStorage or localStorage (depending on which one you use)
  const getToken = () => {
    try {
      const raw =
        sessionStorage.getItem("user") || localStorage.getItem("user");
      if (!raw) return null;

      const parsed = JSON.parse(raw);

      // try to find token under several common names
      return (
        parsed.token ||
        parsed.accessToken ||
        parsed.jwt ||
        (parsed.user &&
          (parsed.user.token ||
            parsed.user.accessToken ||
            parsed.user.jwt)) ||
        null
      );
    } catch (e) {
      console.error("Cannot read token from storage", e);
      return null;
    }
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (trimmed.length > 500) {
      setErrorMsg("Message is too long (max 500 characters).");
      return;
    }
    setErrorMsg("");

    const userMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = getToken();

      const res = await fetch("/api/chat-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg =
          errData.message || errData.error || "Failed to get AI response";
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Sorry, there was an error: ${msg}` },
        ]);
        return;
      }

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text:
          data.output ||
          "Sorry, our assistant could not answer this at the moment.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Network error. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // when chat is closed -> show only round button 
  if (!isOpen) {
    return (
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        💬
      </button>
    );
  }

  // when chat is open -> show full chatbox
  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <span>iVision Clinic Assistant</span>
        <button
          className="chatbox-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      <div className="chatbox-messages">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={
              m.sender === "user" ? "chat-bubble user" : "chat-bubble bot"
            }
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="chat-bubble bot">Typing…</div>}
      </div>

      <div className="chatbox-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about services, symptoms, or booking..."
          rows={1}
          maxLength={500}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>

      {errorMsg && <div className="chatbox-error">{errorMsg}</div>}
    </div>
  );
};

export default ChatAiWidget;
