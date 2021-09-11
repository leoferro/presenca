import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SnackBarApp = ({ mensagemSnackBarApp, setMensagemSnackBarApp }) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (mensagemSnackBarApp !== '') {
            onToggleSnackBar()
        }
    }, [mensagemSnackBarApp])

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => {
        setVisible(false)
        setMensagemSnackBarApp('')
    };

    return (
        <View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                style={{ position: 'absolute', bottom: 50, marginLeft:'auto', marginRight:'auto', right:10, left:10 }}
                action={{
                    label: 'Ok'
                }}>
                {mensagemSnackBarApp}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default SnackBarApp;