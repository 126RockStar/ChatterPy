// @flow

/**
 * A helper function to easily search a list of objects given a
 * searchText string, and a list of keys from that object to
 * use in the search.
 */
export default function searchObjects<T: { +[string]: mixed, ... }>(
  searchText: string,
  allObjects: $ReadOnlyArray<T>,
  keysToUse: $ReadOnlyArray<$Keys<T>>,
): $ReadOnlyArray<T> {
  const searchTerms = searchText.split(' ').map(t => t.toLowerCase());

  // perform search
  return allObjects.filter(obj =>
    searchTerms.every(term =>
      keysToUse.some(key => {
        const val = obj[key];
        if (typeof val === 'string') {
          return val.toLowerCase().includes(term);
        }
        return false;
      }),
    ),
  );
}
