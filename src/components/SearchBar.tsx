import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Коллбек для передачи поискового запроса в родительский компонент
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // Локальное состояние для поискового запроса

  // Обработчик изменения поля ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Обработчик нажатия на клавишу Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query); // Вызов функции onSearch при нажатии Enter
    }
  };

  // Обработчик кнопки поиска
  const handleSearchClick = () => {
    onSearch(query); // Вызов функции onSearch при нажатии на кнопку
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Поиск по книгам"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress} // Добавляем обработчик нажатия клавиши
        className="p-2 border rounded w-full max-w-sm"
      />
      <button
        onClick={handleSearchClick}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Поиск
      </button>
    </div>
  );
};

export default SearchBar;
