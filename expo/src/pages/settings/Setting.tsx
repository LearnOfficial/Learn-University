import { Text, View } from "react-native";
import Button from "../../components/Button";
import { Page } from "../../components/Page";
import { Separator } from "../../components/Separator";
import { TextInput } from "../../components/TextInput";
import { COLORS } from "../../styles/colors";

export function Setting() {
    return (
        <Page>
            <View style={{gap: 10}}>
                <Separator title="General" color={COLORS.creativity[320]} />
                <Text>In progress...</Text>
            </View>

            <View style={{gap: 10}}>
                <Separator title="Profile Zone" color={COLORS.creativity[320]} />
                <TextInput placeholder="Full name" onChange={() => {}}/>
                <TextInput placeholder="password" onChange={() => {}}/>
                <Button title="Save changes" onPress={() => { }} />
            </View>



            <View style={{gap: 10}}>
                <Separator title="Danger Zone" color={COLORS.forgot[320]} />
                <Button title="Delete Account" onPress={() => { }} />
            </View>
        </Page>
    );
}

