import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  width: 100%;
  flex: 1;
  background-color: #031a37;
`;

export const Wrapper = styled(View)`
  width: 100%;
  padding: 25px 20px;
  border-radius: 0 0 32px 32px;
  background-color: #2a8ee1;
`;

export const Loading = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#2a8ee1',
})`
  display: flex;
  margin: auto auto;
`;

export const Title = styled(Text)`
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 400;
  color: #f9faff;
`;

export const Bold = styled(Text)`
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 700;
  color: #f9faff;
`;

export const LocationWrapper = styled(View)`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const CityWrapper = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SearchLabel = styled(Text)`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  color: #f9faff;
  text-align: center;
`;

export const CityName = styled(Text)`
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 700;
  color: #f9faff;
  text-align: start;
`;

export const CountryName = styled(Text)`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  color: #f9faff;
  text-align: start;
`;

export const Temperature = styled(Text)`
  font-family: 'Montserrat';
  font-size: 56px;
  font-weight: 700;
  color: #f9faff;
  text-align: center;
`;

export const SearchWrapper = styled(View)`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f9faff;
  padding-horizontal: 12px;
  border-radius: 12px;
`;

export const SearchInput = styled(TextInput)`
  width: 90%;
  background-color: #f9faff;
  border-radius: 12px;
  padding: 12px;
`;

export const SearchButton = styled(TouchableOpacity)`
  width: 15%;
  height: auto;
  padding: 8px;
  align-items: center;
  justify-content: center;
  background-color: #8dd0f5;
  border-radius: 8px;
`;

export const SearchListContainer = styled(View)`
  width: 100%;
  padding: 0 20px;
  margin-top: -4%;
`;

export const SearchListWrapper = styled(ScrollView)`
  width: 100%;
  display: flex;
  background-color: #cacfd4;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 20px;
`;

export const SearchListInfoWrapper = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  padding: 20px 6px;
`;

export const SearchListInfoLabel = styled(Text)`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-align: center;
`;

export const SearchListInfoDivider = styled(View)`
  width: 100%;
  border: 1px #ffffff;
  opacity: 0.15;
`;

export const Divider = styled(View)`
  width: 100%;
  border: 1px #ffffff;
  margin-vertical: 10%;
  opacity: 0.15;
`;

export const SemiDivider = styled(View)`
  flex: 1;
  border: 1px #ffffff;
  margin-vertical: 10%;
  opacity: 0.3;
`;

export const WeatherInfoWrapper = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingBottom: '15%',
  },
})`
  padding: 30px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30%;
  background-color: transparent;
`;

export const TemperatureWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

export const StatusWeather = styled(Text)`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  color: #f9faff;
  text-align: center;
`;

export const WeatherSubInfoWrapper = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WeatherSubInfoTextWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WeatherSubInfoTitle = styled(Text)`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  color: #f9faff;
  text-align: center;
`;

export const WeatherSubInfoMessage = styled(Text)`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 700;
  color: #f9faff;
  text-align: center;
`;

export const WeatherDetailsWrapper = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const WeatherDetailsTitle = styled(Text)`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;

export const NotFindCityWrapper = styled(View)`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40% auto;
`;

export const NotFindCityMessage = styled(Text)`
  font-family: Montserrat;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-top: 5%;
`;
