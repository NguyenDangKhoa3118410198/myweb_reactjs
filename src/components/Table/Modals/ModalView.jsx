import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const ImageUser = styled.img`
   width: 180px;
   height: 200px;
   padding: 10px;
`;

const ContainerModalView = styled.div`
   display: flex;
   flex-direction: row;
   gap: 10px;

   @media (max-width: 300px) {
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }
`;

const ContainerListItems = styled.ul`
   list-style-type: none;
   padding: 4px;
`;

const ItemInfo = styled.li`
   margin-bottom: 8px;
`;

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
            <ContainerModalView>
               {props.viewcurrent.avatar || props.viewcurrent.thumbnailUrl ? (
                  <ImageUser
                     src={
                        props.viewcurrent.avatar ||
                        props.viewcurrent.thumbnailUrl
                     }
                     alt='Image error'
                  />
               ) : null}
               <ContainerListItems>
                  {Object.entries(props.viewcurrent).map(
                     ([key, value]) =>
                        key !== 'id' &&
                        key !== 'avatar' &&
                        key !== 'thumbnailUrl' && (
                           <ItemInfo key={key}>
                              <strong>{capitalizeFirstLetter(key)}:</strong>{' '}
                              {value}
                           </ItemInfo>
                        )
                  )}
               </ContainerListItems>
            </ContainerModalView>
         </Modal.Body>
      </Modal>
   );
}

export default ModalView;
