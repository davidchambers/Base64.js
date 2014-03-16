bin = node_modules/.bin


base64.min.js: base64.js
	@$(bin)/uglifyjs $< --compress --mangle > $@


.PHONY: bytes
bytes: base64.min.js
	@gzip --best --stdout $< | wc -c | tr -d ' '


.PHONY: clean
clean:
	@rm -rf node_modules
	@git checkout -- *.min.js


.PHONY: setup
setup:
	@npm install


.PHONY: test
test:
	@$(bin)/istanbul cover $(bin)/_mocha -- --compilers coffee:coffee-script
