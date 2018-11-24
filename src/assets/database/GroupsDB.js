import React from 'react';
import databaseConnection from './DatabaseConnection';
import nextColor from '../../lib/groupColors';

const GROUP_NUMBER_LIMIT = 8; // @TODO need to give design justification in a screen/readme for
// for why we set a hard limit...
// because: a) limit clutter b) want control over specific colors

export default class GroupsDB extends React.Component {
    static singletonInstance;

    /**
     * @tutorial https://stackoverflow.com/questions/44719103/singleton-object-in-react-native
     * @tutorial https://stackoverflow.com/questions/28627908/call-static-methods-from-regular-es6-class-methods/28648214
     * BELOW IS IMPORTANT!!!
     *  When in context of a static method in JS or getter there is no "current instance" by intention and so
        'this' refers to the definition of current class
        @return {Promise<Object>} - promise that will resolve with the instance
     */
    static getInstance() {
      // BELOW IS IMPORANT!!!!!!!!!!!!!!
      // this -> the class definition
      // GroupsDB.singletonInstance (once defined) -> class instance (i.e. instance of class)
      // this.singletonInstance -> class instance
      // i.e. GroupsDB.singletonInstance === this.singletonInstance

      // everytime the app is loaded, the below block of code will be loaded
      // but afterwards (for the duration of the app session) we will go to the
      // return New Promise code block
      if (!GroupsDB.singletonInstance) {
        GroupsDB.singletonInstance = new GroupsDB();
        return this.singletonInstance.createTable().then((success) => {
          console.log('created table code', success);
          return this.singletonInstance;
        }).catch((err) => {
          throw err;
        });
      }
      return new Promise((res) => {
        res(this.singletonInstance);
      });
    }

    get dbConnection() {
      return databaseConnection.dbConnection;
    }

    /**
     * createTable() is a method, so only instances (e.g. this.singletonInstance) can call this method
     */
    createTable() {
      return new Promise((resolve, reject) => {
        GroupsDB.singletonInstance.dbConnection.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS groups (
              group_id INTEGER PRIMARY KEY NOT NULL, 
              name TEXT NOT NULL UNIQUE, 
              color TEXT NOT NULL UNIQUE, 
              last_edit DATE NOT NULL
            );`,
          );
        },
        err => reject(err),
        () => resolve('successfully created table or successfully did not create table because it was already there'));
      });
    }

    async addGroup(groupName) {
      const timeGroupAdded = new Date();
      let groups;

      try {
        groups = await this.listGroups();
      } catch (e) {
        throw e;
      }

      if (groups.length >= GROUP_NUMBER_LIMIT) {
        throw new Error(`You cannot have more than ${GROUP_NUMBER_LIMIT} groups. You CURRENTLY have ${groups.length} groups. Please delete a group to make another one`);
      }

      const groupColors = [];

      for (const group of groups) {
        groupColors.push(group.color);
      }

      const nextGrpColor = nextColor(groupColors);

      return new Promise((resolve, reject) => {
        GroupsDB.singletonInstance.dbConnection.transaction(
          (tx) => {
            tx.executeSql('INSERT INTO groups (name, last_edit, color) values (?, ?, ?)', [groupName, timeGroupAdded, nextGrpColor]);
          },
          err => reject(err),
          () => resolve('success'), // executeSql doesn't requre anything, so we can't resolve with anything meaningful
        );
      });
    }

    listGroups() {
      return new Promise((resolve, reject) => {
        GroupsDB.singletonInstance.dbConnection.transaction(
          (tx) => {
            // can get from executeSql
            tx.executeSql('SELECT * FROM groups', [], (_, { rows }) => {
              resolve(rows._array); //eslint-disable-line 
            });
          },
          err => reject(err),
          () => resolve('success'), // executeSql doesn't requre anything, so we can't resolve with anything meaningful
        );
      });
    }
}
