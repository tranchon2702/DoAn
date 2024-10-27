import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/chatlogo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>FunnyChat</h3>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Contacts */}
          <div className="contacts">
            {filteredContacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current User */}
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 65% 15%;
  overflow: hidden;
  background-color: ${(props) => props.theme.contactBackground};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: ${(props) => props.theme.text};
      text-transform: uppercase;
    }
  }

  .search-bar {
    display: flex;
    justify-content: center;
    padding: 0.5rem;

    input {
      width: 90%;
      padding: 0.5rem;
      border-radius: 0.2rem;
      border: none;
      background-color: ${(props) => props.theme.inputBackground};
      color: ${(props) => props.theme.text};
      font-size: 1rem;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Đổ bóng bên trong */
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: ${(props) => props.theme.text};
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: ${(props) => props.theme.contactBackground};
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Nhẹ nhàng */
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: ${(props) => props.theme.text};
        }
      }

      &:hover {
        background-color: ${(props) => props.theme.inputBackground}; /* Hiệu ứng hover */
      }

      &.selected {
        background-color: ${(props) => props.theme.selectedBackground};
        color: white;
      }
    }
  }

  .current-user {
    background-color: ${(props) => props.theme.headerBackground};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: ${(props) => props.theme.text};
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
