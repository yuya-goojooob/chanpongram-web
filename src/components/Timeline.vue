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
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card
  }
})
export default class Timeline extends Vue {
  @Prop() private cards!: any;
}

</script>
