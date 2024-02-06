import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomNavBar = ({ navigation }) => {
  const cardTranslateY = new Animated.Value(0);

  const handleHover = () => {
    Animated.timing(cardTranslateY, {
      toValue: -10,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleLeave = () => {
    Animated.timing(cardTranslateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            {
              translateY: cardTranslateY,
            },
          ],
        },
      ]}
    >
      {/* Botones en la tarjeta */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, styles.greenButton]}
          onPress={() => navigation.navigate('Screen1')}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Icon name="home" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.greenButton]}
          onPress={() => navigation.navigate('Screen2')}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Icon name="user" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.greenButton]}
          onPress={() => navigation.navigate('Screen3')}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Icon name="gear" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: 'green',
  },
});

export default BottomNavBar;
