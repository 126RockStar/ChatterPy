// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function InviteUserPage(): React.Node {
  return (
    <div className="section__content">
      <div className="section__content-head">
        <h3>Invite a user</h3>
      </div>

      <div className="section__content-body">
        <div className="form-invite">
          <form action="?" method="post">
            <div className="form__inner">
              <div className="form__row">
                <label htmlFor="field-1#" className="form__label">
                  First Name
                </label>

                <div className="form__controls">
                  <input
                    type="text"
                    className="field field--rounded"
                    name="field-1#"
                    id="field-1#"
                  />
                </div>
              </div>

              <div className="form__row">
                <label htmlFor="field-2#" className="form__label">
                  Last Name
                </label>

                <div className="form__controls">
                  <input
                    type="text"
                    className="field field--rounded"
                    name="field-2#"
                    id="field-2#"
                  />
                </div>
              </div>

              <div className="form__row">
                <label htmlFor="field-3#" className="form__label">
                  Mobile #
                </label>

                <div className="form__controls">
                  <input
                    type="number"
                    className="field field--rounded"
                    name="field-3#"
                    id="field-3#"
                  />
                </div>
              </div>

              <div className="form__row">
                <label htmlFor="field-4#" className="form__label">
                  Role
                </label>

                <div className="form__controls">
                  <div className="select select--rounded">
                    <select name="field-4#" id="field-4#">
                      <option value="">Select 1#</option>

                      <option value="">Select 1#</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form__row">
                <label className="form__label">Send Invitation</label>

                <div className="checkboxes">
                  <ul>
                    <li>
                      <div className="checkbox">
                        <input type="checkbox" name="field-5#" id="field-5#" />

                        <label htmlFor="field-5#">Email</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input type="checkbox" name="field-6#" id="field-6#" />

                        <label htmlFor="field-6#">Direct Add</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form__actions">
              <input type="submit" value="Invite" className="form__btn" />

              <NavLink
                to="/app/admin/user-list-view"
                className="btn-red btn-red--alt"
              >
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
