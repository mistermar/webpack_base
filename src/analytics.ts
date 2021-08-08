import * as $ from 'jquery'

function createAnalytics(): object{
  let count = 0
  let isDest: boolean = false

  const listener = (): number => count++

  $(document).on('click',listener)

  return {
    destroy(){
      $(document).off('click', listener)
      isDest = true
    },

    getClicks(){
      if(isDest){
        return 'anal is dest'
      }
     return count
    }
  }
}

window['analytics'] = createAnalytics()