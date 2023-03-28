import styled from "styled-components";
import { UilMultiply } from "@iconscout/react-unicons";

const Background = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   transform: translate(-10%, -18%);
   z-index: 9999;
`;

const ModalWrapper = styled.div`
   width: 400px;
   height: 500px;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
   text-align: center;
   color: #000;
   background: #fff;
   border-radius: 10px;
   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
   z-index: 10;
`;

const ModalContent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   line-height: 1.8;
   color: #141414;
   p {
      margin-bottom: 1rem;
   }
   button {
      padding: 10px 40px;
      background: #141414;
      color: #fff;
      border: none;
      margin-top: 30px;
   }
`;

const CloseModalButton = styled(UilMultiply)`
   cursor: pointer;
   position: absolute;
   top: 20px;
   right: 20px;
   width: 32px;
   height: 32px;
   padding: 0;
   z-index: 10;
`;

const Modal = ({ showModal, setShowModal, selectedData }) => {
   return showModal ? (
      <Background>
         <div>
            <ModalWrapper showModal={showModal}>
               <ModalContent>
                  <div>
                     <h1> Staff Info </h1>
                     {/* {message} */}
                     <form>
                        <div className="row px-3">
                           <div className="col-md-6">
                              <div className="form-group">
                                 <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    // value={staffData.firstName}
                                    placeholder="First Name"
                                    required
                                    title="Special characters and numbers are not allowed"
                                    // onChange={(e) =>
                                    //   setStaffData({
                                    //     ...staffData,
                                    //     firstName: e.target.value,
                                    //   })
                                    // }
                                 />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    // value={staffData.lastName}
                                    placeholder="Last Name"
                                    required
                                    title="Special characters and numbers are not allowed"
                                    //onChange={e => setLastName(e.target.value)}
                                    // onChange={(e) =>
                                    //   setStaffData({
                                    //     ...staffData,
                                    //     lastName: e.target.value,
                                    //   })
                                    // }
                                 />
                              </div>
                           </div>
                        </div>

                        <input
                           type="email"
                           id="login"
                           name="login"
                           //   value={staffData.email}
                           placeholder="Email"
                           required
                           //onChange={e => setEmail(e.target.value)}
                           //   onChange={(e) =>
                           //     setStaffData({
                           //       ...staffData,
                           //       email: e.target.value,
                           //     })
                           //   }
                        />

                        <input
                           type="password"
                           id="password"
                           name="password"
                           placeholder="Password"
                           required
                           //onChange={e => setPassword(e.target.value)}
                           //   onChange={(e) =>
                           //     setStaffData({
                           //       ...staffData,
                           //       password: e.target.value,
                           //     })
                           //   }
                        />

                        <button type="submit">button</button>
                     </form>
                  </div>
               </ModalContent>
               <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => setShowModal(!showModal)}
               />
            </ModalWrapper>
         </div>
      </Background>
   ) : null;
};

export default Modal;
