// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import ChatterPyImages from '../../../helpers/ChatterPyImages';
import searchStrings from '../../../utils/searchStrings';
import variableIcon from '../../../assets/images/temp/corss.png';
import type { Datasource } from '../types';

type Props = {
  datasource: Datasource | void,
};

export default function VariablePopup({ datasource }: Props): React.Node {
  const [showPopup, setShowPopup] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const onVariableIconClick = e => {
    e.preventDefault();
    setShowPopup(prev => !prev);
  };

  const onClosePopup = e => {
    e.preventDefault();
    setShowPopup(false);
    setSearchText('');
  };

  const onSearchChange = e => {
    const txt = e.currentTarget.value;
    setSearchText(txt);
  };

  const variables = searchStrings(
    searchText,
    datasource ? datasource.fields : [],
  );
  const variableListItems = variables.map(varName => (
    <li key={varName}>
      <a href="/#" onClick={e => e.preventDefault()}>
        {varName}
      </a>
    </li>
  ));

  const isActiveClass = showPopup ? 'is-active' : '';
  return (
    <div className={`popup popup--template js-popup ${isActiveClass}`}>
      <a
        className="js-popup-trigger popup__trigger"
        href="/#"
        onClick={onVariableIconClick}
      >
        <img src={variableIcon} alt="" width="37" height="25" />
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
          <label for="template-search" className="popup__label hidden">
            Search Variables
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
              placeholder="Search Variables"
              onChange={onSearchChange}
            />
          </div>
        </div>
        <div className="popup__menu-body">
          <div className="popup__content">
            <ul className="list-templates" style={{ display: 'block' }}>
              {variableListItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
