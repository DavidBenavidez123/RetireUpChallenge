import React from 'react';

function App(props) {
  return (
      <tr>
      <td>{props.SP.year}</td>
        <td>{props.SP.totalReturn}</td>
      </tr>
  );
}

export default App;
