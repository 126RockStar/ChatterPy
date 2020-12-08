// @flow

/**
 * A helper function to easily search a list of strings given a
 * searchText string
 */
export default function searchStrings(
  searchText: string,
  listOfStrings: $ReadOnlyArray<string>,
): $ReadOnlyArray<string> {
  const searchTerms = searchText.split(' ').map(t => t.toLowerCase());

  // perform search
  return listOfStrings.filter(str =>
    searchTerms.every(term => str.toLowerCase().includes(term)),
  );
}
