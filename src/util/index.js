
// 设置图片尺寸
export const setSize = (img) => (size) => {
  return img.replace('w.h', size)
}

export const setSingleImgSize = (img, sizes = '128.180') => {
  return img.replace('w.h', sizes)
}

export const setImgSize = (list, sizes = '128.180') => {
  return list.map(item => {
    const img = setSingleImgSize(item.img, sizes)
    return { ...item, img }
  })
}

// 选择第一次加载数据，还是加载更多
// isFirst @type boolean
export const getDataByAction = (initAction, nextAction) => (isFirst) => isFirst ? initAction : nextAction

export const throttle = (func, timeout = 16) => {
  let timer = null; let context; let args
  return function () {
    context = this
    args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, timeout)
    }
  }
}
