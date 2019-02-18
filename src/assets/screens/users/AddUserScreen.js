// @flow
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import tComb from 'tcomb-form-native';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { addUser, clearUsersErr, listAllUsers } from '../../../redux/actions/users';
import { focusGroup } from '../../../redux/actions/groups';
import ErrorModal from '../../components/modal/Error';

import LoadingSpinner from '../../components/transitional-states/LoadingSpinner';

import { container, groupIconNameContainer, topRightTextButtonContainerSolo, topRightButtonText } from '../../styles/base';
import { getGroupColor } from '../../../lib/groupColors';
import colors from '../../styles/colors';

type Props = {
  navigation: () => void,
};

const { Form } = tComb.form;

const userForm = tComb.struct({
  name: tComb.String,
  location: tComb.maybe(tComb.String),
  description: tComb.String,
});

const options = {
  fields: {
    name: {
      placeholder: 'Person\'s name',
      error: 'Please enter a name',
    },
    description: {
      placeholder: 'Notable impression(s)',
      error: 'Description is required',
    },
    location: {
      placeholder: 'Optional',
    },
  },
};


const noOp = () => { console.log('please try again in a second'); }; // eslint-disable-line no-console

class AddUserScreen extends Component<Props> {
  constructor(props) {
    super(props);
    console.log('add user screen activated', this.props.groupsState.focusedGroupName);
    this.state = {
      value: null, // for form
      selectedGroupName: this.props.groupsState.focusedGroupName,
      groupDropdownOpen: false,
    };
  }


  getCircularColorStyle(groupColor) {
    const circularGroupIconNoColor = styles.circularGroupIcon;
    const circularGroupIconWithColor = {
      backgroundColor: groupColor,
    };
    const combinedStyle = StyleSheet.flatten([circularGroupIconNoColor, circularGroupIconWithColor]);
    return combinedStyle;
  }

  /**
   * @tutorial https://reactnavigation.org/docs/en/header-buttons.html#header-interaction-with-its-screen-component
   * for onPress we need a noOp, otherwise we'd get an error, because React Navigation does NOT guarantee
   * that the screen component will be mounted before the header.
   */
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Person',
      headerRight: (
        // getParam('userSubmit') refers to the 'userSubmit' function in componentDidMount
        <TouchableOpacity onPress={navigation.getParam('userSubmit') || noOp} style={topRightTextButtonContainerSolo}>
          <Text style={topRightButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ userSubmit: this.userSubmit });
  }

  resetFormValueState = async () => {
    this.setState({
      value: null,
    });
  }

  userSubmit = async () => {
    const userStruct = this.formRef.getValue();

    if (userStruct) {
      const { name, location, description } = userStruct;

      const user = {
        name,
        description,
        location,
        primaryGroupName: this.state.selectedGroupName,
      };

      await this.props.addUser(user);
      if (!this.props.usersState.error) {
        await this.props.listAllUsers();
      } // else, we wait for the errModal to popup here
      if (!this.props.usersState.error) {
        this.props.focusGroup(this.state.selectedGroupName);
        await this.resetFormValueState();
        this.props.navigation.navigate('GroupScreen');
      } // else, we wait for the errModal to popup here
    }
  }

  checkErrUsrs = (err) => {
    // don't want err to render if we're not even on the screen
    if (err) {
      return (
        <ErrorModal
          error={err}
          clearError={this.props.clearUsersErr}
          currentFocusedScreen={this.props.navigation.isFocused()}
        />
      );
    }
  }

  onChange = (value) => {
    this.setState({ value });
  }

  otherGroupClick = (group) => {
    this.setState((state) => {
      return {
        groupDropdownOpen: !state.groupDropdownOpen,
        selectedGroupName: group.name,
      };
    });
  }


  /**
   * @param {Array<Object>} allGroups - unordered groups from groups redux
   * @return selection UI for 'other' groups in the dropdown
   */
  otherGroupsDropdown(allGroups) {
    const otherGroups = allGroups.filter(group => group.name !== this.state.selectedGroupName);
    if (otherGroups.length === 0 || !this.state.groupDropdownOpen) {
      return null; // if not open, don't show a dropdown
    }

    return (
      <FlatList
        data={otherGroups}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.otherGroupSelection}
            onPress={() => { this.otherGroupClick(item); }}
          >
            <View style={groupIconNameContainer}>
              <View style={this.getCircularColorStyle(getGroupColor(item.name, otherGroups))} />
              <Text numberOfLines={1}> {item.name} </Text>
            </View>
            <Icon
              name='keyboard-arrow-down'
              color='#F2F2F2'
            />
          </TouchableOpacity>)
        }
        keyExtractor={(item => `${item.groupID}`)}
      />
    );
  }

  /**
   * @param {Array<Object>} allGroups - unordered groups from groups redux
   */
  selectedGroupUI(allGroups) {
    return (
      <TouchableOpacity
        style={styles.initialGroupSelection}
        onPress={() => {
          this.setState((state) => {
            return { groupDropdownOpen: !state.groupDropdownOpen };
          });
        }
        }
      >
        <View style={groupIconNameContainer}>
          <View style={this.getCircularColorStyle(getGroupColor(this.state.selectedGroupName, allGroups))} />
          <Text numberOfLines={1}> {this.state.selectedGroupName} </Text>
        </View>
        <Icon
          name='keyboard-arrow-down'
        />
      </TouchableOpacity>
    );
  }

  groupsSection = (allGroups) => {
    if (allGroups.length === 1) {
      console.log('sect grup name', this.state.selectedGroupName);
      return (
        <View style={styles.groupSection}>
          <View style={groupIconNameContainer}>
            <View style={this.getCircularColorStyle(getGroupColor(this.state.selectedGroupName, allGroups))} />
            <Text> {this.state.selectedGroupName} </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.groupsSection}>
        {this.selectedGroupUI(allGroups)}
        {this.otherGroupsDropdown(allGroups)}
      </View>
    );
  }

  render() {
    const { groups: allGroups, loading } = this.props.groupsState;
    const { loading: usersStateLoading } = this.props.usersState;

    if (loading || usersStateLoading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            groupDropdownOpen: false,
          });
        }}
      >
        <View style={container}>
          <Form
            ref={(c) => { this.formRef = c; }}
            type={userForm}
            value={this.state.value}
            onChange={this.onChange}
            options={options}
          />
          <Text style={styles.groupText}> Group </Text>
          {this.groupsSection(allGroups)}
          {this.checkErrUsrs(this.props.usersState.error)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  groupText: {
    fontWeight: '500',
    fontSize: 17,
  },
  circularGroupIcon: {
    height: wp('4%'),
    width: wp('4%'),
    borderRadius: wp('3%'),
    marginRight: wp('2%'),
    marginLeft: wp('2%'),
  },
  groupSection: {
    marginTop: hp('1.5%'),
  },
  groupsSection: {
    marginTop: hp('1%'),
  },
  initialGroupSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.75,
    borderColor: 'black',
  },
  otherGroupSelection: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderBottomWidth: 0.75,
    borderColor: colors.borderColor,
  },
  groups: {
    marginTop: hp('2%'),
  },
});


const mapStateToProps = state => (
  {
    groupsState: state.groups,
    usersState: state.users,
  }
);
const mapDispatchToProps = dispatch => (
  {
    addUser: user => dispatch(addUser(user)),
    focusGroup: grpName => dispatch(focusGroup(grpName)),
    listAllUsers: () => dispatch(listAllUsers()),
    clearUsersErr: () => dispatch(clearUsersErr()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddUserScreen);
