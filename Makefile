ISTANBUL = node_modules/.bin/istanbul
UGLIFYJS = node_modules/.bin/uglifyjs

SRC = base64.js
MIN = $(patsubst %.js,%.min.js,$(SRC))


.PHONY: all
all: $(MIN)

%.min.js: %.js
	$(UGLIFYJS) $< --compress --mangle > $@


.PHONY: bytes
bytes: base64.min.js
	gzip --best --stdout $< | wc -c | tr -d ' '


.PHONY: clean
clean:
	rm -f -- $(MIN)


.PHONY: setup
setup:
	npm install


.PHONY: test
test:
	$(ISTANBUL) cover node_modules/.bin/_mocha -- --compilers coffee:coffee-script
