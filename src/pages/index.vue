<script setup>
import { ref } from 'vue';
// eslint-disable-next-line import/extensions
import ColorPicker from 'primevue/colorpicker';

const { currentTheme, switchTheme } = useTheme();
const isVisible = ref(true);
const primaryColor = ref(getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#007ad9');
const textColor = ref(getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#000000');
const strokeColor = ref(getComputedStyle(document.documentElement).getPropertyValue('--color-stroke').trim() || '#000000');
let strokeToggle = false;

// user-defined theme name
const themeName = ref('');

// object of saved themes
const savedThemes = reactive({});

// helper — ensures '#' prefix
function ensureHash(color) {
  return color.startsWith('#') ? color : `#${color}`;
}

// Save a theme
function saveTheme() {
  const name = themeName.value.trim();
  if (!name) return;
  savedThemes[name] = {
    primary: ensureHash(primaryColor.value),
    text: ensureHash(textColor.value),
    stroke: ensureHash(strokeColor.value),
  };
  localStorage.setItem('savedThemes', JSON.stringify(savedThemes));
  localStorage.setItem('lastTheme', name);
  themeName.value = '';
}

const updatePrimaryColor = () => {
  const value = primaryColor.value.startsWith('#') ? primaryColor.value : `#${primaryColor.value}`;
  document.documentElement.style.setProperty('--color-primary', value);
  document.getElementById('bgcolorhex').value = value;
};

const updateTextColor = () => {
  const value = textColor.value.startsWith('#') ? textColor.value : `#${textColor.value}`;
  document.documentElement.style.setProperty('--color-text', value);
  document.getElementById('textcolorhex').value = value;
};

const updateStrokeColor = () => {
  const value = strokeColor.value.startsWith('#') ? strokeColor.value : `#${strokeColor.value}`;
  document.documentElement.style.setProperty('--color-stroke', value);
  document.getElementById('strokecolorhex').value = value;
};

function applyColors() {
  const primary = primaryColor.value.startsWith('#') ? primaryColor.value : `#${primaryColor.value}`;
  const text = textColor.value.startsWith('#') ? textColor.value : `#${textColor.value}`;
  const stroke = textColor.value.startsWith('#') ? strokeColor.value : `#${strokeColor.value}`;
  document.documentElement.style.setProperty('--color-primary', primary);
  document.documentElement.style.setProperty('--color-text', text);
  document.documentElement.style.setProperty('--color-text', stroke);
}

// Delete a theme
function deleteTheme(name) {
  delete savedThemes[name];
  localStorage.setItem('savedThemes', JSON.stringify(savedThemes));
}

// Load a theme by name
function loadTheme(name) {
  const theme = savedThemes[name];
  if (!theme) return;
  primaryColor.value = theme.primary;
  textColor.value = theme.text;
  strokeColor.value = theme.stroke;
  applyColors();
  localStorage.setItem('lastTheme', name);
}

const updateStrokeToggle = () => {
  if (!strokeToggle) {
    document.documentElement.style.setProperty('--stroke-width', '3px');
  } else {
    document.documentElement.style.setProperty('--stroke-width', '0px');
  }
  strokeToggle = !strokeToggle;
};
// Initialize CSS variables on mount
onMounted(() => {
// updatePrimaryColor();
// updateTextColor();
  const stored = localStorage.getItem('savedThemes');
  if (stored) Object.assign(savedThemes, JSON.parse(stored));
});
</script>

<template>
  <header class="absolute inset-x-0 top-0">
    <button
        @click="isVisible = !isVisible"
        class="m-2 px-4 py-2 bg-gray-600 text-white rounded"
      >
        {{ isVisible ? 'Hide' : 'Show' }}
    </button>
    <div class="container mx-auto flex justify-between p-1">
      <div class="color-picker-container" v-show="isVisible">
        <div class="input-container">
          <h3>
            BG Color:
            <ColorPicker
              v-model="primaryColor"
              @change="updatePrimaryColor"
            />
          </h3>
          <input
            id="bgcolorhex"
            v-model="primaryColor"
            type="text"
            class="colorinput"
            @change="updatePrimaryColor"
          >
        </div>

        <div class="input-container">
          <h3>
            Text Color:
            <ColorPicker
              v-model="textColor"
              @change="updateTextColor"
            />
          </h3>
          <input
            id="textcolorhex"
            v-model="textColor"
            type="text"
            class="colorinput"
            @change="updateTextColor"
          >
        </div>
        <div class="input-container">
          <h3>
            Stroke Color:
            <ColorPicker
              v-model="strokeColor"
              @change="updateStrokeColor"
            />
          </h3>
          <input
            id="strokecolorhex"
            v-model="strokeColor"
            type="text"
            class="colorinput"
            @change="updateStrokeColor"
          >
        </div>
        <div class="input-container">
          <input type="checkbox" id="myCheckbox" v-model="isChecked" @change="updateStrokeToggle">
          <label for="myCheckbox">Toggle Stroke</label>
        </div>
        <div class="input-container">
        <input
          v-model="themeName"
          placeholder="Theme name"
          class="border p-1 rounded colorinput"
        >
        <button @click="saveTheme" :disabled="!themeName" class="px-4 py-2 bg-gray-900 text-white rounded">Save Theme</button>
        </div>
        <div class="input-container">
        <select v-model="selectedTheme" @change="loadTheme(selectedTheme)" class="colorinput">
          <option disabled value="">Select a theme</option>
          <option v-for="(theme, name) in savedThemes" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
        <button @click="deleteTheme(selectedTheme)" :disabled="!selectedTheme">
          🗑️
        </button>
        </div>
      </div>
    </div>
  </header>

  <main class="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-4 py-16">
    <img src="../assets/img/logo.png" alt="Stampy Stuff" class="w-80 md:w-80 lg:w-70"/>

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
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 100%;
  margin: .5rem;
}

.p-colorpicker-preview{
  border: black solid!important
}

.colorinput{
  width: 100%;
  background-color: transparent!important;
  border: var(--color-background) solid;

}

.input-container{
  max-width: 35%;
}

body {
  @apply dark:bg-primary dark:text-primary;
  @apply bg-primary text-primary;
}
</style>
