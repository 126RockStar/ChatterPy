// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import ChatterPyImages from '../../../helpers/ChatterPyImages';

export default function BillingInfoBlock(): React.Node {
  return (
    <div className="accordion__section accordion__section--alt">
      <div className="accordion__head accordion__head--size1">
        <h4 className="hidden-xs">billing info</h4>

        <div className="accordion__head-content js-toggle-content">
          <div className="grid accordion__grid accordion__grid--alt">
            <div className="grid__col grid__col--size13">
              <strong className="hidden-xs">Credit Card</strong>

              <strong className="visible-xs-block hidden">Billing Info</strong>
            </div>

            <div className="grid__col">
              <strong className="hidden-xs">Recent Payment</strong>

              <strong className="visible-xs-block hidden">Payment</strong>
            </div>

            <div className="grid__col grid__col--size14"></div>
          </div>

          <div className="grid accordion__grid">
            <div className="grid__col grid__col--size13">
              <p className="accordion__text-alt">
                <img
                  src={ChatterPyImages.Icons.visa}
                  alt=""
                  width="34"
                  height="34"
                />
                xxxx-xxxx-xxxx-1234
              </p>
            </div>

            <div className="grid__col">
              <p>06/11/2020</p>
            </div>

            <div className="grid__col grid__col--size14">
              <a href="#" className="accordion__trigger js-accordion-trigger">
                View
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion__body">
        <div className="form-billing">
          <form action="?" method="post">
            <div className="form__inner">
              <div className="form__row">
                <div className="form__cols">
                  <div className="form__col form__col--size1">
                    <label htmlFor="row-field-1#" className="form__label">
                      Card Number
                    </label>

                    <div className="form__controls">
                      <input
                        type="number"
                        className="field-alt"
                        name="row-field-1#"
                        id="row-field-1#"
                      />
                    </div>
                  </div>

                  <div className="form__col form__col--size2">
                    <label htmlFor="row-field-2#" className="form__label">
                      Expiration
                    </label>

                    <div className="form__controls">
                      <input
                        type="number"
                        className="field-alt"
                        name="row-field-2#"
                        id="row-field-2#"
                      />
                    </div>
                  </div>

                  <div className="form__col form__col--size4 hidden-xs">
                    <label
                      htmlFor="row-field-3#"
                      className="form__label"
                    ></label>

                    <div className="form__controls">
                      <input
                        type="number"
                        className="field-alt"
                        name="row-field-3#"
                        id="row-field-3#"
                      />
                    </div>
                  </div>

                  <div className="form__col form__col--size4">
                    <label htmlFor="row-field-4#" className="form__label">
                      Security Code
                    </label>

                    <div className="form__controls">
                      <input
                        type="number"
                        className="field-alt"
                        name="row-field-4#"
                        id="row-field-4#"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__row">
                <div className="form__cols">
                  <div className="form__col form__col--size3">
                    <label htmlFor="row-field-5#" className="form__label">
                      Name
                    </label>

                    <div className="form__controls">
                      <input
                        type="text"
                        className="field-alt"
                        name="row-field-5#"
                        id="row-field-5#"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__row">
                <div className="form__cols">
                  <div className="form__col form__col--1of2">
                    <label htmlFor="row-field-6#" className="form__label">
                      Address
                    </label>

                    <div className="form__controls">
                      <input
                        type="text"
                        className="field-alt"
                        name="row-field-6#"
                        id="row-field-6#"
                      />
                    </div>
                  </div>

                  <div className="form__col form__col--1of2 hidden-xs">
                    <label
                      htmlFor="row-field-7#"
                      className="form__label"
                    ></label>

                    <div className="form__controls">
                      <input
                        type="text"
                        className="field-alt"
                        name="row-field-7#"
                        id="row-field-7#"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__row">
                <div className="form__cols">
                  <div className="form__col form__col--1of2">
                    <label htmlFor="row-field-8#" className="form__label">
                      City
                    </label>

                    <div className="form__controls">
                      <input
                        type="text"
                        className="field-alt"
                        name="row-field-8#"
                        id="row-field-8#"
                      />
                    </div>
                  </div>

                  <div className="form__col form__col--1of2">
                    <label htmlFor="row-field-9#" className="form__label">
                      Zip/Postal Code
                    </label>

                    <div className="form__controls">
                      <input
                        type="number"
                        className="field-alt"
                        name="row-field-9#"
                        id="row-field-9#"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__row">
                <div className="form__cols">
                  <div className="form__col form__col--1of2">
                    <label htmlFor="row-field-10#" className="form__label">
                      Country
                    </label>

                    <div className="form__controls">
                      <input
                        type="text"
                        className="field-alt"
                        name="row-field-10#"
                        id="row-field-10#"
                      />
                    </div>
                  </div>

                  <div className="form__col form__col--1of2">
                    <label htmlFor="row-field-11#" className="form__label">
                      State/ Province
                    </label>

                    <div className="form__controls">
                      <input
                        type="text"
                        className="field-alt"
                        name="row-field-11#"
                        id="row-field-11#"
                      />
                    </div>
                  </div>
                </div>

                <p>
                  Chatterpy uses industry standard encryption to protect your
                  personal information
                </p>
              </div>

              <div className="form__row">
                <div className="form__cols">
                  <div className="form__col form__col--1of2">
                    <label htmlFor="row-field-12#" className="form__label">
                      Email
                    </label>

                    <div className="form__controls">
                      <input
                        type="email"
                        className="field-alt"
                        name="row-field-12#"
                        id="row-field-12#"
                      />
                    </div>
                  </div>

                  <div className="form__col form__col--1of2">
                    <label htmlFor="row-field-13#" className="form__label">
                      Phone
                    </label>

                    <div className="form__controls">
                      <input
                        type="number"
                        className="field-alt"
                        name="row-field-13#"
                        id="row-field-13#"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form__actions">
              <input
                type="submit"
                value="Save"
                className="js-accordion-trigger form__btn"
                onClick={e => e.preventDefault()}
              />

              <a href="#" className="js-accordion-trigger btn-red btn-red--alt">
                Cancel Update
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
