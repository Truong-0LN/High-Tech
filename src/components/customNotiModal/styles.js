import { StyleSheet } from "react-native";
import { AppTheme } from "../../config/AppTheme";
import { scale, verticalScale } from "../../utils/scale";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: AppTheme.Dimensions.windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: scale(330),
    borderRadius: scale(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: verticalScale(150),
    justifyContent: 'space-evenly',
    paddingBottom: verticalScale(20),
  },
  titleView: {
    paddingVertical: verticalScale(15),
    width: '100%',
    alignItems: 'center',
  },
  buttonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(240),
    marginTop: verticalScale(20),
    justifyContent: 'center',
  },
  button: {
    minWidth: scale(60),
    borderRadius: scale(10),
    minHeight: verticalScale(40),
    borderWidth: 1,
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    paddingVertical: verticalScale(10)
  },
  buttonCancel: {
    backgroundColor: AppTheme.Colors.Light,
  },
  viewCenter: {
    justifyContent: 'space-between',
  },
  buttonConfirm: {
    backgroundColor: AppTheme.Colors.Blue,
  },
  textStyle: {
    color: AppTheme.Colors.White,
    fontFamily: AppTheme.Fonts.SemiBold,
    textAlign: 'center',
    fontSize: AppTheme.FontSize.Medium,
  },
  modalText: {
    marginVertical: verticalScale(15),
    textAlign: 'center',
    fontFamily: AppTheme.Fonts.Medium,
    color: AppTheme.Colors.Black,
    width: scale(240),
    fontSize: AppTheme.FontSize.SmallX,
  },
  modalTitle: {
    // fontSize: AppTheme.FontSize.Large,
    fontSize: AppTheme.FontSize.Large,
    color: AppTheme.Colors.Dark,
    fontFamily: AppTheme.Fonts.SemiBold,
    width: scale(240),
    textAlign: 'center',
    fontWeight: '̃700'
  },
});
export default styles;
