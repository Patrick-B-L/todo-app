import React, { useState } from 'react';

function InputField({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [deadline, setDeadline] = useState('');
  const [noDeadline, setNoDeadline] = useState(false);
  const [description, setDescription] = useState('');

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
    onAddTodo(inputValue, deadline, noDeadline, description);
    setInputValue(''); 
    setDeadline('');
    setNoDeadline(false);
    setDescription('');
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
      <p className="date-input-description">
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
      <textarea
        className='description-input'
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Beskrivning (valfritt)"
        maxLength={300}
        rows={3}
        // style={{ width: '65%', marginTop: '10px', resize: 'vertical' }}
      />
      <div className="char-counter">
        {300 - description.length} tecken kvar
      </div>
      <div>
        <button onClick={handleAdd}>Lägg till</button>
      </div>
    </div>
    
  );
}

export default InputField;
