import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
      
        li {
          a {
            position: relative;
            color: transparent;
            text-decoration: none;
            font-size: 1.2rem;
            background: linear-gradient(to right, #ff8c00, #ff4d4d);
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: color 0.3s ease, background-position 0.3s ease;
        
            /* Make the text visible through the gradient */
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        
            /* Adjust background position to control the gradient effect */
            background-size: 200% 100%;
            background-position: 100% 0;
        
            /* Hover effect: Slide in the underline from left to right */
            &:hover {
              background-position: 0 0;
            }
        
            /* Underline effect */
            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px; /* Adjust the height of the underline */
              background-color: orange; /* Change the color of the underline */
              transform: scaleX(0); /* Initial state: invisible */
              transform-origin: bottom right;
              transition: transform 0.3s ease;
            }
        
            &:hover::before {
              transform: scaleX(1); /* Hover state: visible */
              transform-origin: bottom left;
            }
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    nav {
      padding: 0 2rem;
      .left {
        .brand {
          img {
            height: 3rem;
          }
        }
        .links {
          li {
            a {
              font-size: 1rem;
              padding: 0.3rem 0.6rem;
            }
          }
        }
      }
      .right {
        button {
          svg {
            font-size: 1rem;
          }
        }
        .search {
          padding: 0.1rem;
          padding-left: 0.3rem;
          button {
            svg {
              font-size: 1rem;
            }
          }
          input {
            padding: 0.2rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    nav {
      padding: 0 1rem;
      .left {
        .brand {
          img {
            height: 2.5rem;
          }
        }
        .links {
          li {
            a {
              font-size: 0.8rem;
              padding: 0.2rem 0.4rem;
            }
          }
        }
      }
      .right {
        button {
          svg {
            font-size: 0.8rem;
          }
        }
        .search {
          padding: 0.1rem;
          padding-left: 0.2rem;
          button {
            svg {
              font-size: 0.8rem;
            }
          }
          input {
            padding: 0.1rem;
          }
        }
      }
    }
  }
`;
