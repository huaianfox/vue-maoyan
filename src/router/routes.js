import Layout from '@/pages/layout'
import Home from '@/pages/home'
import Hot from '@/pages/home/children/hot'

const _import = (file) => () => {
  let path = /(.*).\/(.+?)/.test(file) ? file : `${file}/index`
  return import(`@/pages/${path}.vue`)
}

// cinema/movie/:id
const cinemaMovie = {
  path: '/cinema/movie/:id',
  name: 'cinema_movie',
  component: _import('cinema_movie')
}

// Layout

const home = {
  path: '/',
  component: Home,
  children: [
    {
      path: '/',
      component: Hot
    },
    {
      path: '/release',
      component: _import('home/children/release')
    }
  ]
}

const cinema = {
  path: '/cinema',
  component: _import('cinema')
}

const movie = {
  path: '/movie/:id',
  name: 'movie',
  component: _import('movie')
}

const profile = {
  path: '/profile', component: _import('profile'), hidden: true
}

const layout = {
  path: '/',
  component: Layout,
  children: [
    home,
    cinema,
    profile
  ]
}

const login = {
  path: '/login',
  component: _import('login/index')
}

const city = {
  path: '/city-list',
  name: '/city-list',
  component: _import('city')
}

const search = {
  name: 'search',
  path: '/search',
  component: _import('search')
}

// 影院电影展示 cinema_id
const shows = {
  path: '/shows/:id',
  component: _import('shows'),
  meta: { navbarFixed: false }
}

// const home = {
//   path: '/',
//   name: 'home',
//   component: Home
// }

export default [
  layout,
  login,
  search,
  shows,
  cinemaMovie,
  city,
  movie
]
