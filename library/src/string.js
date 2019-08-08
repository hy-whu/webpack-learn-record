import _ from 'lodash'

function join(a, b){
  return _.join([a,b,'-'])
}

module.exports = {
  join
}