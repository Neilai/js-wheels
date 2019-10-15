// const store = createStore(counter,initialState,applyMiddleware(thunk, arrThunk))
// const store = applyMiddleware(...middlewares)(createStore)(reducer, initialState)
export function createStore (reducer, enhancer) {
  if (enhancer) {
    /*
    enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
    */
    return enhancer(createStore)(reducer)
    //  return applymiddleware(thunk)(createStore)(reducer)
  }
  let currentState = {}
  let currentListeners = []
  function getState () {
    return currentState
  }
  function subscribe (listener) {
    currentListeners.push(listener)
  }
  function dispatch (action) {
    currentState = reducer(currentState, action) //  reducer 里面 switch判断  action为传入的type
    currentListeners.forEach(v => { //  里面每个监听的函数 都执行一次
      v()
    })
    return action
  }
  //  初次调用的时候 首先执行一次 dispatch
  dispatch({ type: '@@redux/firstTime' })
  return { getState, subscribe, dispatch }
}

//  工具函数  这个函数的作用是为了让creator函数里面的参数进行透传
/*
    addGun(参数)
    dispatch(addGun(参数))
 */
function bindActionCreator (creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

//  bindActionCreators
//   {addGun, removeGun, addGunAsync}  就是形式参数 creators
export function bindActionCreators (creators, dispatch) {
  let bound = {}
  Object.keys(creators).forEach((fnKey, index) => {
    let creator = creators[fnKey]
    bound[fnKey] = bindActionCreator(creator, dispatch)
  })
  return bound
  /*
    还可以采用另外一种写法
     return Object.keys(creators).reduce((ret,item)=>{
       ret[item] = bindActionCreator(creators[item],dispatch)
        return ret
    },{})
     */
}
//  中间件机制
export function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    let midApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    let middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch) //  使dispatch 拥有了中间件的功能
      return {
      ...store,
      dispatch
    }
  }
}

function compose (...fns) {
  if (fns.length === 0) {
    return args => args
  }
  if (fns.length === 1) {
    return fns[0]
  }
  // return fns.reduce((ret, item) => (...args) => ret(item(...args)))
  return fns.reduce((ret, item) => (...args) => {
    //  ...args ==>> store.dispatch的这个方法
    /*
    //假设
    middleChain = [a,b,c]
    dispatch = compose(...middlewareChain)(store.dispatch) = compose(a,b,c)(store.dispatch)
    // 那么这个函数在compose中 就被拆解为
    dispatch = compose(a(b(c)))(store.dispatch)

    */
    return ret(item(...args))
  })
}
