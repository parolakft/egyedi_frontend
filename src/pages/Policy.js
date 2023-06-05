// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '../components/Box';
import PropTypes from 'prop-types';
import settingsServices from '../services/settingsServices';
import RichEditor from '../components/Editor';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { ReFreshBtn } from '../components/Button';

const PolicyPage = ({ showError }) => {
  const [about, setAbout] = useState({});
  const [es, setEs] = useState(EditorState.createEmpty());

  const getAbout = async () => {
    try {
      const response = await settingsServices.get('adatvedelem');
      console.log(response);

      if (response?.data?.status !== 'OK') {
        showError('error', 'Hiba!', response?.data?.messages[0] ?? 'Technikai hiba!');
        return;
      }
      setAbout(response.data.data);
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  useEffect(() => {
    getAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEs = async () => {
    try {
      if (!about?.value) {
        setEs(EditorState.createEmpty());
        return;
      }
      const blocksFromHtml = htmlToDraft(about.value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

      setEs(EditorState.createWithContent(contentState));
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  useEffect(() => {
    getEs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [about]);


  const handleEditorChange = (editorState) => {
    setEs(editorState);
  };

  const handleSubmit = () => {
    try {
      const rawContentState = convertToRaw(es.getCurrentContent());
      const markup = draftToHtml(rawContentState);
      console.log('markup', markup);
      settingsServices.save({ ...about, value: markup });
      showError('success', 'Siker', 'Az adatvédelmi irányelvek sikeresen elmentve.');
    } catch (error) {
      showError('error', 'Rendszerhiba!', 'Kérjük próbálja meg újra pár perc múlva.');
      console.error(error);
    }
  };

  return (
    <Root max="100%" title="Adatvédelmi irányelvek" onSubmit={handleSubmit} controls={<ReFreshBtn callback={getAbout} />}>
      <Editor
        editorStyle={{
          width: 'calc(100vw - 320px)',
          height: '600px',
          border: '1px solid silver',
          padding: '0 8px',
          borderRadius: '4px',
        }}
        toolbarConfig={toolbarConfig}
        content={es}
        onEditorChange={handleEditorChange}
      />
    </Root>
  );
};

export default PolicyPage;

PolicyPage.propTypes = {
  showError: PropTypes.func.isRequired,
};

const Root = styled(Box)`
  margin: auto;
`;

const Editor = styled(RichEditor)`
  margin: auto;
`;

const toolbarConfig = {
  options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough'],
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered'],
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
  },
  colorPicker: {
    colors: [
      'rgb(97,189,109)',
      'rgb(26,188,156)',
      'rgb(84,172,210)',
      'rgb(44,130,201)',
      'rgb(147,101,184)',
      'rgb(71,85,119)',
      'rgb(204,204,204)',
      'rgb(65,168,95)',
      'rgb(0,168,133)',
      'rgb(61,142,185)',
      'rgb(41,105,176)',
      'rgb(85,57,130)',
      'rgb(40,50,78)',
      'rgb(0,0,0)',
      'rgb(247,218,100)',
      'rgb(251,160,38)',
      'rgb(235,107,86)',
      'rgb(226,80,65)',
      'rgb(163,143,132)',
      'rgb(239,239,239)',
      'rgb(255,255,255)',
      'rgb(250,197,28)',
      'rgb(243,121,52)',
      'rgb(209,72,65)',
      'rgb(184,49,47)',
      'rgb(124,112,107)',
      'rgb(209,213,216)',
    ],
  },
  remove: { className: undefined, component: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
  },
};
