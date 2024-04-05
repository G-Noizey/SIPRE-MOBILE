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
      <View style={styles.containerIcon}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Icon name="receipt" size={20} color="black" onPress={onPress} />
          </View>
        </TouchableOpacity>
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
    width: 50,
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
  containerIcon: {
    backgroundColor: 'green',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: 'green',
    width: 50,
    height: 96,
    justifyContent: 'center',
  },
});

export default RoundedCard;
