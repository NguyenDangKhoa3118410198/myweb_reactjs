import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

const capitalizeFirstLetter = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
};

const starRating = (rating) => {
   const stars = [];
   for (let i = 0; i < 5; i++) {
      if (i < rating) {
         stars.push(<FaStar key={i} color='yellow' />);
      } else {
         stars.push(<FaStar key={i} color='gray' />);
      }
   }
   return <StarRating>{stars}</StarRating>;
};

const ModalReviews = React.memo((props) => {
   const { data: dataReview } = props;
   const { status: statusReviews } = useSelector((state) => state.root.review);

   const renderReview = useCallback((review) => {
      return Object.entries(review).map(
         ([key, value]) =>
            key !== 'id' &&
            key !== 'customerId' &&
            key !== 'image' &&
            key !== 'thumbnail' && (
               <ItemInfo key={key}>
                  <strong>{`${capitalizeFirstLetter(key)}: `}</strong>
                  {key === 'rating' ? starRating(value) : value}
               </ItemInfo>
            )
      );
   }, []);

   return (
      <Modal
         {...props}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
               List Reviews
            </Modal.Title>
         </Modal.Header>
         <CustomModalBody>
            <Spin spinning={statusReviews === 'loading'}>
               {dataReview && dataReview.length > 0 ? (
                  dataReview.map((review, index) => (
                     <Container className='reviews-container' key={index}>
                        {review.image || review.thumbnail ? (
                           <ImageReview
                              src={review.image || review.thumbnail}
                              alt='error'
                           />
                        ) : null}
                        <ListItemInfo>{renderReview(review)}</ListItemInfo>
                     </Container>
                  ))
               ) : (
                  <NoFound>No reviews found.</NoFound>
               )}
            </Spin>
         </CustomModalBody>
      </Modal>
   );
});

export default ModalReviews;

const ItemInfo = styled.div`
   word-spacing: normal;
   letter-spacing: normal;
   text-align: justify;
   line-height: 1.5;
`;

const Container = styled.div`
   position: relative;
   border: 3px solid #e3e3e3;
   border-radius: 20px;
   padding: 15px;
   margin: 15px;
   display: flex;
   gap: 10px;
`;

const ImageReview = styled.img`
   width: 250px;
   height: 250px;
   object-fit: cover;
`;

const ListItemInfo = styled.div`
   display: flex;
   flex-direction: column;
`;

const CustomModalBody = styled(Modal.Body)`
   position: relative;
   min-width: fit-content;
   max-height: 80vh;
   padding: 5px;
   overflow-y: auto;
`;

const StarRating = styled.div`
   display: inline-block;
`;

const NoFound = styled.p`
   height: 150px;
`;
