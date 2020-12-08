// @flow
import * as React from 'react';
import {Modal} from "antd"
import ContactRowMobile from './ContactRowMobile';
import ContactSearchInput from './ContactSearchInput';
import ContactsTable from './ContactsTable';
import ContactsService from '../../../../services/ContactsService';
import type { Contact } from '../../types';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ChatterPyDispatch from '../../ChatterPyDispatch';
type Props = {
  allContacts: $ReadOnlyArray<Contact>,
  visibleContacts: $ReadOnlyArray<Contact>,
  onAddContactClick: () => void,
};
const { confirm } = Modal;
export default function ContactsTab({
  allContacts,
  visibleContacts,
  onAddContactClick,
}: Props): React.Node {
  const [selection, setSelection] = React.useState([]);
  const contactRowsMobile = visibleContacts.map(contact => (
    <ContactRowMobile key={contact.id} contact={contact} />
  ));
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const onDeleteClick = () => {
    const title = selection.length === 1 ? 'Do you Want to delete this items?' : 'Do you Want to delete these items?';
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        selection.forEach(item=>{
          const id = visibleContacts[item].id
          ContactsService.deleteContact(id).then(() => {
            globalDispatch({ contactId: id, type: 'CONTACT_DELETE' });
          }).then(()=>setSelection([]));
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  };
  
  return (
    <>
      <div className="tabs__utilities hidden-xs">
        <div className="tab__cols">
          <div className="tab__col tab__col--size1">
            <div className="select">
              <select name="field-1#" id="field-1#">
                <option value="">All (0)</option>
                <option value="">Select 1</option>
                <option value="">Select 2</option>
              </select>
            </div>
          </div>

          <div className="tab__col tab__col--size2">
            <label
              htmlFor="search-contacts"
              className="tab__field-label hidden"
            >
              1#
            </label>
            <div className="tab__field-controls">
              <ContactSearchInput id="search-contacts" name="search-contacts" />
            </div>
          </div>
        </div>

        <div className="tab__actions" style={{display: 'flex', alignItems: 'center'}}>
        {
          selection.length > 0 && 
          <DeleteForeverIcon 
            onClick={e => {
              e.preventDefault();
              onDeleteClick();
            }}
            style={{
              color: 'red',
              marginRight: '15px'
            }}
          />
          
        }
          
          <a href="/#" className="btn-plain">
            Import contacts
          </a>

          <a
            href="/#"
            className="btn-plain btn-plain--blue"
            onClick={e => {
              e.preventDefault();
              onAddContactClick();
            }}
          >
            Add contact
          </a>
        </div>
      </div>

      <div className="tab__inner">
        <div className="chats-alt visible-xs-block hidden">
          {contactRowsMobile}
        </div>
        <ContactsTable contacts={visibleContacts} selection={selection} setSelection={setSelection} />
      </div>
    </>
  );
}
