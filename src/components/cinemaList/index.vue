<template>
  <div class="cinema-wrapper"
       v-show="cinemaList.length">
    <router-link :to="{name: 'shows', params: {id: cinema.id}}"
                 class="cinema-info"
                 v-for="(cinema) in cinemaList"
                 :key="cinema.id">
      <div class="cinema-title">
        <p class="ellipsis">{{cinema.nm}}</p>
        <span class="price">
          {{cinema.sellPrice}}
          <span>元起</span>
        </span>
      </div>
      <div class="cinema-address">
        <p class="cinema-address-info ellipsis">{{cinema.addr}}</p>
        <span class="distance">{{cinema.distance}}</span>
      </div>
      <div class="cinema-label ellipsis"></div>
      <div class="cinema-discount ellipsis"
           v-if="cinema.promotion.cardPromotionTag">
        <span class="cinema-discount-label">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
               alt />
        </span>
        {{cinema.promotion.cardPromotionTag}}
      </div>
    </router-link>
  </div>
</template>

<script >
export default {
  name: 'cinema-list',
  props: {
    cinemaList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
.cinema-wrapper {
  padding: 0 15px;
  background: #fff;
}
.cinema-info {
  display: block;
  padding: 13px;
  padding-left: 0;
  border-bottom: 1px solid #e9e9e9;
}
.cinema-title {
  display: flex;
  height: 23px;
  line-height: 23px;
  font-size: 16px;
  color: #000;
  .price {
    margin-top: 2px;
    padding-left: 4px;
    color: #f03d37;
    font-size: 20px;
    span {
      font-size: 12px;
    }
  }
}
.cinema-address {
  display: flex;
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}
.cinema-address-info {
  flex: 1;
}
.cinema-discount {
  color: #999;
  margin-bottom: 4px;
  font-size: 12px;
  .cinema-discount-label {
    display: inline-block;
    width: 15px;
    height: 14px;
    position: relative;
    top: 3px;
    img {
      width: 100%;
    }
  }
}
</style>
