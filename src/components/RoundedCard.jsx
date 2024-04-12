import { Icon } from '@rneui/base';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const RoundedCard = ({ title, content, imageUrl, onPress }) => {
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
    margin: 24,
    elevation: 3,
    width: 300,
    marginLeft: 35,
  },
  leftSection: {
    width: 60,
    padding: 20,
  },
  image: {
    width: 30,
    height: 20,
    borderRadius: 20,
  },
  rightSection: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: 'gray',
  }
});

export default RoundedCard;
