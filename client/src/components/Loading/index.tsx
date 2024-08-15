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
   font-weight: 700;
`;

const LoadingCircle = styled.div`
   border: 6px solid #f3f3f3;
   border-top: 8px solid var(--color-black);
   border-radius: 50%;
   width: 50px;
   height: 50px;
   animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
   margin-top: 10px;
   font-weight: 600;
   font-size: 18px;
`;

const LoadingWrapper = styled.div`
   position: relative;
`;

const LoadingDataContainer = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   background-color: rgba(255, 255, 255, 0.7);
   z-index: 1000;
`;

const Loading = () => {
   return (
      <LoadingContainer>
         <LoadingCircle />
         <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
   );
};

export const LoadingData = ({
   children,
   loading,
}: {
   children: any;
   loading: any;
}) => {
   return (
      <LoadingWrapper>
         {loading && (
            <LoadingDataContainer>
               <LoadingCircle />
               <LoadingText>Loading...</LoadingText>
            </LoadingDataContainer>
         )}
         {children}
      </LoadingWrapper>
   );
};

export default Loading;
