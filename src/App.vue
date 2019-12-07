<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <v-file-input
        prepend-icon="mdi-camera"
        @change="getFileName"
        >
        </v-file-input>
      </div>
      
      <v-spacer></v-spacer>
      <v-toolbar-title style="font-family: cursive;">Chanpongram</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <HelloWorld :cards="sortedCards"/>
    </v-content>

    <v-bottom-navigation
        v-model="bottomNav"
        absolute
        scroll-target="#scroll-area-1"
    >
      <v-btn value="recent">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn value="search">
        <v-icon>mdi-feature-search</v-icon>
      </v-btn>

      <v-btn value="plus">
        <v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import axios from 'axios';
import AzureStorage from 'azure-storage';

interface ChanponPrediction{
  probability: number;
  tagName: string;
}

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => (instaData),

  computed:{
    sortedCards: {
      get(){
        return instaData.cards.sort((a,b)=>{
            if(a.id < b.id){
              return 1;
            }
            else{
              return -1;
            }
          });
      }
    },
  },

  methods:{
    getFileName(e:any){
      console.log(e.name);

      // 本当はファイルをアップロードしたい

      const posturl = "https://chanpondb-ai-service.cognitiveservices.azure.com/customvision/v3.0/Prediction/d607731c-ea0f-4154-bd7b-b1458c65d423/classify/iterations/ChanPonGram_Iteration5/url";

      let config = {
        headers: {
          'Prediction-Key': '93d9f7e366c243b2911189628ace2ddf',
          'content-type': 'application/json'
        }
      };

      const rawFilename:string = e.name;
      const filename = rawFilename.split('.')[0];
      const imagePath = "https://chanpongram.blob.core.windows.net/images/" + filename + '.jpg';
      // alert("chanpon image: " + imagePath);
      axios
      .post(posturl, {"Url": imagePath}, config)
      .then(function(response) {
        const predctions:ChanponPrediction[] = response.data.predictions;
        const topPredction = predctions[0];
        const kind = topPredction.tagName.split(' ')[0];
        const shopName = topPredction.tagName.split(' ')[1];

        // response 処理
        console.log(response.status)
        const ids = instaData.cards.map(c=>c.id);
        var newId = Math.max(...ids) + 1;

        instaData.cards.push({
          id: newId,
          goodCount: 0,
          comment: shopName + '行ってきた！ #' + shopName + ' #' + kind,
          userIcon: '',
          username: 'おだ',
          imagePath: imagePath,
          map: 'https://chanpongram.z11.web.core.windows.net/map/?kind=' + kind + '&name=' + shopName 
        });

      })
      .catch(function(error) {
        // error 処理
      })
    }
  }
});

var instaData = {
    cards: [
      {
        id: 5,
        goodCount: 234,
        comment: 'リンガーハット行ってきた。 #ちゃんぽん #リンガーハット',
        userIcon: '',
        username: 'やまだ',
        imagePath: 'https://chanpongram.blob.core.windows.net/images/リンガーハット_山田.jpg',
        map: 'https://chanpongram.z11.web.core.windows.net/map/?kind=%E3%81%A1%E3%82%83%E3%82%93%E3%81%BD%E3%82%93&name=%E3%83%AA%E3%83%B3%E3%82%AC%E3%83%BC%E3%83%8F%E3%83%83%E3%83%88'      },
      {
        id: 2,
        goodCount: 12,
        comment: 'リンガーハット行ってきた。 #ちゃんぽん #リンガーハット',
        userIcon: '',
        username: 'よだ',
        imagePath: 'https://chanpongram.blob.core.windows.net/images/リンガーハット.jpg',
        map: 'https://chanpongram.z11.web.core.windows.net/map/?kind=%E3%81%A1%E3%82%83%E3%82%93%E3%81%BD%E3%82%93&name=%E3%83%AA%E3%83%B3%E3%82%AC%E3%83%BC%E3%83%8F%E3%83%83%E3%83%88'      },
      {
        id: 3,
        goodCount: 100000,
        comment: 'リンガーハット行ってきた。 #ちゃんぽん #リンガーハット',
        userIcon: '',
        username: 'えぐち',
        imagePath: 'https://chanpongram.blob.core.windows.net/images/リンガーハット小田.jpg',
        map: 'https://chanpongram.z11.web.core.windows.net/map/?kind=%E3%81%A1%E3%82%83%E3%82%93%E3%81%BD%E3%82%93&name=%E3%83%AA%E3%83%B3%E3%82%AC%E3%83%BC%E3%83%8F%E3%83%83%E3%83%88'      },
      {
        id: 4,
        goodCount: 123456789,
        comment: 'リンガーハット行ってきた。 #ちゃんぽん #リンガーハット',
        userIcon: '',
        username: 'ありき',
        imagePath: 'https://chanpongram.blob.core.windows.net/images/リンガーハット.jpg',
        map: 'https://chanpongram.z11.web.core.windows.net/map/?kind=%E3%81%A1%E3%82%83%E3%82%93%E3%81%BD%E3%82%93&name=%E3%83%AA%E3%83%B3%E3%82%AC%E3%83%BC%E3%83%8F%E3%83%83%E3%83%88'
      }
    ]
  };
</script>
