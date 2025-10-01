import Header from '@/components/Header';
import TodoInput from '@/components/Inputs_my';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createHomeStyles } from '../../assets/styles/home.style';
import UseTheme from '../hooks/UseTheme';

export default function Index() {
  const {toogleDarkMode, colors} = UseTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery();
  const isLoading = todos === undefined;


  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
    {/* <StatusBar barStyle={colors.statusBarStyle}/> */}
    <SafeAreaView style={homeStyles.safeArea}>
      <Header />
      <TodoInput/>
      <TouchableOpacity onPress={toogleDarkMode} >
        <Text>toogle the mode</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </LinearGradient>
  );
}
function useQuery() {
}

