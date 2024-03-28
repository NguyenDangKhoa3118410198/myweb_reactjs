import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100vh;
   background-color: #fff;
   font-size: 24px;
   font-weight: bold;
`;

const LoadingCircle = styled.div`
   border: 8px solid #f3f3f3;
   border-top: 8px solid #3498db;
   border-radius: 50%;
   width: 50px;
   height: 50px;
   animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
   margin-top: 10px;
`;

const Loading = () => {
   return (
      <LoadingContainer>
         <LoadingCircle />
         <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
   );
};

export default Loading;
