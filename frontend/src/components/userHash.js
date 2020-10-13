import React from "react"

import CryptoJS from "crypto-js"
//https://cryptojs.gitbook.io/docs/#documentation


export function userHash(key){
  if (key) {
    const userHashKey = CryptoJS.SHA3(key, { outputLength: 512 })
    localStorage.setItem('userHashKey', userHashKey.toString(CryptoJS.enc.Base64))
    return true
  } else {
    localStorage.setItem('userHashKey', null)
  }
}


export function userEncrText(text){
  const userHashKey = localStorage.getItem('userHashKey');
  var  encr_message = CryptoJS.AES.encrypt(text, userHashKey).toString()
  return encr_message

}


export function userDecrText(text){
  const userHashKey = localStorage.getItem('userHashKey');
  var  decr_message = CryptoJS.AES.decrypt(text, userHashKey).toString(CryptoJS.enc.Utf8)
  return decr_message
}
