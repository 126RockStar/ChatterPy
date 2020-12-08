// @flow
import * as React from 'react';

// import ContactRow from './ContactRow';
// import EmptyRow from './EmptyRow';
// import Table from '../Table';
import type { Contact } from '../../types';
import Paper from '@material-ui/core/Paper';
import {
  PagingState,
  CustomPaging,
  IntegratedPaging,
  SelectionState,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import saveAs from 'file-saver';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import Loading from '../../../Website/Loading'
// import { withStyles } from '@material-ui/core/styles'
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type Props = {
  contacts: $ReadOnlyArray<Contact>,
};
const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  };
const columns = [
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'phoneNumber', title: 'Phone Number' },
    // { name: 'contactsInfo', title: 'Contacts info' },
];
const URL = 'http://api.chatterpy.com/v1/contacts'
// const styles = {
//   customRow: {
//     background: 'red',
//     color: 'red',

//   },
// };

// const CustomTableRowBase = ({ classes, ...restProps }) => {
//   return (
//     <Table.Row
//     className={classes.customRow}
//     {...restProps}
//   />
//     )
  
// };
// const CustomTableRow = withStyles(styles)(CustomTableRowBase);

export default function ContactsTable({ contacts, selection, setSelection }: Props): React.Node {
  // const renderHeaderRow = React.useCallback(() => {
  //   return (
  //     <div className="section__row-header grid">
  //       <div className="section__row-item grid__col grid__col--size7 hidden-xs">
  //         <p>First Name</p>
  //       </div>
  //       <div className="section__row-item grid__col grid__col--size8 hidden-xs">
  //         <p>Last Name</p>
  //       </div>
  //       <div className="section__row-item grid__col grid__col--size10 hidden-xs"></div>
  //       <div className="section__row-item grid__col grid__col--size9 hidden-xs">
  //         <p>Phone Number</p>
  //       </div>
  //       <div className="section__row-item grid__col grid__col hidden-xs"></div>
  //       <div className="section__row-item grid__col grid__col visible-xs-block hidden">
  //         <p>Contacts info</p>
  //       </div>
  //     </div>
  //   );
  // }, []);

  // const renderRow = React.useCallback(
  //   contact => <ContactRow key={contact.id} contact={contact} />,
  //   [],
  // );
  // const [selection, setSelection] = React.useState([]);
  // console.log("contacts", contacts)
  
  const [pageSize] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [lastQuery, setLastQuery] = React.useState();
  const [totalCount, setTotalCount] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const getQueryString = () => (
    `${URL}/?page=${pageSize}`
  );
  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then(response => response.json())
        .then(({ data, totalCount: newTotalCount }) => {
          setRows(data);
          setTotalCount(newTotalCount);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };
  React.useEffect(() => loadData(), []);
  React.useEffect(() => loadData(), [currentPage]);
  const exporterRef = React.useRef(null);
  const startExport = React.useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);
  

  return (
    <>
    <Paper>
      <Grid
        rows={contacts}
        columns={columns}
      >
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging
          totalCount={totalCount}
        />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <IntegratedPaging />
        <IntegratedSelection />
        <SortingState
          defaultSorting={[{ columnName: 'firstName', direction: 'asc' }]}
        />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow 
        showSortingControls
        />
        <Toolbar />
        <TableSelection
          selectByRowClick
          showSelectAll
          highlightRow
        />
        <ExportPanel startExport={startExport} />
        <PagingPanel />
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={contacts}
        selection={selection}
        columns={columns}
        onSave={onSave}
      />
      {loading && <Loading />}
    </Paper>
    </>
  );
}
