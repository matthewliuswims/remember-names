// @tutorial: https://facebook.github.io/react-native/docs/colors

import colorPalette from '../assets/styles/colors';

const colors = [
  colorPalette.firstGroupColor,
  colorPalette.secondGroupColor,
  colorPalette.thirdGroupColor,
  colorPalette.fourthGroupColor,
  colorPalette.fifthGroupColor,
  colorPalette.sixthGroupColor,
  colorPalette.seventhGroupColor,
  colorPalette.eighthGroupColor,
];

/**
 * helper func for nextColor()
 * @param {string[]} groupColors - CURRENT colors of all the groups (unordered from redux)
 *   @example ['silver','red','yellow']
 * @return {string[]} - groupColors are now ordered by position (based on above colorsToPosition mapping)
 *   @example ['red', 'silver', 'yellow']
 */
function orderColors(groupColors) {
  // @example of colorsAndPosition
  //  [
  //   { color: 'yellow', position: 5},
  //   { color: 'red', position: 0},
  //   { color: 'silver', position: 3},
  //  ];
  const colorsAndPosition = groupColors.map((color) => {
    return ({
      color,
      position: colors.findIndex(colEle => colEle === color),
    });
  });
  colorsAndPosition.sort((a, b) => {
    return a.position - b.position;
  });
  const orderedColors = colorsAndPosition.map(colorPosition => colorPosition.color);
  return orderedColors;
}

/**
 * called in GroupsDB to get the next group color for a newly created group.
 *
 * this func assumes groupColors is an array that is no greater than GROUP_NUMBER_LIMIT
 *
 * @param {string[]} groupColors - CURRENT colors of all the groups (unordered from redux)
 * @returns {string} next group color for a NEW group
 */
export function nextColor(groupColors) {
  const groupColorsOrdered = orderColors(groupColors);
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] !== groupColorsOrdered[i]) {
      return colors[i];
    }
  }
}

/**
 * For this case, we can always assume that groups will be >1
 * because the caller of this is a group container, which means
 * that at least 1 group exists
 * @param {string} groupName - groupName we are interested in finding color for
 * @param {[]Object} groups - all groups (unordered) that exist, can assume this will always have length > 1.
 * can assume names in groups are all unique.
 * @return {string} color for groupName
 * tests for jest when it works:
 * 1) empty array - []
 * 2) normal case (mixed ascending numbers) - [0,1,4,5]
 * 2.5) normal case not starting with 0 - [2,4,5]
 * 2.75) normal ascending case [0,1,2]
 * 3) 1 item with id of 0 - [0]
 * 4) 1 item with id of 3 [3]
 */
export function getGroupColor(groupName, groups) {
  const foundGroup = groups.find(group => group.name === groupName);

  if (foundGroup) return foundGroup.color;

  throw new Error('Could not get the group color for a group name');
}
