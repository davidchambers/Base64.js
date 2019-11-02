ESLINT = node_modules/.bin/eslint --report-unused-disable-directives
ISTANBUL = node_modules/.bin/istanbul
UGLIFYJS = node_modules/.bin/uglifyjs
XYZ = node_modules/.bin/xyz --message X.Y.Z --tag X.Y.Z --repo git@github.com:davidchambers/Base64.js.git --script scripts/prepublish

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


.PHONY: lint
lint:
	@if [ $(shell node --version | tr -d v | cut -d . -f 1) -lt 6 ] ; then  \
	  echo 'ESLint requires a recent version of Node' ;                     \
	else                                                                    \
	  $(ESLINT)                                                             \
	    --config node_modules/sanctuary-style/eslint-es3.json               \
	    --global $$                                                         \
	    --global define                                                     \
	    --global exports                                                    \
	    --global module                                                     \
	    --global self                                                       \
	    --rule 'max-len: [off]'                                             \
	    --rule 'no-plusplus: [off]'                                         \
	    -- base64.js ;                                                      \
	  $(ESLINT)                                                             \
	    --config node_modules/sanctuary-style/eslint-es3.json               \
	    --env node                                                          \
	    --global describe                                                   \
	    --global it                                                         \
	    -- test/*.js ;                                                      \
	fi


.PHONY: release-major release-minor release-patch
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)


.PHONY: setup
setup:
	npm install


.PHONY: test
test:
	$(ISTANBUL) cover node_modules/.bin/_mocha -- --reporter spec
