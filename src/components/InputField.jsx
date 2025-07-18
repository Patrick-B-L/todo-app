import React, { useState } from 'react';

function InputField({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [deadline, setDeadline] = useState('');
  const [noDeadline, setNoDeadline] = useState(false);


  const handleAdd = () => {
    // kontrollera om input text är tom
    if (inputValue.trim() === '') {
      alert('Vänligen ange en uppgift innan du lägger till.');
      return; // Stoppar funktionen om input är tom
    }
    if (!noDeadline && !deadline) {
      alert('Vänligen ange en deadline eller välj "Ingen deadline" innan du lägger till en uppgift.');
      return; // Stoppar funktionen om deadline saknas
    }
    onAddTodo(inputValue, deadline, noDeadline);
    setInputValue(''); 
    setDeadline('');
    setNoDeadline(false);
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
      Ange ett datum för när uppgiften ska vara klar eller välj "Ingen deadline".
      </p>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        disabled={noDeadline}
        required={!noDeadline}
      />
      <label className="no-deadline-label">
        <input
          type="checkbox"
          checked={noDeadline}
          onChange={() => setNoDeadline(!noDeadline)}
        />
        Ingen deadline
      </label>
      <div>
        <button onClick={handleAdd}>Lägg till</button>
      </div>
    </div>
    
  );
}

export default InputField;
