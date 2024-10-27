import React, { useState, useRef, useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { FiPaperclip } from "react-icons/fi"; // Biểu tượng đính kèm file

export default function ChatInput({ handleSendMsg, handleSendImage }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null); // Ref để xác định emoji picker
  const inputContainerRef = useRef(null); // Ref cho input container

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleSendImage(file);
    }
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  // useEffect để tắt emoji picker khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !inputContainerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <div className="button-container">
        {/* Nút Emoji */}
        <div className="emoji" ref={inputContainerRef}>
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div ref={emojiPickerRef}>
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        {/* Nút chọn tệp hình ảnh */}
        <div className="file-input">
          <input
            type="file"
            id="file"
            accept="image/*" // Chỉ chấp nhận hình ảnh
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <FiPaperclip />
          </label>
        </div>
      </div>

      {/* Input để nhập tin nhắn */}
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.headerBackground};
  padding: 0 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  gap: 1rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.text};
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: ${(props) => props.theme.emojiColor};
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: ${(props) => props.theme.chatBackground};
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        z-index: 1000;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: ${(props) => props.theme.chatBackground};
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
          color: ${(props) => props.theme.text};
        }

        .emoji-group:before {
          background-color: ${(props) => props.theme.chatBackground};
        }
      }
    }

    .file-input {
      position: relative;
      input {
        display: none;
      }
      label {
        cursor: pointer;
        svg {
          font-size: 1.5rem;
          color: ${(props) => props.theme.emojiColor};
        }
      }
    }
  }

  .input-container {
    display: flex;
    flex-grow: 1;
    align-items: center;
    gap: 1rem;
    background-color: ${(props) => props.theme.inputBackground};
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

    input {
      flex-grow: 1;
      background-color: transparent;
      color: ${(props) => props.theme.text};
      border: none;
      font-size: 1.2rem;
      padding-left: 1rem;

      &::selection {
        background-color: ${(props) => props.theme.text};
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.5rem;
      border-radius: 2rem;
      background-color: ${(props) => props.theme.buttonBackground};
      border: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 1.5rem;
        color: ${(props) => props.theme.inputBackground};
      }
    }
  }
`;
