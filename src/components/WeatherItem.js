import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherItem({ forecast }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{forecast.icon}</Text>
        <View style={styles.headerText}>
          <Text style={styles.date}>{forecast.date}</Text>
          <Text style={styles.description}>{forecast.description}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.temp}>
          Min: {forecast.minTempC.toFixed(1)}°C | Max: {forecast.maxTempC.toFixed(1)}°C
        </Text>
        <Text style={styles.humidity}>
          Umidade: {forecast.getHumidityPercent()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 40,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    marginTop: 5,
  },
  temp: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  humidity: {
    fontSize: 13,
    color: '#666',
  },
});
