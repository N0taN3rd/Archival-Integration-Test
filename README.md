# Archival Acid Test 2.0
Good Luck
## TESTS

### Iframes
- Load pages from another/same domain on HTTP and HTTPS
- Load pages from another/same domain on HTTP and HTTPS and use iframe page to load resources for parent page
- Load page from another/same domain on HTTP and HTTPS and use it to request another html page and rewrite links the requested page to work in parent

[Unarchivable via Internet Archive](http://web.archive.org/web/20170519051421/http://www.cs.odu.edu/~jberlin/funtimes2/), [Original](http://www.cs.odu.edu/~jberlin/funtimes2/)

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
- Requests using GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH
- Bearer, Cookie auth
- Long redirection chains requiring jumps between HTTP and HTTPS
- Long redirection chains requiring jumps between HTTP and HTTPS with auth

### Websockets
- Enough said

### Meta Refresh
- Want Them Zombies [Gr Ar](http://ws-dl.blogspot.ca/2012/10/2012-10-10-zombies-in-archives.html)

### React/Angular/Vue/Elm Test
[Replay test with React](https://n0tan3rd.github.io/replay_test/) for [2017-03-09: A State Of Replay or Location, Location, Location](http://ws-dl.blogspot.com/2017/03/2017-03-09-state-of-replay-or-location.html)
https://n0tan3rd.github.io/replay_test/

### JS Powered HTML Components (Not Web Components Or Custom Elements)
- See [distill](https://github.com/distillpub/template) and DHR [blog](http://blog.dshr.org/2017/05/distill-is-this-what-journals-should.html)

### JS Powered HTML Custom Elements (Not Web Components)
- See [custom elements](https://www.chromestatus.com/feature/4696261944934400)

### Web Components
- [Polymer](https://www.polymer-project.org/)
- Use `<link rel="import" href="some-component.html" />`

### Set Storage
- Pywb/Webrecorder have issues with this

### Hidden URLs :feelsgood:
- base64 btoa, atob
- URLs as text in `a,p,div` tags
- URLS in char arrays
- URLS in link tags in body and head
- URLS in link header from archive

### three.js
- https://threejs.org/

### Eval
- Pywb/Webrecorder can not handle so will brick them hard. Something something Iframes??
- Eval iframe with current URL as src heheehehehehe

### Videos
- Stresses Pywb/Webrecorder
- YT et al
