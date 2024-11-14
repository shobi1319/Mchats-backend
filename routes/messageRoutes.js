import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const MessageScreen = ({ route }) => {
  const { userId } = route.params; // Get userId from the route params
  const [message, setMessage] = useState(''); // Message input state
  const [recipientId, setRecipientId] = useState(''); // Recipient id from picker
  const [users, setUsers] = useState([]); // List of users to select from

  // Fetch users from the API to populate the picker
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.100.232:3000/api/users');
        setUsers(response.data); // Set users from API response
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  // Handle sending the message
  const handleSendMessage = async () => {
    if (!recipientId || !message) {
      Alert.alert('Error', 'Please fill in both fields');
      return; // Prevent sending if fields are empty
    }

    try {
      const response = await axios.post('http://192.168.100.232:3000/api/messages', {
        msgId: `msg-${Date.now()}`, // Unique message ID
        message, // Message content
        senderId: userId, // Logged-in user's ID
        recipientId, // Selected recipient's ID
      });

      if (response.data) {
        Alert.alert('Success', 'Message sent');
        setMessage(''); // Clear the message input
        setRecipientId(''); // Clear recipient selection
      } else {
        Alert.alert('Error', 'Failed to send message');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Select Recipient</Text>
      <Picker
        selectedValue={recipientId}
        onValueChange={(itemValue) => setRecipientId(itemValue)} // Update recipientId when picker value changes
        style={{ height: 50, width: 200 }}
      >
        {users.map((user) => (
          <Picker.Item key={user._id} label={user.username} value={user._id} /> // Populate picker with users
        ))}
      </Picker>

      <Text>Message</Text>
      <TextInput
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage} // Update message state as user types
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Send Message" onPress={handleSendMessage} /> {/* Send message button */}
    </View>
  );
};

export default MessageScreen;
