import React from 'react';
import Form from 'react-bootstrap/Form';

function Switch({ handleFunction, isChecked }) {
   return (
      <Form.Check
         type='switch'
         id='custom-switch'
         label='Calendar'
         onChange={handleFunction}
         checked={isChecked}
      />
   );
}

export default Switch;
