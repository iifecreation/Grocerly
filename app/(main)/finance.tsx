// import {View, Text} from 'react-native';
// import React from 'react';

// const Finance = () => {
//   return (
//     <View style={{flex: 1, backgroundColor: 'red'}}>
//       <Text>Finance</Text>
//     </View>
//   );
// };

// export default Finance;

import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import JSON5 from 'json5';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const Finance = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get your free token from https://huggingface.co/settings/tokens
  const HF_API_KEY = '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';
  const MODEL_NAME = 'mistralai/Mixtral-8x7B-Instruct-v0.1';

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a food item');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null); // Reset previous result

    try {
      // Optimized prompt for Mixtral-8x7B
      const prompt = `
      [INST] You are a nutrition assistant. 

      Return only a valid JSON object containing the nutritional benefits of "${query}" with the following structure:

      {
        "food": string,
        "calories": number,
        "macros": { "protein": number, "carbs": number, "fats": number },
        "vitamins": string[],
        "minerals": string[],
        "health_benefits": string[],
        "summary": string
      }

      - Do not include explanations or any text outside the JSON.
      - Use metric units.
      - Be concise and structured correctly.

      Only return the JSON object. [/INST]
    `;

      // API Call
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1`,
        {inputs: prompt},
        {
          headers: {Authorization: `Bearer ${HF_API_KEY}`},
          timeout: 30000, // 30s timeout
        },
      );

      // Extract AI-generated response
      const rawText = response.data?.[0]?.generated_text || '';
      console.log('🚀 Raw Response:', parseAIResponse(rawText));

      // ✅ Step 1: Extract JSON using regex (in case extra text appears)
      const jsonMatch = rawText.match(/{[\s\S]*}/);

      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      // ✅ Step 2: Convert JSON string to object
      const nutritionData = JSON.parse(jsonMatch[0]);
      // console.log('🚀 Parsed Nutrition Data:', nutritionData);

      // ✅ Step 3: Validate response structure
      if (
        !nutritionData.food ||
        !nutritionData.calories ||
        !nutritionData.macros
      ) {
        throw new Error('Incomplete data received from AI');
      }

      // ✅ Step 4: Save to state
      setResult(nutritionData);
    } catch (err) {
      console.error('🚀 API Error:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter food item (e.g., avocado, salmon)"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      <Button
        title={loading ? 'Analyzing...' : 'Get Nutrition'}
        onPress={handleSearch}
        disabled={loading}
        color="#4CAF50"
      />

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {result && (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.title}>{result.food}</Text>

          <Text style={styles.sectionTitle}>
            Calories: {result.calories}kcal
          </Text>

          <Text style={styles.sectionTitle}>Macronutrients (per 100g):</Text>
          <Text>Protein: {result.macros.protein}g</Text>
          <Text>Carbs: {result.macros.carbs}g</Text>
          <Text>Fats: {result.macros.fats}g</Text>

          <Text style={styles.sectionTitle}>Vitamins:</Text>
          {result.vitamins.map((v, i) => (
            <Text key={i}>• {v}</Text>
          ))}

          <Text style={styles.sectionTitle}>Minerals:</Text>
          {result.minerals.map((m, i) => (
            <Text key={i}>• {m}</Text>
          ))}

          <Text style={styles.sectionTitle}>Health Benefits:</Text>
          {result.health_benefits.map((b, i) => (
            <Text key={i}>• {b}</Text>
          ))}

          <Text style={styles.summary}>{result.summary}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#34495e',
  },
  summary: {
    marginTop: 15,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
});

export default Finance;

const parseAIResponse = rawText => {
  const data = JSON.parse(
    rawText.split('Only return the JSON object. [/INST]')[1],
  );
  console.log('🚀 ~ rawText:', data['calories']);
  try {
    // Extract JSON block using more precise matching
    const jsonMatch = rawText.match(/{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/s);

    if (!jsonMatch) throw new Error('No JSON found in response');

    console.log('🚀 ~ jsonMatch:', jsonMatch);
    let jsonString = jsonMatch[0]
      .replace(/(\w)\s*:/g, '$1:') // Remove spaces before colons
      .replace(/'/g, '"') // Replace single quotes
      .replace(/(\d),(\d)/g, '$1$2') // Fix number formatting
      .replace(/,\s*}/g, '}') // Remove trailing commas
      .replace(/None/g, 'null'); // Handle null values

    // console.log('🚀 ~ jsonString:', jsonString);
    // Parse with validation
    const result = JSON.parse(jsonString);

    // Validate required fields
    const requiredFields = ['food', 'calories', 'macros', 'vitamins'];
    if (!requiredFields.every(field => field in result)) {
      throw new Error('Missing required fields in JSON');
    }

    return result;
  } catch (error) {
    console.error('Parse error:', error.message);
    console.debug('Original text:', rawText);
    throw new Error('Failed to process nutrition data');
  }
};

const extractNutritionData = rawText => {
  try {
    // 1. Remove everything before the JSON object
    const jsonStartIndex = rawText.indexOf('{');
    const jsonEndIndex = rawText.lastIndexOf('}') + 1;
    const jsonString = rawText.slice(jsonStartIndex, jsonEndIndex);

    // 2. Clean common formatting issues
    const cleanedJson = jsonString
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ') // Ensure proper quotes
      .replace(/'/g, '"') // Replace single quotes
      .replace(/,\s*}/g, '}') // Remove trailing commas
      .replace(/&/g, 'and') // Fix special characters
      .replace(/\\/g, ''); // Remove escape characters

    // 3. Parse the JSON
    const data = JSON.parse(cleanedJson);

    // 4. Validate structure
    const requiredStructure = {
      food: 'string',
      calories: 'number',
      macros: {
        protein: 'number',
        carbs: 'number',
        fats: 'number',
      },
      vitamins: 'array',
      minerals: 'array',
      health_benefits: 'array',
      summary: 'string',
    };

    // Recursive validation function
    const validateStructure = (obj, structure) => {
      for (const key in structure) {
        if (!(key in obj)) {
          throw new Error(`Missing field: ${key}`);
        }

        const expectedType = structure[key];
        const actualType = Array.isArray(obj[key]) ? 'array' : typeof obj[key];

        if (typeof expectedType === 'object') {
          validateStructure(obj[key], expectedType);
        } else if (actualType !== expectedType) {
          throw new Error(
            `Invalid type for ${key}: expected ${expectedType}, got ${actualType}`,
          );
        }
      }
    };

    validateStructure(data, requiredStructure);

    return data;
  } catch (error) {
    console.error('Data extraction failed:', error.message);
    console.debug('Original text:', rawText);
    throw new Error('Failed to process nutrition data: ' + error.message);
  }
};
