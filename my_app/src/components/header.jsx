import React from 'react'
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
export default function header() {
  return (
    <Container>
        <div className="logo">
            <img src="{logo}" alt="logo" />
        </div>
        <button onClick={() => }>{props.login ? 'Log In' : 'Sign In'}</button>
    </Container>
  );
}

const Container = styled.div `

`;
