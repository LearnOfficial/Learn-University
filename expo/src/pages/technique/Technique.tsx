import { Page } from "../../components/Page";
import CreateTechnique from "./CreateTechnique";

export function Technique() {
  return (
    <Page
      // TODO: add refresh
      refreshing={false}
      onRefresh={() => { }}
    >
      <CreateTechnique/>
    </Page>
  );
}
