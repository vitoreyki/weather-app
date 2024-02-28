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
  SearchListContainer,
  SearchListInfoDivider,
  SearchListInfoLabel,
  SearchListInfoWrapper,
  SearchListWrapper,
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
import {currentWeatherApi, searchWeatherApi} from '../../../constants';
import {weatherCountries} from '../constants/countries';
import {weatherDetails, weatherSubInfo} from '../constants/data';
import {weatherConditions} from '../constants/weather-conditions';
import {weatherImagePath} from '../constants/weather-images';
import {Search, SearchWeather} from '../types/types';
import {getWeatherData} from '../utils/weather-api';

export const Weather = (): ReactElement => {
  const [city, setCity] = useState('');
  const [state, setState] = useState<any>({});
  const [weatherIconPath, setWeatherIconPath] = useState<string>('day/113.png');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SearchWeather | any>([]);

  useEffect(() => {
    getWeather('Presidente Prudente');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    searchCityWeather(city);
  }, [city]);

  const getWeather = (city: string) => {
    setIsError(false);
    setIsLoading(true);

    getWeatherData(currentWeatherApi(city))
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

  const searchCityWeather = (city: string) => {
    getWeatherData(searchWeatherApi(city))
      .then(data => {
        setSearchOptions(data);
      })
      .catch(error => {
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
          <SearchInput
            value={city}
            onChangeText={(value: string) => {
              setCity(value);
            }}
          />
          <TouchableOpacity onPress={() => getWeather(city)}>
            <Image source={require('../../../assets/images/search.png')} />
          </TouchableOpacity>
        </SearchWrapper>
      </>
    );
  };

  const renderSearchList = () => {
    return (
      <>
        {searchOptions.length !== 0 && (
          <SearchListContainer>
            <SearchListWrapper>
              <FlatList
                data={searchOptions}
                renderItem={({item, index}: {item: Search; index: number}) => (
                  <>
                    {renderSearchListInfo(item)}
                    {index !== searchOptions.length - 1 && (
                      <SearchListInfoDivider />
                    )}
                  </>
                )}
              />
            </SearchListWrapper>
          </SearchListContainer>
        )}
      </>
    );
  };

  const renderSearchListInfo = (item: Search) => {
    return (
      <SearchListInfoWrapper
        onPress={() => {
          setSearchOptions([]);
          setCity('');
          getWeather(item.name);
        }}>
        <SearchListInfoLabel>
          {item.name}, {item.country}
        </SearchListInfoLabel>
      </SearchListInfoWrapper>
    );
  };

  const renderLocationWeather = () => {
    return (
      <CityWrapper>
        <LocationWrapper>
          <SearchLabel>Última pesquisa</SearchLabel>
          <CityName numberOfLines={2}>{state?.location?.name}</CityName>
          <CountryName numberOfLines={1}>
            {
              //@ts-ignore
              weatherCountries[state?.location?.country] ??
                state?.location?.country
            }
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
          {
            // @ts-ignore
            weatherConditions[state?.current?.condition?.text]
          }
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
          {renderSearchList()}
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
