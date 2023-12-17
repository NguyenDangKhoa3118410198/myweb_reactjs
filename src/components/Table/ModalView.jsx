import Modal from 'react-bootstrap/Modal';

function ModalView(props) {
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
               Details Infomation
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <ul style={{ listStyleType: 'none', padding: '2px' }}>
               {Object.entries(props.viewcurrent).map(
                  ([key, value]) =>
                     key !== 'id' && (
                        <li key={key} style={{ marginBottom: '8px' }}>
                           <strong>{capitalizeFirstLetter(key)}:</strong>{' '}
                           {value}
                        </li>
                     )
               )}
            </ul>
         </Modal.Body>
      </Modal>
   );
}

export default ModalView;
