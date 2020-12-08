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
  const [searchText, setSearchText] = React.useState('');
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

  const onTemplateIconClick = e => {
    e.preventDefault();
    setShowTemplatePopup(prev => !prev);
  };

  const onClosePopup = e => {
    e.preventDefault();
    setShowTemplatePopup(false);
    setSelectedTemplate(undefined);
    setSearchText('');
  };

  const onSearchChange = e => {
    const txt = e.currentTarget.value;
    setSearchText(txt);
    setSelectedTemplate(undefined);
  };

  const renderTemplateList = () => {
    const templates = searchObjects(searchText, allTemplates, ['name']);
    const templateListItems = templates.map(template => (
      <li key={template.id}>
        <a href="/#" onClick={e => onTemplateSelect(e, template.id)}>
          {template.name}
        </a>
      </li>
    ));
    return <ul className="list-templates">{templateListItems}</ul>;
  };

  const renderTemplateEditor = () => (
    <>
      <label htmlFor="text-template" className="popup__label hidden">
        #1
      </label>
      <div className="popup__controls">
        <textarea
          className="field field--textarea field--textarea-alt"
          name="text-template"
          id="text-template"
          value={selectedTemplate ? selectedTemplate.contents : ''}
        />
      </div>
    </>
  );

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
          <label htmlFor="template-search" className="popup__label hidden">
            Search Templates
          </label>
          <img
            src={ChatterPyImages.Icons.search}
            alt=""
            width="18"
            height="17"
          />
          <div className="popup__controls">
            <input
              type="text"
              className="field field--smaller"
              name="template-search"
              id="template-search"
              value={searchText}
              placeholder="Search Templates"
              onChange={onSearchChange}
            />
          </div>
        </div>
        <div className="popup__menu-body">
          <div className="popup__content">
            {selectedTemplate === undefined
              ? renderTemplateList()
              : renderTemplateEditor()}
          </div>
          <p>
            <Link to="/app/template">Create a New Template.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
