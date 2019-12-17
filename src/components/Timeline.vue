<template>
  <v-container>
    <v-sheet
      id="scroll-area-1"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">
        <Card 
            v-for="card in cards"
            :key="card.id"
            :imagePath="card.imagePath"
            :username="card.username"
            :userIcon="card.userIcon"
            :comment="card.comment"
            :goodCount="card.goodCount"
            :map="card.map"
          />
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue';

export default Vue.extend({
  name: 'HelloWorld',
  components: {
    Card,
  },
  props:['cards'],
});
</script>
