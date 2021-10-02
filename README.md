
# peer-review

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


## Deploy Frontend to Github-Pages
*Use Personal git token as password*
[Frontend on Github-Pages](https://iprp.github.io/Peer-Review-Platform-Frontend/)
### Linux (tested)
Run [deploy.sh](https://github.com/IPRP/Peer-Review-Platform-Frontend/blob/pagesFix/deploy.sh)
```
sh deploy.sh
```
### Windows
```
npm run build
cd dist
cp index.html 404.html
git add dist
git commit -m "deploy dist"
git subtree push --prefix dist origin gh-pages
```


