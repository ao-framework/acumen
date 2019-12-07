<template>
  <div @mouseenter="flip = true" @mouseleave="flip = false" :class="{ up }" class="elevate-logo">
    <div @click="triggerClick()" :class="{ flip, flash }" class="circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 163.53 145.72"
      >
        <path
          d="M188.57,140.67,122.27,255.5a15.45,15.45,0,0,0,13.38,23.17h132.6a15.44,15.44,0,0,0,13.37-23.17L215.33,140.67A15.45,15.45,0,0,0,188.57,140.67Z"
          :fill="outerColor"
          transform="translate(-120.18 -132.95)"
        />
        <path
          d="M185,171.64l-38.24,66.22a18.43,18.43,0,0,0,16,27.64h76.47a18.43,18.43,0,0,0,16-27.64L219,171.64A18.42,18.42,0,0,0,185,171.64Z"
          :fill="innerColor"
          transform="translate(-120.18 -132.95)"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import client from "client/client"
  @Component
  export default class ElevateLogo extends Vue {

    public client = client;

    public outerColor: string = "white";

    public innerColor: string = "deepskyblue";

    public flip: boolean = false;

    public get up() {
      return this.client.loading;
    }

    public get flash() {
      return this.client.loading;
    }

    public triggerClick() {
      if (this.$route.path !== "/") {
        this.client.reset();
        this.$router.push("/")
      }
    }

  }
</script>

<style lang="scss" scoped>
  @keyframes color {
    0% {
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    50% {
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    100% {
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  .elevate-logo {
    position: absolute;
    top: calc(1vh - 55px);
    left: calc(50% - 47.5px);
    transition: 0.5s;
    .circle {
      position: relative;
      border-radius: 50%;
      border: 4px solid rgb(7, 69, 99);
      background: rgb(7, 69, 99);
      background: radial-gradient(
        circle,
        rgba(7, 69, 99, 1) 0%,
        rgba(7, 12, 19, 1) 100%
      );
      height: 55px;
      width: 55px;
      padding: 16px;
      transition: 0.2s;
      svg {
        margin-top: -4px;
        transition: 0.5s;
        transform: rotate(0deg) translate(0px, 0px);
      }
      &.flash {
        background: none;
        animation-name: color;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        svg {
          top: 16px;
          transition: 0.5s;
          transform: rotate(180deg) translate(0px, -8px);
        }
      }
      &.flip {
        svg {
          top: 16px;
          transition: 0.5s;
          transform: rotate(180deg) translate(0px, -8px);
        }
      }
    }
    &.up {
      left: calc(50% - 75px - 50px);
      top: calc(51vh - 150px);
      .circle {
        border: 4px solid transparent;
        background: transparent;
        height: 150px;
        width: 150px;
        transition: 2s;
        padding: 50px;
        svg {
          margin-top: 10px;
        }
      }
    }
  }
</style>
