/* eslint-disable react-native/no-inline-styles */
import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {
  Bold,
  CityName,
  CityWrapper,
  Container,
  CountryName,
  Divider,
  Loading,
  LocationWrapper,
  NotFindCityMessage,
  NotFindCityWrapper,
  SearchInput,
  SearchLabel,
  SearchWrapper,
  SemiDivider,
  StatusWeather,
  Temperature,
  TemperatureWrapper,
  Title,
  WeatherDetailsTitle,
  WeatherDetailsWrapper,
  WeatherInfoWrapper,
  WeatherSubInfoMessage,
  WeatherSubInfoTextWrapper,
  WeatherSubInfoTitle,
  WeatherSubInfoWrapper,
  Wrapper,
} from './weather.styles';
// @ts-ignore
import search from '../../../assets/images/search.png';
import {weatherDetails, weatherSubInfo} from '../constants/data';
import {weatherImagePath} from '../constants/weather-images';
import {getWeatherData} from '../utils/weather-api';
import {weatherConditions} from '../constants/weather-conditions';
import {weatherCountries} from '../constants/countries';

export const Weather = (): ReactElement => {
  const [city, setCity] = useState('Presidente Prudente');
  const [state, setState] = useState<any>({});
  const [weatherIconPath, setWeatherIconPath] = useState<string>('day/113.png');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(state);

    getWeather(city);

    console.log(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWeather = (city: string) => {
    setIsError(false);
    setIsLoading(true);
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=3495909d3601492a9d400039242702&q=${city}&aqi=no`;

    getWeatherData(apiUrl)
      .then(data => {
        setState(data);
        setWeatherIconPath(
          data.current.condition.icon.substr(
            '//cdn.weatherapi.com/weather/64x64/'.length,
          ),
        );
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);
        console.error('Failed to fetch data:', error);
      });
  };

  const renderSearch = () => {
    return (
      <>
        <Title>
          Qual cidade você quer <Bold>verificar a temperatura?</Bold>{' '}
        </Title>
        <SearchWrapper>
          <SearchInput onChangeText={(value: string) => setCity(value)} />
          <TouchableOpacity onPress={() => getWeather(city)}>
            <Image source={require('../../../assets/images/search.png')} />
          </TouchableOpacity>
        </SearchWrapper>
      </>
    );
  };

  const renderLocationWeather = () => {
    return (
      <CityWrapper>
        <LocationWrapper>
          <SearchLabel>Última pesquisa</SearchLabel>
          <CityName numberOfLines={1}>{state?.location?.name}</CityName>
          <CountryName numberOfLines={1}>
            {weatherCountries[state?.location?.country]}
          </CountryName>
        </LocationWrapper>
        <Image source={require('../../../assets/images/pin.png')} />
      </CityWrapper>
    );
  };

  const renderWeatherInfo = () => {
    return (
      <TemperatureWrapper>
        <Image
          style={{width: 80}}
          //@ts-ignore
          source={weatherImagePath[weatherIconPath]}
        />
        <Temperature>{state?.current?.temp_c + 'º'}</Temperature>
        <StatusWeather>
          {weatherConditions[state?.current?.condition?.text]}
        </StatusWeather>
      </TemperatureWrapper>
    );
  };

  const renderWeatherSubInfo = () => {
    return (
      <WeatherSubInfoWrapper>
        {weatherSubInfo(state.current).map(item => (
          <WeatherSubInfoTextWrapper>
            <WeatherSubInfoMessage>{item.message}</WeatherSubInfoMessage>
            <WeatherSubInfoTitle>{item.label}</WeatherSubInfoTitle>
          </WeatherSubInfoTextWrapper>
        ))}
      </WeatherSubInfoWrapper>
    );
  };

  const renderWeatherDetails = () => {
    return (
      <>
        <WeatherDetailsWrapper>
          <WeatherDetailsTitle>Detalhes:</WeatherDetailsTitle>
          <TouchableOpacity onPress={() => setIsDetailsOpen(!isDetailsOpen)}>
            {isDetailsOpen ? (
              <Image
                source={require('../../../assets/images/chevron-up.png')}
              />
            ) : (
              <Image
                source={require('../../../assets/images/chevron-down.png')}
              />
            )}
          </TouchableOpacity>
        </WeatherDetailsWrapper>
        {isDetailsOpen && (
          <FlatList
            data={weatherDetails(state?.current)}
            renderItem={({item}) => renderDetailsList(item)}
          />
        )}
      </>
    );
  };

  const renderDetailsList = (item: {label: string; message: any}) => {
    return (
      <WeatherDetailsWrapper>
        <WeatherSubInfoTitle>{item.label}</WeatherSubInfoTitle>
        <SemiDivider />
        <WeatherSubInfoMessage>{item.message}</WeatherSubInfoMessage>
      </WeatherDetailsWrapper>
    );
  };

  const renderNotFindWeather = () => {
    return (
      <NotFindCityWrapper>
        <Image source={require('../../../assets/images/face.png')} />
        <NotFindCityMessage>Cidade não encontrada</NotFindCityMessage>
      </NotFindCityWrapper>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Container>
          <Wrapper>{renderSearch()}</Wrapper>
          {isLoading ? (
            <Loading animating={isLoading} />
          ) : (
            <>
              <WeatherInfoWrapper>
                {!isError ? (
                  <>
                    {renderLocationWeather()}
                    {renderWeatherInfo()}
                    <Divider />
                    {renderWeatherSubInfo()}
                    <Divider />
                    {renderWeatherDetails()}
                  </>
                ) : (
                  <>{renderNotFindWeather()}</>
                )}
              </WeatherInfoWrapper>
            </>
          )}
        </Container>
      </SafeAreaView>
    </>
  );
};
