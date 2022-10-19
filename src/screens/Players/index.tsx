import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import { Hightlight } from "@components/Hightlight";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { useEffect, useState, useRef } from "react";
import { AppError } from "@utils/AppError";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetGroupAndTeam";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
};

export const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const { navigate } = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adcionar"
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fecthPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar");
      }
    }
  };

  const fecthPlayersByTeam = async () => {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group);
      fecthPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Pessoa", "Não foi possível remover essa pessoa");
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigate("groups");
    } catch (error) {
      Alert.alert("Remover grupo", "Não foi possível remover a turma.");
    }
  };

  const handleGroupRemove = async () => {
    Alert.alert("Remove", "Deseja remover o groupo?", [
      { text: "Não", style: "cancel" },

      { text: "Sim", onPress: () => groupRemove() },
    ]);
  };

  useEffect(() => {
    fecthPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Hightlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        onPress={handleGroupRemove}
        title="Remover turma"
        type="SECONDARY"
      />
    </Container>
  );
};
