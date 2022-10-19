import {
  Container,
  Icon,
  Title,
  DisplayPlayersInGroup,
  BoxDisplay,
} from "./styles";
import { TouchableOpacityProps, Alert } from "react-native";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { useState, useEffect } from "react";

type Props = TouchableOpacityProps & {
  title: string;
};

export const GroupCard = ({ title, ...rest }: Props) => {
  const [numberOfPlayersInGroup, setNumberOfPlayersInGroups] = useState(0);

  const fetchPlayersInGroup = async (group: string) => {
    try {
      const playersInGroup = await playersGetByGroup(group);
      setNumberOfPlayersInGroups(playersInGroup.length);
    } catch (error) {
      Alert.alert("Numero de players", "Numero de players não encontrado");
    }
  };

  useEffect(() => {
    fetchPlayersInGroup(title);
  }, []);

  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
      <BoxDisplay>
        <DisplayPlayersInGroup> {numberOfPlayersInGroup}</DisplayPlayersInGroup>
      </BoxDisplay>
    </Container>
  );
};
