cd ..
git subtree pull --prefix shared/convolo-core https://github.com/convolo/convolo-core-shared main --squash
git subtree pull --prefix shared/convolo-icallback-js https://github.com/convolo/convolo-icallback-js-shared main --squash

git push
PAUSE >NUL 