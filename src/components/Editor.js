import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';

const RichEditor = ({ content, onChange, onEditorChange, toolbarConfig, ...props }) => {
  // Szövegdobozok ne nyúljanak túl az ablakon: max-width: 100%, talán...
  return (
    <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
      <Editor
        {...props}
        editorState={content}
        onEditorStateChange={onEditorChange}
        onContentStateChange={onChange}
        toolbar={toolbarConfig}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default RichEditor;

RichEditor.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  toolbarConfig: PropTypes.shape({}).isRequired
};

RichEditor.defaultProps = {
  content: null
};
