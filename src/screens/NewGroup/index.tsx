import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Hightlight } from "@components/Hightlight";

import { Alert } from "react-native";
import { useState } from "react";
import { AppError } from "@utils/AppError";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";

export const NewGroup = () => {
  const [group, setGroup] = useState("");

  const { navigate } = useNavigation();

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("NOvo Grupo", "Informe o nome da turma");
      }
      await groupCreate(group);
      navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
      }
      console.log(error);
    }
  };

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />

        <Hightlight
          title="Nova turma"
          subtitle="crie a turma para adcionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  );
};
