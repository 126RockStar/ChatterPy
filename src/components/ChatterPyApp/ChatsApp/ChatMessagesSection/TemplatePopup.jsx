// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Link } from 'react-router-dom';

import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import ChatterPyContext from '../../ChatterPyContext';
import searchObjects from '../../../../utils/searchObjects';
import type { Template, TemplateId } from '../../types';

export default function TemplatePopup(): React.Node {
  const { allTemplates } = React.useContext(ChatterPyContext);
  const [showTemplatePopup, setShowTemplatePopup] = React.useState(false);
  const [templateText, setTemplateText] = React.useState('');
  const [
    selectedTemplateId,
    setSelectedTemplate,
  ] = React.useState<TemplateId | void>();

  const selectedTemplate = React.useMemo<Template | void>(() => {
    if (selectedTemplateId === undefined) {
      return undefined;
    }
    return allTemplates.find(t => t.id === selectedTemplateId);
  }, [allTemplates, selectedTemplateId]);

  const onTemplateSelect = (
    e: SyntheticMouseEvent<HTMLAnchorElement>,
    id: TemplateId,
  ) => {
    e.preventDefault();
    setSelectedTemplate(id);
  };

  const handleTemplateTextChange = (e) => {
    e.preventDefault();
    setTemplateText(e.target.value);
  }

  const onTemplateIconClick = e => {
    e.preventDefault();
    setShowTemplatePopup(prev => !prev);
  };

  const onClosePopup = e => {
    e.preventDefault();
    setShowTemplatePopup(false);
    setSelectedTemplate(undefined);
    setTemplateText('');
  };


  const isActiveClass = showTemplatePopup ? 'is-active' : '';
  return (
    <div className={`popup popup--template js-popup ${isActiveClass}`}>
      <a
        className="js-popup-trigger popup__trigger"
        href="/#"
        onClick={onTemplateIconClick}
      >
        <img
          src={ChatterPyImages.Icons.templateLetter}
          alt=""
          width="15"
          height="18"
        />
      </a>
      <div className="popup__menu js-popup-menu">
        <div className="popup__menu-head">
          <a
            href="#"
            className="popup__close js-popup-close"
            onClick={onClosePopup}
          >
            X
          </a>
          <div className="popup__controls">
            <div 
              style={{
                display:'flex', 
                width:'100%', 
                justifyContent:'center', 
                marginBottom:'20px', 
                color:'white', 
                fontSize:'15px'
              }}
            >
              <img
                src={ChatterPyImages.Icons.arrow}
                alt=""
                width="15"
                height="18"
                style={{position:'absolute', top:'25px', left:'16px'}}
              />
              <span>Template's Name</span>
            </div>            
            
          </div>          
        </div>
        <div style={{padding:'5px'}}>
          <textarea
            type="text"
            style={{width:'100%', padding:'5px', borderRadius:'5px'}}
            rows={10}
            name="template-text"
            id="template-text"
            value={templateText}
            placeholder="Hello there my friend"
            onChange={handleTemplateTextChange}
          />
        </div>
        <div style={{marginLeft:'10px', marginBottom:'10px'}}>
          <span style={{fontSize:'17px', color:'#595BA8', fontFamily:'bold'}}>Use Template</span>
        </div>      
        <div 
          style={{
            width:'0px', 
            height:'0px', 
            position:'absolute',
            right:'53px',
            borderLeft:'25px solid transparent', 
            borderRight:'21px solid transparent', 
            borderTop:'23px solid #2E3192'
          }}
        />  
        <div 
          style={{
            width:'0px', 
            height:'0px', 
            position:'absolute',
            right:'55px',
            borderLeft:'20px solid transparent', 
            borderRight:'20px solid transparent', 
            borderTop:'20px solid #FFFFFF'
          }}
        />  
      </div>
    </div>
  );
}
