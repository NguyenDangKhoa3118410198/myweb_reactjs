import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { formatAndCapitalize, formattedBirthDay } from '../../../ulti';

interface ViewCurrent {
   id?: string;
   avatar?: string;
   thumbnailUrl?: string;
   [key: string]: any;
}

interface ModalViewProps {
   viewcurrent: ViewCurrent;
   onHide: () => void;
   show: boolean;
}

const ModalView: React.FC<ModalViewProps> = (props) => {
   return (
      <Modal
         {...props}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
      >
         <Modal.Header closeButton>
            <StyledTitle id='contained-modal-title-vcenter'>
               Details Information
            </StyledTitle>
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
                        key !== 'thumbnailUrl' &&
                        key !== 'sku' &&
                        key !== 'urlPath' &&
                        key !== 'urlKey' && (
                           <ItemInfo key={key}>
                              <ItemLabel>{formatAndCapitalize(key)}:</ItemLabel>{' '}
                              <ItemContent>
                                 {key === 'dateOfBirth'
                                    ? formattedBirthDay(value)
                                    : String(value)}{' '}
                              </ItemContent>
                           </ItemInfo>
                        )
                  )}
               </ContainerListItems>
            </ContainerModalView>
         </Modal.Body>
      </Modal>
   );
};

export default ModalView;

const StyledTitle = styled(Modal.Title)`
   font-size: 24px;
   font-weight: 700;
   color: var(--color-black);
`;

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
