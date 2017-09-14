import React from 'react'

const failFishes = [
  'aHR0cHM6Ly9zLW1lZGlhLWNhY2hlLWFrMC5waW5pbWcuY29tL29yaWdpbmFscy85My9kNi80NC85M2Q2NDQ1ZmIwNWFkNDZhZjZlZTFkYjA3Y2QxMTNkYS5qcGc=',
  'aHR0cHM6Ly90aHVtYjEuc2h1dHRlcnN0b2NrLmNvbS9kaXNwbGF5X3BpY193aXRoX2xvZ28vNDM2MTE0LzU0NzQ5MzA5OC9zdG9jay12ZWN0b3ItZmFpbC1zdGFtcC1yZWQtcm91bmQtZ3J1bmdlLXZpbnRhZ2UtZmFpbC1zaWduLTU0NzQ5MzA5OC5qcGc=',
  'aHR0cDovL2Nkbi5lYmF1bXN3b3JsZC5jb20vbWVkaWFGaWxlcy9waWN0dXJlLzc0MjY2MC84MTA4MTMyMi5qcGc=',
  'aHR0cDovL3QxMi5kZXZpYW50YXJ0Lm5ldC9WVmlBQS1uNzlGZEtZTVlGUEQ5UGhmMFVqUEk9L2ZpdC1pbi83MDB4MzUwL2ZpbHRlcnM6Zml4ZWRfaGVpZ2h0KDEwMCwxMDApOm9yaWdpbigpL3ByZTExL2JlOTgvdGgvcHJlL2YvMjAxMC8wNDgvNi81L2ZhaWxfZmlzaF9ieV93dGhhdC5qcGc=',
  'aHR0cHM6Ly9tZWRpYS5naXBoeS5jb20vbWVkaWEvVXlsMVZSbUJDUGlyNi9naXBoeS5naWY=',
  'aHR0cDovL3MyLnF1aWNrbWVtZS5jb20vaW1nLzYxLzYxMmMyYTQxOTYzYzc3OWEwNDc3YzZkNWI5MTk1OWEzNmFiMmIzNTFkOWQxMTdmMTk1NjRkMDRmYzYzMTI3YzcuanBn'
]

let failCounter = 0

export default function Fail () {
  let failSauce = failCounter
  failCounter += 1
  if (failCounter === failFishes.length) {
    failCounter = 0
  }
  return (
    <div>
      <p>Zombie For You!</p>
      <img
        src={atob(failFishes[failSauce])} />
    </div>
  )
}
