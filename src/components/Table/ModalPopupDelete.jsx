import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalPopupDelete(props) {
   const { onHide, handleDeleteConfirmed } = props;

   return (
      <div
         className='modal show'
         style={{ display: 'block', position: 'initial' }}
      >
         <Modal.Dialog>
            <Modal.Header closeButton onClick={onHide}>
               <Modal.Title>Confirm Delete?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <p>Are you sure to delete this record.</p>
            </Modal.Body>

            <Modal.Footer>
               <Button variant='primary' onClick={handleDeleteConfirmed}>
                  Yes
               </Button>
               <Button variant='secondary' onClick={onHide}>
                  No
               </Button>
            </Modal.Footer>
         </Modal.Dialog>
      </div>
   );
}

export default ModalPopupDelete;
