import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      if (!email || !password) {
        setError("Please enter a valid email and password."); // Set error message
        return;
      }
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setError("An error occurred. Please try again."); // Set error message
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlock a world of endless entertainment! Explore a vast library of movies, TV shows, and more. </h1>
            {/* <h4>Enjoy the freedom to watch whenever, wherever. No commitments – cancel anytime. Ready to dive in?</h4> */}
            <h6>
              Enter your email to start your subscription adventure.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Log In</button>}
          {error && <p>{error}</p>}
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      
      .text.flex.column {
        background: linear-gradient(90deg, rgba(131,58,180,1) 11%, rgba(252,176,69,1) 47%, rgba(145,29,253,0.835171568627451) 76%);
        -webkit-background-clip: text; /* WebKit/Blink browsers */
        color: transparent;
      }
      @media (max-width: 768px) {
        .text.flex.column {
          background: linear-gradient(90deg, rgba(131,58,180,1) 11%, rgba(252,176,69,1) 47%, rgba(145,29,253,0.835171568627451) 76%);
          -webkit-background-clip: text; /* WebKit/Blink browsers */
          color: transparent;
        }
      }
      
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }

  @media (max-width: 768px) {
    .content {
      .body {
        .text {
          h1 {
            padding: 0 2rem;
          }
        }
        .form {
          grid-template-columns: 1fr;
          width: 80%;
        }
      }
    }
  }
`;

export default Signup;
