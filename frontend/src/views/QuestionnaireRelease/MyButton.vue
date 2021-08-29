<template>
  <div>
    <button class="button-3d-1">{{ Title }}</button>
  </div>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    Title: String
  }
}
</script>

<style scoped>
  .button-3d-1{
    position: relative;
    /*width: 100%;*/
    /*height: 100%;*/
    background: orangered;
    border: none;
    color: white;
    padding: 15px 24px;
    font-size: 1.4rem;
    outline: none;
    box-shadow: -6px 6px 0 hsl(16, 100%, 30%);
  }

  .button-3d-1::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: -6px;
    border: 6px solid transparent;
    border-right: 6px solid hsl(16, 100%, 30%);
    border-left-width: 0px;
  }

  .button-3d-1::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    bottom: -6px;
    right: 0;
    border: 6px solid transparent;
    border-top: 6px solid hsl(16, 100%, 30%);
    border-bottom-width: 0px;
  }

  .button-3d-1:active {
    background: hsl(16, 100%, 40%);
    top: 3px;
    left: -3px;
    box-shadow: -3px 3px 0 hsl(16, 100%, 30%);
  }
  .button-3d-1:active::before {
    border: 3px solid transparent;
    border-right: 3px solid hsl(16, 100%, 30%);
    border-left-width: 0px;
    left: -3px;
  }

  .button-3d-1:active::after {
    border: 3px solid transparent;
    border-top: 3px solid hsl(16, 100%, 30%);
    border-bottom-width: 0px;
    bottom: -3px;
  }

</style>