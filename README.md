# peer-review
## Test & Deploy
Bei jedem Push in diesem Repository, wird der Branch [*backend*](https://github.com/IPRP/Peer-Review-Platform-Frontend/tree/backend) auf dem [Jenkins Server](https://jenkins.dergeorg.at) gepulled und durch pm2 deployed, und mit selenium getestet. Falls ein Selenium test FAILED, wird der Build als unstable markiert.

[![Build Status](https://jenkins.dergeorg.at/buildStatus/icon?job=InnoFrontend)](https://jenkins.dergeorg.at/job/InnoFrontend/)
[Zur App](https://iprp.dergeorg.at)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
