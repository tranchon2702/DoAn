import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setUserName(userData.username);
    };
    fetchUser();
  }, []);
  
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
    border-radius: 1rem;
  height: 100%; /* Chiều cao 100% để căn giữa */
  background-color: ${(props) => props.theme.background}; /* Nền từ theme */
  padding: 2rem; /* Tạo khoảng cách đều cho giao diện */
  
  img {
    height: 20rem;
    margin-bottom: 2rem; /* Thêm khoảng cách dưới cho ảnh */
    animation: float 4s ease-in-out infinite; /* Hiệu ứng nổi nhẹ */
  }

  h1 {
    color: ${(props) => props.theme.text}; /* Màu chữ từ theme */
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: ${(props) => props.theme.subText}; /* Màu chữ phụ từ theme */
    font-size: 1.5rem;
    font-weight: 300; /* Làm cho font chữ mỏng hơn */
    text-align: center; /* Canh giữa */
  }

  span {
    color: ${(props) => props.theme.primary}; /* Sử dụng màu chính từ theme */
    font-weight: bold; /* Làm nổi bật tên người dùng */
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px); /* Hiệu ứng nổi lên xuống */
    }
  }
`;
