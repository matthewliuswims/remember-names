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
  paddingBottom: hp('3%'),
  backgroundColor: '#FFFFFF',
  paddingLeft: wp('3%'),
  paddingRight: wp('3%'),
};

export const topRightSaveButton = {
  padding: wp('1%'),
  marginRight: wp('3%'),
  backgroundColor: '#00000000',
  color: 'white',
};

export const topRightSaveButtonText = {
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
  marginBottom: hp('4%'),
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

export const circularGroupIcon = {
  height: wp('5%'),
  width: wp('5%'),
  borderRadius: wp('3%'),
  marginRight: wp('3%'),
};

export const groupIconNameContainer = {
  flex: 1,
  flexDirection: 'row',
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

export const modalHeader = {
  fontWeight: 'bold',
  fontSize: RF(2.5),
  marginTop: hp('2%'),
};
