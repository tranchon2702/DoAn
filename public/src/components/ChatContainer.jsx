import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // Lấy tin nhắn từ database khi chat hiện tại thay đổi
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  // Hàm để gửi hình ảnh
  const handleSendImage = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const base64Image = reader.result;

      // Gửi hình ảnh qua socket
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg: null, // Không có tin nhắn văn bản, chỉ gửi hình ảnh
        image: base64Image,
      });

      // Cập nhật giao diện cho người gửi
      const msgs = [...messages];
      msgs.push({ fromSelf: true, image: base64Image });
      setMessages(msgs);

      // Gửi đến backend để lưu trữ
      await axios.post(sendMessageRoute, {
        from: data._id,
        to: currentChat._id,
        message: null,
        image: base64Image, // Gửi hình ảnh lên server
      });
    };
  };

  // Hàm để gửi tin nhắn văn bản
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    // Gửi tin nhắn qua socket
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg, // Gửi tin nhắn văn bản
      image: null, // Đảm bảo không có hình ảnh khi gửi tin nhắn văn bản
    });

    // Cập nhật tin nhắn trong giao diện người gửi
    const newMessage = { fromSelf: true, message: msg }; // Tạo tin nhắn mới
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Gửi tin nhắn đến backend để lưu trữ
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
      image: null,
    });
  };

  // Cập nhật tin nhắn khi nhận được từ socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        console.log("Message received: ", data); // Log để kiểm tra dữ liệu nhận
        if (data.image) {
          setArrivalMessage({ fromSelf: false, image: data.image });
        } else if (data.message) {
          setArrivalMessage({ fromSelf: false, message: data.message });
        }
      });
    }
  }, [socket]);

  // Cập nhật giao diện khi nhận được tin nhắn
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content">
                {/* Hiển thị hình ảnh nếu có */}
                {message.image ? (
                  <img src={message.image} alt="sent" className="chat-image" />
                ) : (
                  <p>{message.message}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} handleSendImage={handleSendImage} />
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.chatBackground};
  border-radius: 10px; /* Bo góc nhẹ để tạo cảm giác mềm mại */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: ${(props) => props.theme.headerBackground};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Đổ bóng nhẹ cho header */
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2.5rem;
        }
      }
      .username {
        h3 {
          color: ${(props) => props.theme.text};
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    color: ${(props) => props.theme.text};
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: ${(props) => props.theme.text};
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: ${(props) => props.theme.text};
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
      .chat-image {
        max-width: 100%;
        border-radius: 1rem;
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: ${(props) => props.theme.sendedMessageBackground};
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background-color: ${(props) => props.theme.receivedMessageBackground};
      }
    }
  }
`;
