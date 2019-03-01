import axios from 'axios'
import request from '@/util/request'
import { getDataByAction } from '@/util'

/**
 *  获取城市列表
 */

export const getCityList = () => axios.get('/assets/json/cities.json')

/**
 *  首页
 */

// 正在热映
const getMovieOnInfoList = request('/movieOnInfoList')
const getMoreComingList = request('/moreComingList')
export const getInfoListAction = getDataByAction(getMovieOnInfoList, getMoreComingList)

// 即将上映
export const getMostExpected = request('/mostExpected')

const getInitComingList = request('/comingList')
const getmoreComingList = request('/moreComingList')
export const getComingListAction = getDataByAction(getInitComingList, getmoreComingList)
// 影院
export const getCinemaList = request('/cinemaList')
// 电影详情(cinema-movie)
export const getMovieDetail = request('/detailmovie')

// 过滤影院
export const getFilterCinemas = request('/filterCinemas')
// 电影播放的影院
export const postMovie = request('/movie', 'post')

// 搜索
export const getSearch = request('/search')
