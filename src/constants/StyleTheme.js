import { DefaultTheme } from "@react-navigation/native";
import colors from "./colors";
import { ImageBackground } from "react-native-web";

const StyleTheme ={
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        background:colors.principal,
        card:colors.variante2,
        text:colors.default,
        border:colors.variantes3,
        notification:colors.delicate
    },

};

export default StyleTheme;