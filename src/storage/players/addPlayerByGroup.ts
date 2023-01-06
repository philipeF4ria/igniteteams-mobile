import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storage.config';

import { AppError } from '@utils/AppError';

import { getPlayersByGroup } from './getPlayersByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(
      player => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está em um time');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch(error) {
    throw (error);
  }
}

export { addPlayerByGroup }
