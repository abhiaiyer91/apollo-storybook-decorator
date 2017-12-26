<template>
  <div class="apollo">
    <h3>Greetings from Apollo Storybook Decorator</h3>
    <p>
      Suh {{this.helloWorld}}
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      helloWorld: String,
    }
  }
</script>
