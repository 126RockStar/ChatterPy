// @flow
import * as React from 'react';

type Props<T> = {
  EmptyRow: React.AbstractComponent<{}>,
  data: $ReadOnlyArray<T>,
  pageSize: number,
  renderHeaderRow: () => React.Node,
  renderRow: T => React.Node,
};

// create array of numbers between `start` and `end`, inclusive
function range(start: number, end: number): $ReadOnlyArray<number> {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export default function Table<T>({
  data,
  pageSize,
  renderHeaderRow,
  renderRow,
  EmptyRow,
}: Props<T>): React.Node {
  const [currentPageIdx, setCurrentPageIdx] = React.useState(0);
  const numPages = Math.max(Math.ceil(data.length / pageSize), 1);

  const pages: $ReadOnlyArray<$ReadOnlyArray<T>> = React.useMemo(
    () =>
      range(0, numPages - 1).map(i =>
        data.slice(0 + pageSize * i, pageSize * (i + 1)),
      ),
    [data, pageSize, numPages],
  );
  const page = pages[currentPageIdx] || [];
  const contactRows = React.useMemo(
    () => page.map(rowData => renderRow(rowData)),
    [page, renderRow],
  );

  React.useEffect(() => {
    // if at any point the current page idx is out of bounds,
    // then reset the page idx to be the last page
    if (currentPageIdx > pages.length - 1) {
      setCurrentPageIdx(pages.length - 1);
    }
  }, [pages, currentPageIdx]);

  const emptyRows = range(1, pageSize - page.length).map(idx => (
    <EmptyRow key={idx} />
  ));
  const pageLinks = range(0, numPages - 1).map(pageIdx => (
    <li
      key={pageIdx}
      className={pageIdx === currentPageIdx ? 'is-current' : undefined}
      onClick={() => setCurrentPageIdx(pageIdx)}
    >
      <a href="/#" onClick={e => e.preventDefault()}>
        {pageIdx + 1}
      </a>
    </li>
  ));

  return (
    <div className="section__table hidden-xs">
      <div className="section__table-inner">
        {renderHeaderRow()}
        {contactRows}
        {emptyRows}
      </div>
      <ul className="section__table-pagination">{pageLinks}</ul>
    </div>
  );
}
