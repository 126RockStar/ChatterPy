// @flow
import * as React from 'react';

import DropdownTrigger from '../ui/DropdownTrigger';
import ChatterPyContext from '../ChatterPyContext';
import ChatterPyDispatch from '../ChatterPyDispatch';
import TemplatesService from '../../../services/TemplatesService';
import VariablePopup from './VariablePopup';
import emojiIcon from '../../../assets/images/temp/smiley-face@2x.png';
import paperclipIcon from '../../../assets/images/temp/paperclip.png';
import type { Datasource, Template } from '../types';

export default function TemplateApp(): React.Element<'div'> {
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const {
    selectedPhoneNumber,
    allTemplates,
    allDatasources,
  } = React.useContext(ChatterPyContext);
  const [name, setName] = React.useState('');
  const [content, setContent] = React.useState('');
  const [, setSelectedTemplate] = React.useState<void | Template>();
  const [
    selectedDatasource,
    setSelectedDatasource,
  ] = React.useState<void | Datasource>();

  const onSelectDatasource = (e: SyntheticMouseEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.currentTarget.value);
    setSelectedDatasource(allDatasources.find(d => d.id === selectedId));
  };

  const onSelectTemplate = template => {
    setSelectedTemplate(template);
    setName(template.name);
    setContent(template.contents);
  };

  const onResetClick = e => {
    e.preventDefault();
    setName('');
    setContent('');
  };

  const onSaveClick = e => {
    e.preventDefault();
    if (selectedPhoneNumber) {
      TemplatesService.addTemplate(name, content, selectedPhoneNumber.id).then(
        template => {
          globalDispatch({
            template,
            type: 'TEMPLATE_ADD',
          });
        },
      );
    }
  };

  return (
    <div className="section__content section__content--template">
      <div className="section__bar">
        <div className="section__bar-title">
          <DropdownTrigger
            options={allTemplates}
            trigger="All Templates"
            onSelect={onSelectTemplate}
            renderOptionContents={template => template.name}
          />
        </div>

        <div className="section__bar-actions">
          <a href="/#" className="btn btn--small">
            <span>Create Template</span>
          </a>
        </div>
      </div>

      <div className="section__content-inner">
        <div className="form form--template">
          <form action="?" method="post">
            <div className="form__head">
              <h4>Create Template</h4>
            </div>

            <div className="form__body">
              <div className="form__row">
                <label
                  htmlFor="field-template-name"
                  className="form__label hidden"
                >
                  Enter a name for the template
                </label>

                <div className="form__controls">
                  <input
                    type="text"
                    className="field--template"
                    name="field-template-name"
                    id="field-template-name"
                    placeholder="Enter a name for the template"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="form__row form__row--flex">
                <label
                  htmlFor="field-template-select"
                  className="form__label form__label--alt"
                >
                  Data Source:
                </label>
                <div className="form__controls">
                  <div className="select select--alt">
                    <select
                      name="field-template-select"
                      id="field-template-select"
                      onChange={onSelectDatasource}
                    >
                      <option value="" label=" " disabled selected></option>
                      {allDatasources.map(datasource => (
                        <option key={datasource.id} value={datasource.id}>
                          {datasource.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form__row">
                <label htmlFor="template-text" className="form__label hidden">
                  Enter content for the template
                </label>

                <div className="form__controls">
                  <textarea
                    className="field field--textarea"
                    name="template-text"
                    id="template-text"
                    placeholder="Enter content for the template"
                    value={content}
                    onChange={e => setContent(e.currentTarget.value)}
                  />
                </div>
              </div>
            </div>

            <footer className="form__footer">
              <div className="form__utilities">
                <ul>
                  <li>
                    <a href="/#">
                      <img src={paperclipIcon} alt="" width="26" height="26" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <img src={emojiIcon} alt="" width="24" height="24" />
                    </a>
                  </li>
                  <li>
                    <VariablePopup datasource={selectedDatasource} />
                  </li>
                </ul>
              </div>

              <div className="form__actions">
                <input
                  type="reset"
                  value="Cancel"
                  className="form__btn btn-plain btn-plain--small"
                  style={{ marginRight: 5 }}
                  onClick={onResetClick}
                />

                <input
                  type="submit"
                  value="Save"
                  className="form__btn btn-plain btn-plain--small btn-plain--blue"
                  onClick={onSaveClick}
                />
              </div>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}
