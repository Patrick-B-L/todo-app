import React, { useState } from 'react';

function InputField({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [deadline, setDeadline] = useState('');


  const handleAdd = () => {
    onAddTodo(inputValue, deadline);
    setInputValue(''); setDeadline('')
  };

  return (
    <div className="input-field">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Lägg till en uppgift"
        maxLength={50}
      />
      <div className="char-counter">
        {50 - inputValue.length} tecken kvar
      </div>
      <p className="input-description">
      Ange ett datum för när uppgiften ska vara klar.
      </p>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <div>
        <button onClick={handleAdd}>Lägg till</button>
      </div>
    </div>
    
  );
}

export default InputField;
