import React, { useState, useMemo, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
// import ImageUploader from "react-quill-image-upload";
import "react-quill/dist/quill.snow.css"; // Import styles

const MyRichTextEditor = ({ data, setdata }) => {
  const [text, settext] = useState("hellllo");

  const sendImageToBackend = (img) => {};

  const quillRef = useRef(); //

  const handleProcedureContentChange = (content, delta, source, editor, e) => {
    settext(editor.getText());
    setdata(editor.getText());

    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
  };

  useEffect(() => {}, [text]);

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [{ size: [] }],
  //     [{ font: [] }],
  //     [{ align: ["right", "center", "justify"] }],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link", "image"],
  //     [{ color: ["red", "#785412"] }],
  //     [{ background: ["red", "#785412"] }],
  //   ],
  // };

  const selectLocalImage = (vale) => {
    console.log(vale);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: [] }],
          [{ font: [] }],
          [{ align: ["right", "center", "justify"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          [{ color: ["red", "#785412"] }],
          [{ background: ["red", "#785412"] }],
        ],
        // handlers: {
        //   image: selectLocalImage,
        // },
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const ediittexbox = {
    height: "30vh",
  };

  return (
    <div>
      <ReactQuill
        onChange={handleProcedureContentChange}
        modules={modules}
        formats={formats}
        style={ediittexbox}
        placeholder="Enter The query"
        ref={quillRef}
      />
    </div>
  );
};

export default MyRichTextEditor;
