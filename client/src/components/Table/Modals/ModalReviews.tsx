import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { formatAndCapitalize } from 'ulti';

interface Review {
   id?: string;
   customerId?: string;
   image?: string;
   thumbnail?: string;
   rating?: number;
   [key: string]: any;
}

interface ModalReviewsProps {
   data: Review[];
   show: boolean;
   onHide: () => void;
}

const starRating = (rating: number) => {
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

const ModalReviews: React.FC<ModalReviewsProps> = React.memo((props) => {
   const { data: dataReview, show, onHide } = props;
   const { status: statusReviews } = useSelector(
      (state: any) => state.root.review
   );

   const renderReview = useCallback((review: Review) => {
      return Object.entries(review).map(
         ([key, value]) =>
            key !== 'id' &&
            key !== 'customerId' &&
            key !== 'image' &&
            key !== 'thumbnail' && (
               <ItemInfo key={key}>
                  <ItemLabel>{`${formatAndCapitalize(key)}: `}</ItemLabel>
                  {key === 'rating' ? (
                     starRating(value)
                  ) : (
                     <ItemContent>{value}</ItemContent>
                  )}
               </ItemInfo>
            )
      );
   }, []);

   return (
      <Modal
         show={show}
         onHide={onHide}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
      >
         <Modal.Header closeButton>
            <StyledTitle id='contained-modal-title-vcenter'>
               List Reviews
            </StyledTitle>
         </Modal.Header>
         <CustomModalBody>
            <Spin spinning={statusReviews === 'loading'}>
               {dataReview && dataReview.length > 0 ? (
                  dataReview.map((review, index) => (
                     <Container className='reviews-container' key={index}>
                        {review.image || review.thumbnail ? (
                           <ImageReview
                              src={review.image || review.thumbnail}
                              alt='Review Image'
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

const StyledTitle = styled(Modal.Title)`
   font-size: 24px;
   font-weight: 700;
   color: var(--color-black);
`;

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

const ItemLabel = styled.span`
   font-size: 16px;
   font-weight: 700;
   color: var(--color-black);
   line-height: 26px;
`;

const ItemContent = styled.span`
   font-size: 15px;
   font-weight: 500;
   color: var(--color-black);
   line-height: 24px;
`;
