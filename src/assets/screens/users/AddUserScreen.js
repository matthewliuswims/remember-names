import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import tComb from 'tcomb-form-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { addUser } from '../../../redux/actions/users';

import ErrorModal from '../../components/modal/Error';


import { container, topRightSaveButton, topRightSaveButtonText, horizontalGroupScreenButton } from '../../styles/base';
import { groupValidationFail, clearGroupsErr } from '../../../redux/actions/groups';
import AddGroup from '../../components/groups/AddGroup';

import { MORE_THAN_3_GROUPS, NO_GROUPS_SELECTED } from '../../../lib/errors/overrides';

type Props = {
  navigation: () => void,
  groupsState : {
    groups: Array<Object>,
  }
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
      placeholder: 'What stands out?',
      error: 'Description is required',
    },
    location: {
      placeholder: 'Optional',
    },
  },
};


const noOp = () => { console.log('please try again in a second'); }; // eslint-disable-line no-console

// @TODO: investigate whether or not we will have bugs because 
// we only initialize this.state.groups in constructor once...
class AddUserScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      groups: this.sortedGroups(this.props.groupsState.groups, this.props.groupsState.focusedGroup),
      errorOverrides: null,
    };
  }

  /**
   * @tutorial https://reactnavigation.org/docs/en/header-buttons.html#header-interaction-with-its-screen-component
   * for onPress we need a noOp, otherwise we'd get an error, because React Navigation does NOT guarantee
   * that the screen component will be mounted before the header.
   */
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add User Screen',
      headerRight: (
        // getParam('userSubmit') refers to the 'userSubmit' function in componentDidMount
        <TouchableOpacity onPress={navigation.getParam('userSubmit') || noOp}>
          <View style={styles.saveButton}>
            <Text style={styles.saveButtonText}> Save</Text>
          </View>
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ userSubmit: this.userSubmit });
  }

  /**
   * groupClick should guarantee that groups should never have more than 3 added groups
   */
  get3GroupsForUser(groups) {
    const threeGroups = [];
    for (const group of groups) {
      if (group.added) {
        threeGroups.push(group);
      }
    }
    // hopefully threeGroups will NOT be over 3 lol
    while (threeGroups.length !== 3) {
      threeGroups.push(null);
    }
    return threeGroups;
  }

  userSubmit = () => {
    const userStruct = this.formRef.getValue();

    get3GroupsForUser(this.state.groups) // @TODO: do something with this

    if (userStruct) {
      const { name, location, description } = userStruct;
      // @TODO SQL MIGHT SCREAM IF WE INSERT NULL groupNames...need to check
      console.log('this.state.groups', this.state.groups);

      // let groupColorIds = [];
  
      // groups.map((group) => {
      //   group.color = 
      // })

      console.log('userStruct', userStruct);
      console.log('name is', name);
      console.log('location is', location);
      console.log('description is', description);
    }
  }

  getColorStyle(groupColor, opacity) {
    const buttonNoColorStyle = styles.button;
    const buttonColor = {
      backgroundColor: groupColor,
      opacity,
    };
    const combinedStyle = StyleSheet.flatten([buttonNoColorStyle, buttonColor]);
    return combinedStyle;
  }

  /**
   * CALLED in constructor.
   * by sorted, we just mean that the current/focused group that we are in
   * is first in the list - else the list group is preserved.
   * we also added a 'added' boolean.
   */
  sortedGroups(groupsOriginal, focusedGroupName) {
    const groups = groupsOriginal.slice(); // because we mutate in filter logic

    let focusedGroup;

    const withFocuses = groups.map((group) => {
      const clonedGroupTarget = Object.assign({}, group);
      if (group.name !== focusedGroupName) {
        const unfocusedGroup = Object.assign(clonedGroupTarget, { added: false, opacity: 0.3 });
        return unfocusedGroup;
      }
      focusedGroup = Object.assign(clonedGroupTarget, { added: true, opacity: 1 });
      return focusedGroup;
    });

    const noFocusGroup = withFocuses.filter(group => group.name !== focusedGroupName);

    noFocusGroup.unshift(focusedGroup);
    const sortedGroups = noFocusGroup; // want to make focused group first
    return sortedGroups;
  }

  isGroupAdd(groupName) {
    let added;
    for (const group of this.state.groups) {
      if (group.name === groupName) {
        added = !group.added;
      }
    }
    return added;
  }

  /**
   * sets state for groups, by modifiying the group that was clicked.
   * @param {string} groupname
   */
  groupClick(groupname) {
    let groupCounter = 0;
    for (const group of this.state.groups) {
      if (group.added) groupCounter++;
    }

    if (groupCounter === 1 && !this.isGroupAdd(groupname)) {
      const noGroupsSelected = new Error();
      this.props.groupValidationFail(noGroupsSelected);
      this.setState({
        errorOverrides: NO_GROUPS_SELECTED,
      });
      return;
    }

    if (groupCounter >= 3 && this.isGroupAdd(groupname)) {
      const moreThan3Groups = new Error();
      this.props.groupValidationFail(moreThan3Groups);
      this.setState({
        errorOverrides: MORE_THAN_3_GROUPS,
      });
      return;
    }

    this.setState((prevState) => {
      const { groups } = prevState;
      const updatedGroups = groups.map((group) => {
        if (group.name === groupname) {
          const clonedGroupTarget = Object.assign({}, group);
          const added = !group.added;
          const opacity = added ? 1 : 0.3;
          return Object.assign(clonedGroupTarget, { added, opacity });
        }
        return group;
      });
      return { groups: updatedGroups };
    });
  }


  checkErr = (err) => {
    // don't want err to render if we're not even on the screen
    if (err) {
      return (
        <ErrorModal
          error={err}
          clearError={this.props.clearGroupsErr}
          currentFocusedScreen={this.props.navigation.isFocused()}
          overrides={this.state.errorOverrides}
        />
      );
    }
  }

  render() {
    // @tutorial: https://stackoverflow.com/questions/29363671/can-i-make-dynamic-styles-in-react-native
    // diegoprates
    return (
      <View style={styles.container}>
        <Form ref={(c) => { this.formRef = c; }} type={userForm} options={options} />
        <Text> Group(s) </Text>
        <FlatList
          data={this.state.groups}
          renderItem={({ item }) => (
            <AddGroup
              group={item}
              onGroupClick={groupName => this.groupClick(groupName)}
              getColorStyle={this.getColorStyle}
              innardsStyleContainer={styles.buttonInnardsContainer}
            />)
          }
          keyExtractor={(item => `${item.group_id}`)}
        />
        {this.checkErr(this.props.groupsState.error)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: container.flex,
    paddingTop: container.paddingTop,
    paddingLeft: container.paddingLeft,
    paddingRight: container.paddingRight,
    backgroundColor: container.backgroundColor,
  },
  button: {
    borderRadius: horizontalGroupScreenButton.borderRadius,
    borderWidth: horizontalGroupScreenButton.borderWidth,
    borderColor: horizontalGroupScreenButton.borderColor,
    shadowColor: horizontalGroupScreenButton.shadowColor,
    shadowOpacity: horizontalGroupScreenButton.shadowOpacity,
    shadowRadius: horizontalGroupScreenButton.shadowRadius,
    shadowOffset: horizontalGroupScreenButton.shadowOffset,

    paddingLeft: wp('39%'),
  },
  buttonInnardsContainer: {
    padding: 10,
    flex: horizontalGroupScreenButton.flex,
    flexDirection: horizontalGroupScreenButton.flexDirection,
    justifyContent: 'space-between',
  },
  saveButton: {
    paddingLeft: topRightSaveButton.paddingLeft,
    paddingRight: topRightSaveButton.paddingRight,
    backgroundColor: topRightSaveButton.backgroundColor,
  },
  saveButtonText: {
    color: topRightSaveButtonText.color,
    fontWeight: topRightSaveButtonText.fontWeight,
  },
});


const mapStateToProps = state => (
  {
    groupsState: state.groups,
  }
);
const mapDispatchToProps = dispatch => (
  {
    addUser: user => dispatch(addUser(user)),
    groupValidationFail: err => dispatch(groupValidationFail(err)),
    clearGroupsErr: () => dispatch(clearGroupsErr()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddUserScreen);
