import Snackbar from 'react-native-snackbar';

export function showErrorSnackbar(
  text,
  duration = Snackbar.LENGTH_SHORT,
  action = null,
) {
  showSnackbar(text, 'red', 'white', duration, action);
}

export function showSuccessSnackbar(
  text,
  duration = Snackbar.LENGTH_SHORT,
  action = null,
) {
  showSnackbar(text, 'green', 'white', duration, action);
}

export function showInfoSnackbar(
  text,
  duration = Snackbar.LENGTH_SHORT,
  action = null,
) {
  showSnackbar(text, 'yellow', 'black', duration, action);
}

export function showSnackbar(
  text,
  backgroundColor,
  textColor,
  duration,
  action,
) {
  dismissSnackbar();

  Snackbar.show({
    text: text,
    duration: duration,
    backgroundColor: backgroundColor,
    textColor: textColor,
    action: action,
  });
}

export function dismissSnackbar() {
  Snackbar.dismiss();
}
