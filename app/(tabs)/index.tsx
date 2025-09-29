import Header from '@/components/Header';
import { createHomeStyles } from '../../assets/styles/home.style';
import UseTheme from '../hooks/UseTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoInput from '@/components/TodoInput';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Index() {
  const {toogleDarkMode, colors} = UseTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery();
  const isLoading = todos === undefined;

  if(false) return <LoadingSpinner />;

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

