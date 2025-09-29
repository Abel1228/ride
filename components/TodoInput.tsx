import { LinearGradient } from 'expo-linear-gradient';
import { createHomeStyles } from '@/assets/styles/home.style';
import UseTheme from '@/app/hooks/UseTheme';
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const TodoInput =()=> {
    const {colors} = UseTheme();
    const homeStyles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState('');
    // const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async () => {
        if(newTodo.trim()){
            
        }
    }
    return (
      <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput 
        style={homeStyles.input}
        placeholder='Enter your Email'
        value={newTodo}
        onChangeText={setNewTodo}
        onSubmitEditing={handleAddTodo}
        placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()}>
            <LinearGradient 
                colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                style={[homeStyles.addButton, 
                !newTodo.trim() &&
                homeStyles.addButtonDisabled]}
                >
                    <Ionicons name='add' size={24} color='#fff'/>
                </LinearGradient>
                 </TouchableOpacity>
        </View>
      </View>
    );
}

export default TodoInput