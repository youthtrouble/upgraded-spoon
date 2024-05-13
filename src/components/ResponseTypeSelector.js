

const ResponseTypeSelector = ({ onChange }) => {
  return (
    <select onChange={onChange} defaultValue="application/json">
      <option value="application/json">JSON</option>
      <option value="application/xml">XML</option>
      <option value="text/plain">Plain Text</option>
    </select>
  );
};


export default ResponseTypeSelector;
  