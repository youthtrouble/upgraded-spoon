const ResponseTypeSelector = ({ onChange }) => {
  return (
    <select onChange={onChange} defaultValue="application/json">
      {/* Option for JSON response type */}
      <option value="application/json">JSON</option>
      {/* Option for XML response type */}
      <option value="application/xml">XML</option>
      {/* Option for plain text response type */}
      <option value="text/plain">Plain Text</option>
    </select>
  );
};

export default ResponseTypeSelector;
