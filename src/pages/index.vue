<script setup>
import { ref } from 'vue';
// eslint-disable-next-line import/extensions
import ColorPicker from 'primevue/colorpicker';

const { currentTheme, switchTheme } = useTheme();

const primaryColor = ref(getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#007ad9');
const textColor = ref(getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#000000');
const strokeColor = ref(getComputedStyle(document.documentElement).getPropertyValue('--color-stroke').trim() || '#000000');
let strokeToggle = false;

const updatePrimaryColor = () => {
  const value = primaryColor.value.startsWith('#') ? primaryColor.value : `#${primaryColor.value}`;
  document.documentElement.style.setProperty('--color-primary', value);
  document.getElementById('bgcolorhex').innerHTML = value;
};

const updateStrokeColor = () => {
  const value = strokeColor.value.startsWith('#') ? strokeColor.value : `#${strokeColor.value}`;
  document.documentElement.style.setProperty('--color-stroke', value);
  document.getElementById('textcolorhex').innerHTML = value;
};

const updateStrokeToggle = () => {
  if (!strokeToggle) {
    document.documentElement.style.setProperty('--stroke-width', '3px');
  } else {
    document.documentElement.style.setProperty('--stroke-width', '0px');
  }
  strokeToggle = !strokeToggle;
};

const updateTextColor = () => {
  const value = textColor.value.startsWith('#') ? textColor.value : `#${textColor.value}`;
  document.documentElement.style.setProperty('--color-text', value);
  document.getElementById('strokecolorhex').innerHTML = value;
};

// Initialize CSS variables on mount
// onMounted(() => {
// updatePrimaryColor();
// updateTextColor();
// });
</script>

<template>
  <header class="absolute inset-x-0 top-0">
    <div class="container mx-auto flex justify-between p-1">
      <div class="color-picker-container">
        <h3>BG Color: <span id="bgcolorhex" /></h3>
        <ColorPicker
          v-model="primaryColor"
          @change="updatePrimaryColor"
        />

        <h3>Text Color: <span id="textcolorhex" /></h3>
        <ColorPicker
          v-model="textColor"
          @change="updateTextColor"
        />

        <h3>Stroke Color: <span id="strokecolorhex" /></h3>
        <ColorPicker
          v-model="strokeColor"
          @change="updateStrokeColor"
        />
        <input type="checkbox" id="myCheckbox" v-model="isChecked" @change="updateStrokeToggle">
        <label for="myCheckbox">Toggle Stroke</label>
      </div>
    </div>
  </header>

  <main class="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-4 py-16">
    <h1 class="dark:text-primary text-primary text-stroke pb-20 text-center text-6xl transition-colors ">
      Stampy Stuff
    </h1>
    <h1 class="dark:text-primary text-primary pb-20 text-center text-4xl transition-colors ">
      Coming Soon
    </h1>

    <div class="flex justify-center space-x-4 pb-10" />
    <button
      class="overflow-hidden p-2"
      style="display: none;"
      @click="switchTheme()"
    >
      <transition
        enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-200 ease-in"
        :enter-from-class="currentTheme === 'dark' ? 'transform -translate-y-full scale-50 opacity-0' : 'transform translate-y-full scale-50 opacity-0'"
        enter-to-class="transform translate-y-0"
        leave-from-class="transform translate-y-0"
        :leave-to-class="currentTheme === 'dark' ? 'transform translate-y-full scale-50 opacity-0' : 'transform -translate-y-full scale-50 opacity-0'"
        mode="out-in"
      >
        <svg
          v-if="currentTheme === 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          class="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </transition>
    </button>
  </main>
</template>

<style>

.color-picker-container {
  display: flex;
  flex-direction: row !important;
  flex-direction: column;
  gap: 1rem;
  margin: .5rem;
}

.p-colorpicker-preview{
  border: black solid!important
}

body {
  @apply dark:bg-primary dark:text-primary;
  @apply bg-primary text-primary;
}
</style>
