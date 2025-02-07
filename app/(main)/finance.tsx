import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

const MODEL_NAME = process.env.EXPO_MODEL_NAME;

const getAIResponse = async (query: string, language: string) => {
  const SPLIT_STRING = `[/INST]`;
  const response = await axios.post(
    `https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1`,
    {inputs: prompt(query, language)},
    {
      headers: {Authorization: `Bearer ${HF_API_KEY}`},
      timeout: 30000, // 30s timeout
    },
  );
  const rawText = response.data?.[0]?.generated_text || '';
  const splitedResponse = rawText.split(SPLIT_STRING)?.[1]?.trim() || '';

  const parsedResponse = (() => {
    try {
      // First, try direct parsing
      return JSON.parse(splitedResponse);
    } catch (directParseError) {
      // Try removing any leading/trailing non-JSON characters
      const jsonExtractRegex = /\{[\s\S]*\}/;
      const jsonMatch = splitedResponse.match(jsonExtractRegex);

      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (extractError) {
          console.error('JSON extraction parse failed', extractError);
        }
      }

      // Additional fallback: try cleaning the string
      try {
        const cleanedResponse = splitedResponse
          .replace(/^[^{]*/, '') // Remove anything before first '{'
          .replace(/[^}]*$/, ''); // Remove anything after last '}'

        return JSON.parse(cleanedResponse);
      } catch (cleanError) {
        console.error('Cleaned parse failed', cleanError);
      }

      // If all parsing attempts fail
      throw new Error('Unable to parse AI response');
    }
  })();

  console.log('Parsed Response:', parsedResponse);
  return parsedResponse;
};

// Use previous parsing logic
// Initialize MMKV
const storage = new MMKV();

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: number;
}

const Finance = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [language, setLanguage] = useState('Select');
  const [selectedLang, setSelectedLang] = useState('CH');

  // Load messages from MMKV
  useEffect(() => {
    const savedMessages = storage.getString('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to MMKV
  const saveMessages = (newMessages: Message[]) => {
    storage.set('messages', JSON.stringify(newMessages));
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      isUser: true,
      timestamp: Date.now(),
    };

    // Update UI immediately
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveMessages(newMessages);
    setInputText('');
    setLoading(true);

    try {
      const aiResponse = await getAIResponse(inputText, selectedLang);
      console.log('🚀 ~ handleSend ~ aiResponse:', aiResponse);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: formatNutritionResponse(aiResponse),
        isUser: false,
        timestamp: Date.now(),
      };

      setMessages(prev => {
        const updated = [...prev, aiMessage];
        saveMessages(updated);
        return updated;
      });
    } catch (error) {
      console.log('🚀 ~ handleSend ~ error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Failed to get nutrition information. Please try again.',
        isUser: false,
        timestamp: Date.now(),
      };

      setMessages(prev => {
        const updated = [...prev, errorMessage];
        saveMessages(updated);
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const formatNutritionResponse = (data: any) => {
    return `🍏 ${data.food} Nutrition:
Calories: ${data.calories}kcal
Protein: ${data.macros.protein}g | Carbs: ${data.macros.carbs}g | Fats: ${data.macros.fats}g
Vitamins: ${data.vitamins.join(', ')}
Benefits: ${data.health_benefits.slice(0, 3).join(' • ')}`;
  };

  function onSelect(index: number, value: string) {
    if (index === 0) {
      setSelectedLang('EN');
    } else {
      setSelectedLang('CH');
    }
    setLanguage(value);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => <MessageBubble message={item} />}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          />

          <View style={styles.inputContainer}>
            {loading && (
              <ActivityIndicator style={styles.loading} color="#4CAF50" />
            )}

            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about any food..."
              placeholderTextColor="#888"
              multiline
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={loading}>
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const MessageBubble = ({message}: {message: Message}) => (
  <View
    style={[
      styles.bubble,
      message.isUser ? styles.userBubble : styles.aiBubble,
    ]}>
    <Text style={message.isUser ? styles.userText : styles.aiText}>
      {message.content}
    </Text>
    <Text style={styles.timestamp}>
      {new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  bubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    elevation: 2,
  },
  userText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
  aiText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  picker: {
    flex: 1,
    height: 50,
    marginRight: 12,
  },
  input: {
    flex: 2,
    minHeight: 48,
    maxHeight: 100,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 4,
  },
  loading: {
    marginRight: 12,
  },
  dropdown: {
    flex: 1,
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    width: 150,
  },
});

export default Finance;

const prompt = (query: string, language = 'CH') => `
      Return a valid JSON object containing the nutritional benefits of "${query}" with the following structure:

{
  "food": string,
  "calories": number,
  "macros": { "protein": number, "carbs": number, "fats": number },
  "vitamins": string[],
  "minerals": string[],
  "health_benefits": string[],
  "summary": string,
  "language": "EN" | "CH"
}

Instructions:
- Return the response in the specified language (EN for English, CH for Chinese Simplified)
- Do not include explanations or any text outside the JSON
- Use metric units
- Be concise and structured correctly
- translate entire response to Chinese Simplified

Provide the nutritional information for: ${query}
 [/INST]
  `;
