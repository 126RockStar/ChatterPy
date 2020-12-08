// @flow
/**
 * Sorts earliest date first, unless `order` is set to `DESC`.
 */
export function sortDate(
  d1: ?moment$Moment,
  d2: ?moment$Moment,
  order?: 'ASC' | 'DESC' = 'ASC',
): number {
  const multiplier = order === 'ASC' ? 1 : -1;

  if (d1 != null && d2 != null) {
    if (d1.isBefore(d2)) {
      return -1 * multiplier;
    } else if (d1.isAfter(d2)) {
      return 1 * multiplier;
    }
  }

  if (d1 == null && d2 !== null) {
    return -1 * multiplier;
  } else if (d1 != null && d2 == null) {
    return 1 * multiplier;
  }

  return 0;
}
