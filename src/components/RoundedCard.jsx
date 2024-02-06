import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RoundedCard = ({ title, content, imageUrl }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 24,
    elevation: 3,
  },
  leftSection: {
    marginRight: 20,
  },
  image: {
    width: 30,   // Ajusta el tamaño según tus necesidades
    height: 20,  // Ajusta el tamaño según tus necesidades
    borderRadius: 20, // Ajusta el valor según tu preferencia
    paddingEnd: 20
  },
  rightSection: {
    flex: 1,
  },
  title: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
  },
});

export default RoundedCard;
