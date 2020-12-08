// @flow
import * as React from 'react';
import {NavLink} from "react-router-dom";
import ChatterPyContext from '../ChatterPyContext';
import ChatterPyDispatch from '../ChatterPyDispatch';
import TemplateRow from './TemplateRow'

const EMPTY_ROW = (
  <div className="section__grid grid">
    <div className="section__grid-item grid__col grid__col--size1" />
    <div className="section__grid-item grid__col grid__col--size2" />
    <div className="section__grid-item grid__col grid__col--size3" />
    <div className="section__grid-item grid__col grid__col--size4" />
    <div className="section__grid-item grid__col grid__col" />
  </div>
);
export default function TemplateList(): React.Element<'div'> {
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const {
    selectedPhoneNumber,
    allTemplates,
    allDatasources,
  } = React.useContext(ChatterPyContext);
    console.log("allTemplates", allTemplates, "selectedPhoneNumber", selectedPhoneNumber, "allDatasources", allDatasources)
  const emptyRows = React.useMemo(
    () =>
      new Array(Math.max(0, 6 - allTemplates.length))
        .fill()
        .map((_, i) => <React.Fragment key={i}>{EMPTY_ROW}</React.Fragment>),
    [allTemplates.length],
  );
    return (

           <div className="section__content section__content--home">
      <div className="section__bar">
        <h3>Templates</h3>

        <div className="section__bar-actions">
          <NavLink to="/app/create-template" className="btn">
            <span>Create Template</span>
          </NavLink>
        </div>
      </div>

        <div className="section__content-inner">
              <div className="section__grid section__grid--header grid">
                <div className="section__grid-item grid__col ">
                  <p>Name</p>
                </div>

                <div className="section__grid-item grid__col ">
                  <p>Inbox</p>
                </div>

                {/*<div className="section__grid-item grid__col grid__col--size3">
                  <p>Trigger</p>
                </div>*/}

              </div>
              {
                allTemplates.map(template=>(
                  <TemplateRow key={template.id} template={template} />
                  ))
              }
              {emptyRows}
              {/*<div className="section__grid grid">
                <div className="section__grid-item grid__col grid__col--size1">
                  <p className="visible-xs-block hidden">Name:</p>

                  <p>Joao</p>
                </div>

                <div className="section__grid-item grid__col grid__col--size2">
                  <p className="visible-xs-block hidden">Inbox:</p>

                  <p>Inbox 1</p>
                </div>

                <div className="section__grid-item grid__col grid__col--size3">
                  <p className="visible-xs-block hidden">Trigger:</p>

                  <p>Time of Incoming Message</p>
                </div>

                <div className="section__grid-item grid__col grid__col--size4">
                  <p className="visible-xs-block hidden">Status:</p>

                  <div className="toggle js-toggle-switch">
                    <input type="checkbox" name="toggle__switch-field" id="toggle__switch-field"/>

                    <label for="toggle__switch-field" className="toggle__label is-active">a</label>

                    <label for="toggle__switch-field" className="toggle__label">a</label>

                    <span className="toggle__switch">a</span>
                  </div>
                </div>

                <div className="section__grid-item section__grid-item--more grid__col grid__col">
                  <a href="#" className="link-more">
                    <span></span>

                    <span></span>

                    <span></span>
                  </a>
                </div>
              </div>

              <div className="section__grid grid">
                <div className="section__grid-item grid__col grid__col--size1">
                  <p className="visible-xs-block hidden">Name:</p>

                  <p>Save</p>
                </div>

                <div className="section__grid-item grid__col grid__col--size2">
                  <p className="visible-xs-block hidden">Inbox:</p>

                  <p>Inbox 1</p>
                </div>

                <div className="section__grid-item grid__col grid__col--size3">
                  <p className="visible-xs-block hidden">Trigger:</p>

                  <p>First Incoming Message</p>
                </div>

                <div className="section__grid-item grid__col grid__col--size4">
                  <p className="visible-xs-block hidden">Status:</p>

                  <div className="toggle js-toggle-switch">
                    <input type="checkbox" name="toggle__switch-field-2" id="toggle__switch-field-2"/>

                    <label for="toggle__switch-field-2" className="toggle__label is-active"></label>
                    <label for="toggle__switch-field-2" className="toggle__label"></label>

                    <span className="toggle__switch"></span>
                  </div>
                </div>
              </div>
*/}            </div>
           </div>

    );
}