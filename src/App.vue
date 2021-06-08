<template>
  <h1>Weather widget</h1>

  <p class="text-small">
    Leave blank for auto detection or select a city from the dropdown:
  </p>

  <select
    v-model="selectedLocation"
    class="select"
  >
    <option
      :value="-1"
    />
    <option
      v-for="(city, index) in cities"
      :key="`city-${index}`"
      v-text="city.name"
      :value="city.id"
    />
  </select>

  <WeatherDetails :details="weatherDetails" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { GeoLocation } from '@/services/GeoLocation';
import { OpenWeatherMap } from '@/services/OpenWeatherMap';
import WeatherDetails from '@/components/WeatherDetails.vue';
import { cities } from '@/data/cities.data';
import { OpenWeatherResponse } from '@/declarations/interfaces/OpenWeatherMap.interface';

export default defineComponent({
  name: 'App',
  components: {
    WeatherDetails,
  },
  setup() {
    const openWeatherMap = new OpenWeatherMap();
    const selectedLocation = ref(-1);
    const status = ref('Loading...');
    const weatherDetails = ref<OpenWeatherResponse|null>(null);

    const selectedLocationChanged = (newValue: number): void => {
      if (newValue < 0) {
        // Reset the view
        weatherDetails.value = null;

        GeoLocation.locateUser
          .then((position) => {
            openWeatherMap.weatherByCoords(position.coords)
              .then((weather) => { weatherDetails.value = weather; })
              .catch(() => { status.value = 'Error loading the weather, please try reloading the page.'; });
          })
          .catch(() => {
            status.value = 'Error retrieving user location, please select a city from the dropdown.';
          });
      } else {
        // Reset the view
        weatherDetails.value = null;

        openWeatherMap.weatherByID(newValue)
          .then((weather) => { weatherDetails.value = weather; })
          .catch(() => { status.value = 'Error loading the weather, please try reloading the page.'; });
      }
    };

    selectedLocationChanged(selectedLocation.value);
    watch(selectedLocation, selectedLocationChanged);

    return {
      cities,
      selectedLocation,
      weatherDetails,
    };
  },
});
</script>

<style lang="scss">
  .select {
    border: 1px solid #fff;
    border-radius: 3px;
    margin-bottom: 1em;
    min-width: 200px;
    padding: .5em .75em;
  }
</style>
