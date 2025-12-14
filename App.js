import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WeatherItem from './src/components/WeatherItem';
import { getWeatherForecast } from './src/services/WeatherAPI';

export default function App() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState('7');
  const [forecasts, setForecasts] = useState([]);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      Alert.alert('Erro', 'Por favor, informe a cidade no formato: Cidade,Estado,País');
      return;
    }

    const numDays = parseInt(days);
    if (isNaN(numDays) || numDays <= 0) {
      Alert.alert('Erro', 'Número de dias inválido');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    try {
      const result = await getWeatherForecast(city, numDays);
      setForecasts(result.forecasts);
      setCityName(result.city);
    } catch (error) {
      let errorMsg = 'Erro ao buscar previsão do tempo';

      if (error.message.includes('HTTP Error')) {
        errorMsg = 'Erro ao consultar o servidor';
      } else if (error.message.includes('Invalid response')) {
        errorMsg = 'Resposta inválida do servidor';
      } else if (error.message.includes('Network request failed')) {
        errorMsg = 'Sem conexão com a internet';
      }

      Alert.alert('Erro', errorMsg);
      setForecasts([]);
      setCityName('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>Weather Viewer</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cidade,Estado,País (ex: Passos,MG,BR)"
          value={city}
          onChangeText={setCity}
          autoCapitalize="none"
        />

        <View style={styles.daysRow}>
          <Text style={styles.daysLabel}>Dias:</Text>
          <TextInput
            style={styles.daysInput}
            placeholder="7"
            value={days}
            onChangeText={setDays}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Buscar Previsão</Text>
          )}
        </TouchableOpacity>
      </View>

      {cityName !== '' && (
        <Text style={styles.cityName}>{cityName}</Text>
      )}

      <FlatList
        data={forecasts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <WeatherItem forecast={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>
              Nenhuma previsão disponível
            </Text>
          )
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  daysLabel: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
  },
  daysInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 80,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
