function codeItem(code){

  let reg =  /(HP|SW|LP)\d{4}$/g
  let res = reg.test(code)
  if(res === false){
    return 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
  }

}

module.exports = codeItem
