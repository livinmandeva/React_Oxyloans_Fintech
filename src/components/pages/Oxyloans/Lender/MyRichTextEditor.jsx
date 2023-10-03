import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

export default function MyRichTextEditor() {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };    const ediittexbox={
    height:'22vh',
    width:'38vw'
  }

  return (
    <div>
      <ReactQuill value={text} onChange={handleChange} style={ediittexbox}/>
    </div>
  );
}
