import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faComment } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const Sidebar = ({ handleTopicClick, sidebarMessages, handleNewChat }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNewChatClick = () => {
    handleNewChat("New chat");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      {isOpen && (
        <div className="sidebar-content">
          <button className="new-chat-button" onClick={handleNewChatClick}>
            <FontAwesomeIcon icon={faComment} />
            New Chat
          </button>

          <h3>Recent Messages:</h3>
          <ul className="recent-messages">
            {sidebarMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.user}`}>
          <div className="message-icon">
            {message.user === "user" ? "👤" : "🤖"}
          </div>
          <div className="message-text">{message.text}</div>
        </div>
      ))}
    </div>
  );
};

const ChatForm = ({ handleSubmit, handleChange, inputText }) => {
  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputText}
        onChange={handleChange}
        className="chat-input"
      />
      <button type="submit" className="chat-button">
        Send
      </button>
    </form>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [sidebarMessages, setSidebarMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inputText) return;

    const userMessage = {
      text: inputText,
      user: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    setSidebarMessages((prevSidebarMessages) => [
      ...prevSidebarMessages,
      inputText,
    ]);

    const chatGptMessage = {
      text: `Response to "${inputText}"`,
      user: "chatGpt",
    };

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, chatGptMessage]);
    }, 500);
  };

    const handleNewChat = (newChatMessage) => {
      setInputText(newChatMessage);
    };

  return (
    <div className="app">
      <Sidebar
        sidebarMessages={sidebarMessages}
        handleNewChat={handleNewChat}
      />
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <ChatForm
          handleSubmit={handleFormSubmit}
          handleChange={handleInputChange}
          inputText={inputText}
        />
      </div>
    </div>
  );
};

export default App;
