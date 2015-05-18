test:
	npm test

build:
	babel index.js > build.js

.PHONY: test build