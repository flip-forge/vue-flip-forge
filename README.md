# vue-flip-forge

## Install

```shell
npm install @flip-forge/vue-flip-forge
```

## Basic usage

The simplest usage is to pass vue-flip-forge a list of page URLs. The component
will try to fill the entire container it is placed in, so make sure it has a
height set. Otherwise, it will have 0 height;

- Using Composition API:

  ```vue
  <script setup>
  import "@flip-forge/vue-flip-forge/dist/style.css";
  import FlipForge from "@flip-forge/vue-flip-forge";

  const pages = [
    "https://picsum.photos/seed/vue-flip-forge-1/768/400",
    "https://picsum.photos/seed/vue-flip-forge-2/768/400",
    "https://picsum.photos/seed/vue-flip-forge-3/768/400",
    "https://picsum.photos/seed/vue-flip-forge-4/768/400",
    "https://picsum.photos/seed/vue-flip-forge-5/768/400",
    "https://picsum.photos/seed/vue-flip-forge-6/768/400",
  ];
  </script>

  <template>
    <div style="height: 100vh">
      <flip-forge :pages="pages" />
    </div>
  </template>
  ```

- Using Options API:

  ```vue
  <script>
  import "@flip-forge/vue-flip-forge/dist/style.css";
  import FlipForge from "@flip-forge/vue-flip-forge";

  export default {
    components: { FlipForge },
    data() {
      return {
        pages: [
          "https://picsum.photos/seed/vue-flip-forge-1/768/400",
          "https://picsum.photos/seed/vue-flip-forge-2/768/400",
          "https://picsum.photos/seed/vue-flip-forge-3/768/400",
          "https://picsum.photos/seed/vue-flip-forge-4/768/400",
          "https://picsum.photos/seed/vue-flip-forge-5/768/400",
          "https://picsum.photos/seed/vue-flip-forge-6/768/400",
        ],
      };
    },
  };
  </script>

  <template>
    <div style="height: 100vh">
      <flip-forge :pages="pages" />
    </div>
  </template>
  ```

## Keeping track of the current page

By using `v-model` on the component, you can keep track of the currently active
page, or change what page is currently viewed.
For example, to keep a route query in sync with the current page:

```vue
<script setup>
import "@flip-forge/vue-flip-forge/dist/style.css";
import FlipForge from "@flip-forge/vue-flip-forge";
import { useRouteQuery } from "@vueuse/router";

const pages = [
  // Include pages here
];
const activePage = useRouteQuery("page", "0", { transform: Number });
</script>

<template>
  <div style="height: 80vh">
    <flip-forge v-model="activePage" :pages="pages" />
  </div>
</template>
```

## Props

### modelValue

Bind the active page to this value.

### pages (required)

List of URLs. The images to display as a flipbook.

### lowResPages

List of URLs. Lower resolution versions of the images. These will be loaded
before the higher resolution versions. The main images will be loaded on top
of these, making the loading smoother.

### width

Set to the width of the image, NOT the width of the component. Must be set to
make proper use of the low resolution images.

### height

Set to the height of the image, NOT the height of the component. Must be set to
make proper use of the low resolution images.

### downloadUrl

If set, add a simple download link in the top of the component. You must provide
the actual download link and content, it will not be generated automatically.

### options

Object to enable/disable/adjust various options. Default values:

```js
const defaultOptions = {
  // Enable navigation via keyboard
  keyboardNavigation: true,
  // Enable navigation via clicking on pages
  clickNavigation: true,
  // Enable navigation via scroll wheel
  wheelNavigation: true,
  // Enable toolbar
  toolbar: true,
  // Screen width where the component switches to single page mode
  singlePageMode: 768,
  // Enable attribution link
  attribution: true,
  // Change theme colors
  theme: {
    "--background": "#000",
    "--toolbarColor": "#fff",
  },
};
```
