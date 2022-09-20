import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import GOOGLEBTN from '../assets/btn_google.png';

const googleBtn = Image.resolveAssetSource(GOOGLEBTN).uri;

export default function GoogleSignInButton() {
  return (
    <View>
      <Image
        source={{
          uri: googleBtn,
        }}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 230,
    height: 130,
    marginLeft: 10,
    resizeMode: 'contain',
  },
});
