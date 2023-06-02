import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { Page } from "../../components/Page";
import { Separator } from "../../components/Separator";
import { TextInput } from "../../components/TextInput";
import { saveToken } from "../../storage/token";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";
import { COLORS } from "../../styles/colors";
const LEARNER_UPDATE_MUTATION_GQL = gql`
mutation($learnerInput: LearnerUpdateInput!){
  updateLearner(learnerInput: $learnerInput) {
    fullname
  }
}
`;

const LEARNER_DELETE_MUTATION_GQL = gql`
mutation {
  deleteLearner
}
`;


export function Setting({ navigation }) {
  const token = useContext(TokenContext);

  const context = { context: { headers: { Authorization: token } } };
  const [onUpdateLearner, updateLearnerData] = useMutation(LEARNER_UPDATE_MUTATION_GQL, {
    ...context
  });

  const [onDeleteLearner, deleteLearnerData] = useMutation(LEARNER_DELETE_MUTATION_GQL, {
    ...context
  });

  const setTokenContext = useContext(SetTokenContext);
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Page
      // TODO: add refresh
      refreshing={false}
      onRefresh={() => { }}
    >
      <View style={{ gap: 10 }}>
        <Separator title="Profile Zone" color={COLORS.creativity[320]} />
        <TextInput placeholder="Full name" onChange={setFullName} />
        <TextInput placeholder="password" onChange={setPassword} />
        <Button title="Save changes" onPress={() => {
          // TODO: add check for fullname and password because can be empty
          onUpdateLearner({
            variables: {
              learnerInput: {
                "fullname": fullName,
                "password": password
              }
            }
          });
        }} />
      </View>

      <View style={{ gap: 10 }}>
        <Separator title="Danger Zone" color={COLORS.forgot[320]} />
        <Button
          title="Delete Account"
          onPress={async () => {
            onDeleteLearner();
            setTokenContext!("");
            await saveToken("");
          }}
          background={COLORS.forgot[350]} />
      </View>
    </Page>
  );
}

