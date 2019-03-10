// @tutorial https://medium.com/@tommylackemann/managing-styles-in-react-native-3546d3482d73

// @tutorial https://medium.com/react-native-training/build-responsive-react-native-views-for-any-device-and-support-orientation-change-1c8beba5bc23
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RF from 'react-native-responsive-fontsize';

import colors from './colors';

export const sectionHeader = {
  color: 'white',
  backgroundColor: colors.appThemeColor,
  headerLayoutPreset: 'center',
};

// the overarching container for a screen
export const container = {
  flex: 1,
  paddingTop: hp('3%'),
  backgroundColor: colors.containerBackgroundColor,
  paddingLeft: wp('3%'),
  paddingRight: wp('3%'),
};

export const twoItemHeaderContainer = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const loadingContainer = {
  flex: 1,
  paddingTop: hp('3%'),
  backgroundColor: colors.containerBackgroundColor,
  paddingLeft: wp('3%'),
  paddingRight: wp('3%'),
  justifyContent: 'center',
  alignItems: 'center',
};

export const deleteContainer = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  marginBottom: 36,
  marginTop: hp('3%'),
  padding: hp('1%'),
};

export const topRightTextButtonContainer = {
  paddingTop: hp('0.5%'),
  paddingBottom: hp('0.5%'),
  paddingLeft: wp('1%'),
  paddingRight: wp('1%'),

  backgroundColor: '#00000000',
  color: 'white',
};

export const topRightTextButtonContainerSolo = {
  paddingTop: hp('0.5%'),
  paddingBottom: hp('0.5%'),
  paddingLeft: wp('3%'),
  paddingRight: wp('3%'),

  backgroundColor: '#00000000',
  color: 'white',
};

export const topRightButtonText = {
  color: 'white',
  fontWeight: 'bold',
};

// has no colors
export const horizontalGroupScreenButton = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#979797',
  shadowColor: '#979797',
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height: 2,
    width: 2,
  },
};

// user in conjunction with contents
export const footerSection = {
  paddingTop: hp('3%'),
  paddingBottom: hp('3%'),
  flex: 1,
};

export const innardsStyleContainer = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export const groupIconContainer = {
  marginTop: hp('1%'),
};

// size?
export const checkBoxBase = {
  padding: 0,
  margin: 0,
};

// @TODO: any customer logic for the fitler group icon should put in the filter component
export const circularGroupIcon = {
  height: 18,
  width: 18,
  borderRadius: 10,

  marginRight: wp('2%'),
  marginLeft: wp('2%'),
};

export const groupIconNameDateContainer = {
  flexDirection: 'row',
  paddingTop: hp('0.5%'),
  alignItems: 'center',
  marginBottom: 4,

  justifyContent: 'space-between',
};

export const groupIconNameContainer = {
  flexDirection: 'row',
};

export const groupColorBoxSliverLeftSide = {
  paddingTop: 10,
  paddingBottom: 10,
  width: 30,
  height: 76,
  marginRight: 8,
};

export const rightSideGroupBox = {
  marginTop: 10,
};

export const groupBoxContainer = {
  flex: 1,
  flexDirection: 'row',
};

export const groupIconNameContainerEditAddUser = {
  paddingTop: hp('0.5%'),
  paddingBottom: hp('0.5%'),
  flexDirection: groupIconNameContainer.flexDirection,
};

export const modalMsg = {
  textAlign: 'center',
  marginTop: hp('2%'),
  marginBottom: hp('3%'),
};

export const cancelButton = {
  backgroundColor: colors.cancelButtonBackgroundColor,

  paddingLeft: wp('7%'),
  paddingRight: wp('7%'),
  paddingTop: hp('1%'),
  paddingBottom: hp('1%'),

  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
};

export const cancelButtonText = {
  color: colors.cancelButtonBackgroundText,
};

/**
 * always is paired with a cancelButton
 */
export const deleteButton = {
  backgroundColor: colors.warningColor,
  paddingLeft: wp('7%'),
  paddingRight: wp('7%'),
  paddingTop: hp('1%'),
  paddingBottom: hp('1%'),

  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
  marginLeft: wp('2.5%'),
};

export const deleteButtonText = {
  color: 'white',
};

export const modalContentDeleteConfirmation = {
  backgroundColor: 'white',
  padding: 16,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
};

// e.g. filter and sort
export const modalContentNormal = {
  height: hp('60%'),
  backgroundColor: 'white',
  padding: 16,
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
};

export const modalHeaderDelete = {
  fontWeight: 'bold',
  fontSize: RF(2.5),
  marginTop: hp('2%'),
};

// e.g. filter and sort
export const modalHeaderNormal = {
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 2,
  paddingBottom: hp('2%'),
  marginBottom: hp('2%'),
};

export const userContainerStyle = {
  borderWidth: 0,
  borderBottomWidth: 1,
  paddingTop: 5,
  paddingBottom: 5,
  backgroundColor: colors.containerBackgroundColor,
};

export const groupContainerStyle = {
  marginBottom: hp('1.5%'),
  borderRadius: 4,
  borderWidth: 1,
  backgroundColor: colors.containerBackgroundColor,
};

export const groupTextStyle = {
  fontSize: 14,
};

export const addEditInstructionsGroupText = {
  fontSize: RF(3),
  fontWeight: 'bold',
};

export const headerButtonWrapper = {
  paddingTop: hp('0.5%'),
  paddingBottom: hp('0.5%'),
  paddingLeft: wp('3%'),
  paddingRight: wp('3%'),
};

export const togglePeopleGroupsWrapper = {
  paddingLeft: wp('3%'),
  paddingRight: wp('3%'),
};

export const rightDrawerOpenValue = -140;

export const editRightSlot = {
  backgroundColor: '#cccc00',
  width: 70,
  justifyContent: 'center',
  alignItems: 'center',
};

export const editRightSlotText = {
  color: 'white',
  fontWeight: 'bold',
};

export const deleteRightSlot = {
  backgroundColor: colors.warningColor,
  width: 70,
  justifyContent: 'center',
  alignItems: 'center',
};

export const deleteRightSlotText = {
  color: 'white',
  fontWeight: 'bold',
};

export const rowUserBack = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  borderWidth: 0,
  borderBottomWidth: 1,
  paddingTop: 5,
  paddingBottom: 5,
  flex: 1,
};
