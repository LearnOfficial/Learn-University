import { empty, gql, useQuery } from "@apollo/client";
import { Page } from "../../components/Page";
import { Text } from "../../components/Text";
import { useGraphQLContext } from "../../utils/context";


const HOME_GQL = gql`
  query {
    learner {
      id
      fullname
      email
      username
    }
  }
`;

// TODO: add type to navigation
export default function Home({ navigation }: any) {
  const { data, loading, error, refetch} = useQuery(HOME_GQL, useGraphQLContext());

  return (
    <Page
      refreshing={loading}
      onRefresh={refetch}
    >
      <Text>{data.learner.fullname}</Text>
    </Page>
  )
}
