# Archival Acid Test 2.0
Good Luck
## TESTS

### Iframes
- Load pages from another/same domain on HTTP and HTTPS
- Load pages from another/same domain on HTTP and HTTPS and use iframe page to load resources for parent page
- Load page from another/same domain on HTTP and HTTPS and use it to request another html page and rewrite links the requested page to work in parent

[Unarchivable via Internet Archive](http://web.archive.org/web/20170519051421/http://www.cs.odu.edu/~jberlin/funtimes2/)

[Original](http://www.cs.odu.edu/~jberlin/funtimes2/)

### Document.domain
- Set document.domain

### Document.cookie
- Anything to do with cookies will brick everyone!

### Service Worker
- Only HTTPS
- Can communicate with page its working with. postMessage maybe rewritten :stuck_out_tongue_closed_eyes:
- Foreign fetch 
- Intercept requests and rewrite to lw

https://n0tan3rd.github.io/replay_test/

### Fetch API
The fetch api will hit CORS almost all the time
- Request requiring auth
- Request to another domain on same parent domain that would require CORS negotitation
- Request for content type that would require CORS negotitation
- Fetch in general

### HTTP/1.1 and HTTP/2 with HTTPS Tests
- Requests for GET
- Requests for POST
- Requests for HEAD
- Requests for OPTIONS
- Requests for PUT
- Requests for DELETE
- Requests for PATCH
- Bearer auth
- Cookie auth

### Websockets
- Enough said

### React/Angular/Vue/Elm Test
[Replay test with React](https://n0tan3rd.github.io/replay_test/) for [2017-03-09: A State Of Replay or Location, Location, Location](http://ws-dl.blogspot.com/2017/03/2017-03-09-state-of-replay-or-location.html)
https://n0tan3rd.github.io/replay_test/
