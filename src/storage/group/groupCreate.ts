import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';
import { GROUP_COLLECTION } from '@storage/storage.config';

import { groupGetAll } from './groupGetAll';

async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroupName);

    if (groupAlreadyExists) {
      throw new AppError('Este grupo já existe!');
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTION, 
      JSON.stringify([...storedGroups, newGroupName])
    );
  } catch(error) {
    throw error
  }
}

export { groupCreate }
