<template>
  <div id="clock">
    <div class="date-wrap">
      <div class="time">
        <span>{{ time }}</span>
        <span class="ml-5px inline-block w-15px text-14px font-bold">{{
          seconds
        }}</span>
        <span class="ml-5px">{{ ampm }}</span>
      </div>
      <div class="date">
        {{ date }}
      </div>
    </div>
    <div class="layout-topbar-logo-container">
      <div class="logo-fdn">
        <span>F</span>
        <span>D</span>
        <span>N</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat, useIntervalFn } from '@vueuse/core'

const date: Ref = ref()
const time: Ref = ref()
const ampm: Ref = ref()
const seconds: Ref = ref()

function updateDate() {
  date.value = ref(
    useDateFormat(new Date(), 'dddd DD/MM/YYYY', { locales: 'es-Es' }).value,
  )
  time.value = ref(
    useDateFormat(new Date(), 'hh:mm', { locales: 'es-Es' }).value,
  )
  ampm.value = ref(
    useDateFormat(new Date(), 'a', { locales: 'es-Es' }).value,
  )
}
updateDate()
useIntervalFn(() => {
  seconds.value = useDateFormat(new Date(), 'ss', { locales: 'es-Es' }).value
  if (seconds.value == '00') {
    updateDate()
  }
}, 1000)
</script>
<style scoped>
#clock {
  position: fixed;
  left: 50%;
  margin-left: -100px;
  width: 150px;
  height: calc(var(--topbar) - 0.6rem);
  position: absolute;
  border-radius: 90%;
  /* background-color: var(--surface-0); */
  /* background-color: var(--color-yellow-50); */
  color: var(--surface-800);
  display: flex;
  align-items: center;
  justify-content: center;

  &>.date-wrap {
    font-weight: 600;
    position: absolute;
    display: grid;
    align-content: center;
    justify-content: center;
    z-index: 20;
    padding-bottom: 5px;
    width: 200px;
    color: var(--surface-600);

    &>.time {
      text-align: center;
      font-size: 1.5rem;
      z-index: 20;

      &>span:nth-child(1) {
        letter-spacing: 0.2em;
      }

      &>span:nth-child(2) {
        margin-right: 3px;
      }
    }

    &>.date {
      font-weight: 600;
      z-index: 20;
      text-align: center;
      letter-spacing: 0.1em;
      text-transform: capitalize;
      font-size: 0.8rem;
      font-family: monospace;
    }
  }

  &>.layout-topbar-logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    z-index: 10;

    &>.logo-fdn {
      /* opacity: 0.5; */
      transition: color 0.2s;
      color: var(--surface-200);
      font-size: 90px;
      font-weight: 400;
      font-family: "diplomata-sc-regular";

      &>span:nth-child(2) {
        margin: 0 15px;
      }
    }
  }
}
</style>
