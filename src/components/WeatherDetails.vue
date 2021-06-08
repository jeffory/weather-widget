<template>
  <div class="weather-details">
    <div v-if="weather">
      <h2>{{ weather.name }}</h2>
      <h3>{{ weather.main.temp }}°c</h3>

      <img
        :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        :alt="`Weather forecast is ${weather.weather[0].main}`"
        style="height: 100px; width: 100px;"
      >
    </div>

    <div
      class="text-small"
      v-else
    >
      Loading...
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';
import { OpenWeatherResponse } from '@/declarations/interfaces/OpenWeatherMap.interface';

export default defineComponent({
  name: 'WeatherDetails',
  props: {
    details: OpenWeatherResponse,
  },
  setup(props) {
    const { details } = toRefs(props);

    return {
      weather: details,
    };
  },
});
</script>

<style lang="scss">
  .weather-details {
    border: 1px solid #fff;
    border-radius: 6px;
    margin-top: 1em;
    padding: 1em;
  }
</style>
