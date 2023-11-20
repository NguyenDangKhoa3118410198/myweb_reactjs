import Modal from 'react-bootstrap/Modal';
import './review.css';

function ModalReviews(props) {
   const dataReview = props.data;

   const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
   };

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
         <Modal.Body>
            {dataReview && dataReview.length > 0 ? (
               dataReview.map((review, index) => (
                  <div className='reviews-container' key={index}>
                     {Object.entries(review).map(([key, value]) =>
                        key !== 'id' && key !== 'customerId' ? (
                           <p key={key}>
                              <strong>{`${capitalizeFirstLetter(
                                 key
                              )}:`}</strong>{' '}
                              {value}
                           </p>
                        ) : null
                     )}
                  </div>
               ))
            ) : (
               <p>No reviews found.</p>
            )}
         </Modal.Body>
      </Modal>
   );
}

export default ModalReviews;
