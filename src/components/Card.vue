<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey">
          <v-img :src="userIcon"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{username}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-divider></v-divider>
    
    <v-img
      :src="imagePath"
      height="300"
    ></v-img>
    
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn icon>
        <v-icon :color="heartColor">{{heartIcon}}</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-comment-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-btn icon @click="goOtherPage(map)">
        <v-icon>mdi-map-outline</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-text>
        <p style="font-size:10pt">{{goodCount}}いいね！</p>
        <div>{{comment}}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';


@Component
export default class Card extends Vue {

    @Prop() private imagePath!: string;
    @Prop() private username!: string;
    @Prop() private userIcon!: string;
    @Prop() private comment!: string;
    @Prop() private goodCount!: number;
    @Prop() private map!: string;

    
    goOtherPage(path: string) {
        //window.location.href = path; // 通常の遷移
        window.open(path, '_blank'); // 新しいタブを開き、ページを表示
    }

    get heartColor():string{
      return this.goodCount > 0 ? "red" : "gray";
    }

    get heartIcon():string{
      return this.goodCount > 0 ? "mdi-heart" : "mdi-heart-outline";
    }
}
</script>

<style lang="less" scoped>
</style>
