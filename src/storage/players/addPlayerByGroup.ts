import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storage.config';
import { PlayerStorageDTO } from './PlayerStorageDTO';

async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, '');
  } catch(error) {
    throw (error);
  }
}

export { addPlayerByGroup }
