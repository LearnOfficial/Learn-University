import { Image, Text, View } from "react-native";

export function SplashScreen() {
    return (
        <View className="w-screen h-screen justify-center items-center">
            <Image className="w-64 h-64" 
                resizeMode="contain"
                source={require('../../assets/LearnLogo.png')}
            />
        </View>
    );
}
