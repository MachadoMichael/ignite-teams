import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Hightlight } from "@components/Hightlight";

import { useState, useCallback } from "react";
import { Container } from "./styles";
import { FlatList, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupGetAll";
import { Loading } from "@components/Loading";

export const Groups = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();

  const handleNewGroup = () => {
    navigate("new");
  };

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível carregar as turmas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGroup = (group: string) => {
    navigate("players", { group });
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Hightlight title="Turmas" subtitle="Jogue com sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={
            <ListEmpty message="Quel tal cadastrar a primeira turma?" />
          }
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
