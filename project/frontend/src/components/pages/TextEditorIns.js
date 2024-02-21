import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({ onAnnouncementSubmit}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSaveClick = () => {
    const content = 
      convertToRaw(editorState.getCurrentContent()
    );
    onAnnouncementSubmit(title, content);
    setTitle('');
    setEditorState(EditorState.createEmpty());
    // setShowEditor(!showEditor);
  };

  return (
    <div className="editor-container">
      <input
        type="text"
        placeholder="Enter announcement title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <button className="save-button" onClick={onSaveClick}>
        Post
      </button>
    </div>
  );
};

export default TextEditor;
