<template>
  <div
    class="flip-forge"
    :class="{ single: singlePageMode, book: !singlePageMode }"
    :style="Object(opts.theme ?? {})"
  >
    <vue-intersection-observer
      :callback="onIntersect"
      :options="{
        rootMargin: '0px',
        threshold: 0.6,
      }"
      class="flipbook"
      :class="{
        front: currentPage === startPage,
        back: currentPage === lastPage,
      }"
    >
      <div
        v-for="page in parsedPages"
        :key="page.number"
        class="page"
        :data-page="page.number"
        :style="{
          zIndex: lastPage - page.number,
        }"
        :class="{
          active:
            page.number === currentPage || page.number === currentPage + 1,
          behind: page.number > currentPage + 1,
          flipped: page.number < currentPage,
        }"
        @click="onPageClick(page.number)"
      >
        <img
          v-if="page.url"
          :src="page.url"
          alt=""
          draggable="false"
          loading="lazy"
        />
      </div>
    </vue-intersection-observer>
    <div v-if="opts.toolbar" class="toolbar">
      <div></div>
      <div>
        <chevron-double-left
          :class="{ disabled: currentPage <= startPage }"
          title="Go to start"
          @click="goStart"
        />
        <chevron-left
          :class="{ disabled: currentPage <= startPage }"
          title="Go back"
          @click="goPrevious"
        />
        <span>{{ currentPage }} / {{ lastPage }}</span>
        <chevron-right
          :class="{ disabled: currentPage === lastPage }"
          title="Go forward"
          @click="goNext"
        />
        <chevron-double-right
          :class="{ disabled: currentPage === lastPage }"
          title="Go to end"
          @click="goEnd"
        />
      </div>
      <div>
        <a v-if="downloadUrl" :href="downloadUrl" download="" title="Download">
          <cloud-alt-download />
        </a>
      </div>
    </div>
    <div v-if="opts.attribution" class="attribution">
      <a
        href="https://github.com/flip-forge/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>@flip-forge</span>
        <github-alt />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import CloudAltDownload from "@/lib/icons/cloud-alt-download.vue";
import ChevronDoubleLeft from "@/lib/icons/chevron-double-left.vue";
import ChevronLeft from "@/lib/icons/chevron-left.vue";
import ChevronRight from "@/lib/icons/chevron-right.vue";
import ChevronDoubleRight from "@/lib/icons/chevron-double-right.vue";
import VueIntersectionObserver from "@/lib/vue-intersection-observer.vue";
import GithubAlt from "@/lib/icons/github-alt.vue";
import type { FlipForgeOptions, FlipPage } from "@/lib/index";

const defaultOptions: FlipForgeOptions = {
  keyboardNavigation: true,
  clickNavigation: true,
  wheelNavigation: true,
  toolbar: true,
  singlePageMode: 768,
  attribution: true,
  theme: {
    "--background": "#000",
    "--toolbarColor": "#fff",
  },
};

export default defineComponent({
  components: {
    GithubAlt,
    VueIntersectionObserver,
    ChevronDoubleRight,
    ChevronRight,
    ChevronLeft,
    ChevronDoubleLeft,
    CloudAltDownload,
  },
  props: {
    modelValue: {
      type: Number,
      required: false,
      default: null,
    },
    pages: {
      type: Object as PropType<string[]>,
      required: true,
    },
    downloadUrl: {
      type: String,
      default: null,
    },
    options: {
      type: Object as PropType<FlipForgeOptions>,
      default: null,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      internalPage: 0,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    currentPage: {
      get(): number {
        return this.parsePageNumber(this.modelValue ?? this.internalPage);
      },
      set(value: number): void {
        if (
          typeof this.modelValue !== "undefined" &&
          this.modelValue !== null
        ) {
          this.$emit("update:modelValue", value);
        } else {
          this.internalPage = value;
        }
      },
    },
    parsedPages(): FlipPage[] {
      const result = [];

      if (!this.singlePageMode) {
        result.push({ url: "", number: 0 });
      }

      for (let i = 0; i < this.pages.length; i += 1) {
        result.push({
          url: this.pages[i],
          number: i + 1,
        });
      }

      return result;
    },
    startPage(): number {
      return this.singlePageMode ? 1 : 0;
    },
    lastPage(): number {
      return this.pages.length;
    },
    pageStep(): number {
      return this.singlePageMode ? 1 : 2;
    },
    opts() {
      return {
        ...defaultOptions,
        ...(this.options ?? {}),
      };
    },
    singlePageMode() {
      if (typeof this.opts.singlePageMode === "boolean") {
        return this.opts.singlePageMode;
      }
      return this.windowWidth <= (this.opts.singlePageMode ?? 0);
    },
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyboard);
    document.addEventListener("wheel", this.onWheel);
    window.addEventListener("resize", this.onResize);
  },
  unmounted() {
    document.removeEventListener("keyup", this.onKeyboard);
    document.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    scrollToPage(page: number) {
      const behavior =
        Math.abs(this.currentPage - page) > 1 ? "instant" : "smooth";
      this.$el.querySelector(`[data-page="${page}"]`)?.scrollIntoView({
        behavior,
        block: "center",
        inline: "center",
      });
    },
    parsePageNumber(value: string | number) {
      let page = Math.round(Number(value));
      // Only even number allowed if we are showing two
      // pages at a time
      page -= page % this.pageStep;
      // Clamp to limits
      page = Math.max(this.startPage, page);
      page = Math.min(this.lastPage, page);
      return page;
    },
    goStart() {
      this.jumpToPage(this.startPage);
    },
    goPrevious() {
      this.jumpToPage(
        Math.max(this.startPage, this.currentPage - this.pageStep),
      );
    },
    goNext() {
      this.jumpToPage(
        Math.min(this.lastPage, this.currentPage + this.pageStep),
      );
    },
    goEnd() {
      this.jumpToPage(this.lastPage);
    },
    jumpToPage(page: number) {
      if (this.singlePageMode) {
        this.scrollToPage(page);
      } else {
        this.currentPage = page;
      }
    },
    onPageClick(index: number) {
      if (!this.opts.clickNavigation || this.singlePageMode) return;

      if (index % 2 === 0) {
        this.goPrevious();
      } else {
        this.goNext();
      }
    },
    onKeyboard(event: KeyboardEvent) {
      if (!this.opts.keyboardNavigation) return;

      switch (event.code) {
        case "Escape":
        case "Home":
          this.goStart();
          break;
        case "KeyA":
        case "ArrowLeft":
          this.goPrevious();
          break;
        case "KeyD":
        case "ArrowRight":
          this.goNext();
          break;
        case "End":
          this.goEnd();
          break;
        default:
      }
    },
    onWheel(event: WheelEvent) {
      if (!this.opts.wheelNavigation) return;

      if (event.deltaY > 0) {
        this.goNext();
      } else {
        this.goPrevious();
      }
    },
    onIntersect(entries: IntersectionObserverEntry[]) {
      if (!this.singlePageMode) return;

      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        this.currentPage = this.parsePageNumber(
          (entry.target as HTMLElement).dataset.page ?? this.startPage,
        );
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
});
</script>

<style lang="scss">
.flip-forge {
  line-height: 1.6;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  position: relative;
  width: 100%;
  height: 100%;

  background: var(--background);

  &,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    font-weight: normal;
  }
}

.toolbar {
  position: absolute;
  top: 0.5rem;
  width: 100%;

  color: var(--toolbarColor);
  font-size: 48px;
  white-space: nowrap;

  display: grid;
  grid-template-columns: min-content 1fr min-content;

  align-items: center;
  justify-content: center;
  z-index: 9999;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 24px;
    font-weight: bold;
    padding: 0 16px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    user-select: none;
  }

  a,
  svg {
    display: block;
    cursor: pointer;
    color: var(--toolbarColor);
    text-decoration: none;
    user-select: none;

    &:hover {
      filter: invert(25%);
    }

    &.disabled {
      filter: invert(75%);
      pointer-events: none;
    }
  }
}

.flipbook {
  position: absolute;

  width: 100%;
  height: 100%;
  user-select: none;

  display: flex;

  -webkit-tap-highlight-color: transparent;
}

.flip-forge.single .toolbar {
  font-size: 32px;
}

.flip-forge.single .flipbook {
  gap: 0.5rem;

  overflow: auto;
  width: 100%;
  height: 100%;

  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .page {
    position: relative;

    flex: 1 0 100%;
    padding: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  img {
    width: 100%;
    min-width: 0;
    min-height: 0;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;

    pointer-events: none;
  }
}

.flip-forge.book .flipbook {
  justify-content: center;
  align-items: center;

  perspective: 3000px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;

  &.front {
    transform: translateX(-25%);
  }

  &.back {
    transform: translateX(25%);
  }

  img {
    width: 100%;
    height: auto;
    user-select: none;
  }

  .page {
    position: absolute;
    transition: transform 1s ease-in-out;
    width: 50%;
    height: auto;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    cursor: pointer;
  }

  .page:nth-child(odd) {
    left: 0;
    transform-origin: right;

    &.behind {
      transform: rotateY(180deg);
    }

    &.flipped {
      transform: translateZ(-1px);
    }
  }

  .page:nth-child(even) {
    right: 0;
    transform-origin: left;

    &.flipped {
      transform: rotateY(-180deg);
    }
  }
}

.attribution {
  position: absolute;
  bottom: 1em;
  right: 1em;
  color: var(--toolbarColor);
  filter: opacity(50%);
  font-size: smaller;

  a {
    display: flex;
    align-items: center;
    color: var(--toolbarColor);
    text-decoration: none;
    svg {
      margin: 0 0.5em;
    }
  }
}
</style>
