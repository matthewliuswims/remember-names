import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { headerButtonWrapper } from '../../styles/base';

// currently deprecated and not being used
export default class GroupMenu extends React.Component {
  render() {
    return (
      <Menu
        opened={this.props.opened}
        onBackdropPress={() => this.props.onBackdropPress()}
        onSelect={value => this.props.onSelect(value)}>
        <MenuTrigger
          onPress={() => this.props.onTriggerPress()}
        >
          <Icon
            name='more-vert'
            color='white'
            iconStyle={headerButtonWrapper}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value='Edit' text='Edit' />
          <MenuOption value='Delete' text='Delete' />
        </MenuOptions>
      </Menu>
    );
  }
}
