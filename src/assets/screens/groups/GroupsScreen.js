import React, { Component } from 'react';
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import RightHeaderComponent from '../../components/screen/RightHeaderComponent';
import { container, horizontalScreenButton } from '../../styles/base';
import colors from '../../styles/colors';

import ErrorModal from '../../components/modal/Error';

import { listGroups, clearGroupsErr, focusGroup } from '../../../redux/actions/groups';
import Group from '../../components/groups/GroupBox';

type Props = {
  navigation: () => void,
  listGroups: () => Promise<Object>,
  groupsState : {
    error: Object,
    groups: Array<Object>,
  }
};

class GroupsScreen extends Component<Props> {
  constructor(props) {
    console.log('groups screen created - only on opening of app??');
    super(props);
    this.props.listGroups();
  }

  static navigationOptions = {
    title: 'Groups',
    headerRight: <RightHeaderComponent />,
  };

  updateGroupsList = () => {
    this.props.listGroups();
  }

  checkErr = (err) => {
    // don't want err to render if we're not even on the screen
    if (err) {
      return (
        <ErrorModal
          error={err}
          clearError={this.props.clearGroupsErr}
          currentFocusedScreen={this.props.navigation.isFocused()}
        />
      );
    }
  }

  render() {
    const { error: groupsStateErr } = this.props.groupsState;

    return (
      <View style={styles.container}>
        {!this.props.groupsState.loading && (
        <FlatList
          data={this.props.groupsState.groups}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress = {() => {
                this.props.focusGroup(item.name);
                this.props.navigation.navigate('GroupScreen');
              }}
            >
              <Group
                style={styles.item}
                groupName={item.name}
                firstUsername = 'asd' // @TODO: get usernames from redux state, who have latest edit date
                secondUsername = 'asd'
                />
            </TouchableOpacity>
          )}
          keyExtractor={(item => `${item.group_id}`)}
        />) }
        <Button
          onPress = {() => this.props.navigation.navigate('UsersScreen',
            {
              id: 86,
              details: 'yeah',
            })}
          title = 'Go to users screen'
        />
        <TouchableOpacity
          style={styles.button}
          onPress = {() => this.props.navigation.navigate('AddGroupScreen')}
        >
          <Text> Add Group </Text>
        </TouchableOpacity>
        <Button
          onPress = {this.updateGroupsList}
          title = 'List groups'
        />
        {this.checkErr(groupsStateErr)}
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
  // PUT BUTTON IN SEPARATE LOGIC
  button: {
    backgroundColor: colors.addApplyColor,

    alignItems: horizontalScreenButton.alignItems,
    padding: horizontalScreenButton.padding,
    borderRadius: horizontalScreenButton.borderRadius,
    borderWidth: horizontalScreenButton.borderWidth,
    borderColor: horizontalScreenButton.borderColor,
    shadowColor: horizontalScreenButton.shadowColor,
    shadowOpacity: horizontalScreenButton.shadowOpacity,
    shadowRadius: horizontalScreenButton.shadowRadius,
    shadowOffset: horizontalScreenButton.shadowOffset,
  },
});

const mapStateToProps = state => (
  {
    groupsState: state.groups,
  }
);
const mapDispatchToProps = dispatch => (
  {
    listGroups: () => dispatch(listGroups()),
    clearGroupsErr: () => dispatch(clearGroupsErr()),
    focusGroup: groupName => dispatch(focusGroup(groupName)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);
