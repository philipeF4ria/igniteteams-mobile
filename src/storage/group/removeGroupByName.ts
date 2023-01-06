import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storage.config';

import { groupGetAll } from './groupGetAll'

async function removeGroupByName(groupName: string) {
  try {
    const storage = await groupGetAll();

    const filtered = storage.filter(group => group !== groupName);

    const groups = JSON.stringify(filtered);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);

  } catch(error) {
    throw (error)
  }
}

export { removeGroupByName }
