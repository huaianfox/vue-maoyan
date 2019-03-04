<template>
  <router-link tag="div"
               :to="'/shows/'+cinema.id"
               class="cinema-item">
    <div class="info">
      <p class="name-price ellipsis">
        <span class="ellipsis">{{cinema.nm}}</span>
        <span class="sell-price">
          <span class="price">{{cinema.sellPrice}}</span>元起
        </span>
      </p>
      <p class="address ellipsis">{{cinema.addr}}</p>
      <my-tag :tag="tag"></my-tag>
      <div class="cinema-discount ellipsis"
           v-if="cinema.promotion && cinema.promotion.cardPromotionTag">
        <span class="cinema-discount-label">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
               alt />
        </span>
        {{cinema.promotion.cardPromotionTag}}
      </div>
    </div>
    <div class="distance">{{cinema.distance}}</div>
  </router-link>
</template>

<script >
import MyTag from '@/components/tag'
export default {
  name: 'CinemaItem',
  data () {
    return {
    }
  },
  computed: {
    tag () {
      return this.cinema.tag || this.cinema
    }
  },
  props: {
    cinema: Object
  },
  components: {
    MyTag
  }
}
</script>

<style scoped lang="scss">
.cinema-item {
  display: flex;
  padding: 15px 15px 15px 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
  .info {
    margin: 1px 0 0 15px;
    font-size: 16px;
    color: #000;
    margin-bottom: 6px;
    overflow: hidden;

    .name-price {
      display: flex;
      font-size: 16px;
      color: #000;
      margin-bottom: 6px;
    }
    .sell-price {
      font-size: 11px;
      color: #999;
      white-space: nowrap;
      margin-left: 10px;
    }
    .price {
      font-size: 17px;
      color: #ef4238;
    }
  }
  .address {
    font-size: 13px;
    color: #999;
  }
  .distance {
    font-size: 13px;
    color: #999;
  }
  .cinema-discount {
    color: #999;
    margin: 4px 0;
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
}
</style>
