import React from 'react';
import background from "../assets/background.jpeg";
import styled from "styled-components";

export default function backgroundImg() {
  return (
    <Container>
        <img src="{background}" alt="background" />
    </Container>
    
  )
}

const Container = styled.div `
height: 100vh;
width: 100vw;
img {
    height: 100vh;
    width: 100vw;
}`
