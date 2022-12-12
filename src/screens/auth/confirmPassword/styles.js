import { StyleSheet } from "react-native";
import { AppTheme } from "../../../config/AppTheme";
import { scale, verticalScale } from "../../../utils/scale";

export const styles = StyleSheet.create({
    containerLoading: {
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 10,
        marginTop: verticalScale(40),
      },
      loadingIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: AppTheme.Colors.White,
      },
    
      loadingStyle: {
        width: scale(200),
        height: verticalScale(200),
        alignSelf: 'center',
        marginBottom: verticalScale(40),
      },
    buttonStyle:{
        marginTop: verticalScale(30)
    },
    textInputStyle:{
        marginBottom: verticalScale(20),
    },
    textTitle:{
        textAlign: 'center',
        fontSize: AppTheme.FontSize.Large,
        color: AppTheme.Colors.Dark,
        marginBottom: verticalScale(20),
        fontWeight: '700',
        marginTop: verticalScale(70),
        marginBottom: verticalScale(30)
    },
    body:{
        flex: 1,
        backgroundColor: AppTheme.Colors.SecondBackround,
        paddingHorizontal: scale(16)

    },
    container:{
        flex: 1,
        backgroundColor: AppTheme.Colors.White,
    },
})
