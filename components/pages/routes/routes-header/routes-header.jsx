
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useState, useRef } from "react";

function useDebouncedFunction(func, delay) {
  const ref = useRef(null);

  return (...args) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => func(...args), delay);
  };
}

export const RoutesHeader = ({ areas, area, filter }) => {
  const { areaId, setAreaId } = area;
  const { onChange } = filter

  const [search, setSearch] = useState('')

  const debounced = useDebouncedFunction(value => onChange(value), 800)

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
    debounced(value)
  }

  const searchPannel =
    <InputGroup >
      <FormControl
        type="text"
        placeholder="Поиск маршрутов по названию"
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchChange}
      />
    </InputGroup>
  return (
    <>
      <Form.Select
        className="mb-3"
        value={areaId}
        aria-label="Area-select"
        onChange={e => setAreaId(e.target.value)}
      >
        <option name={''} key={-1} value={''} >
          Все районы
        </option>
        {areas.map((val, key) => {
          return (
            <option name={val.title} key={key} value={val.id} >
              {val.title}
            </option>
          );
        })}
      </Form.Select>

      {searchPannel}

      <div style={{margin: "10px 0"}}>

        <h3>Маршруты</h3>

        
      </div>
    </>
  );
};
