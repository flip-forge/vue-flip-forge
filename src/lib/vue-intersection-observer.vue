<template>
  <div><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
export interface IntersectionObserverOptions {
  rootMargin: string;
  threshold: number | number[];
}

export type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

export default defineComponent({
  name: "VueIntersectionObserver",
  props: {
    callback: {
      type: Function as PropType<IntersectionObserverCallback>,
      required: true,
    },
    options: {
      type: Object as PropType<IntersectionObserverOptions>,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      observer: null as null | IntersectionObserver,
    };
  },
  watch: {
    options() {
      this.initObserver();
    },
  },
  mounted() {
    this.initObserver();
  },
  updated() {
    this.initObserver();
  },
  unmounted() {
    this.disconnectObserver();
  },
  methods: {
    initObserver() {
      this.disconnectObserver();
      this.observer = new IntersectionObserver(this.callback, {
        ...this.options,
        root: this.$el,
      });
      for (const el of this.$el.children) {
        this.observer.observe(el);
      }
    },
    disconnectObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
  },
});
</script>
