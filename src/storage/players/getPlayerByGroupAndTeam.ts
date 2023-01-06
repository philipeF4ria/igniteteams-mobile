import { getPlayersByGroup } from './getPlayersByGroup';

async function getPlayersByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await getPlayersByGroup(group);

    const players = storage.filter(player => player.team === team);

    console.log(players);

    return players;

  } catch(error) {
    throw (error);
  }
}

export { getPlayersByGroupAndTeam }
