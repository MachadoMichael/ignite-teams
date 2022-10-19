import { BackButton, BackIcon, Container, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";
import logoImg from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
};

export const Header = ({ showBackButton = false }: Props) => {
  const { navigate } = useNavigation();
  const handleGoBack = () => {
    navigate("groups");
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
};
