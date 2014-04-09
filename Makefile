ISTANBUL = node_modules/.bin/istanbul
SEMVER = node_modules/.bin/semver
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


.PHONY: release-patch release-minor release-major
VERSION = $(shell node -p 'require("./package.json").version')
release-patch: NEXT_VERSION = $(shell $(SEMVER) -i patch '$(VERSION)')
release-minor: NEXT_VERSION = $(shell $(SEMVER) -i minor '$(VERSION)')
release-major: NEXT_VERSION = $(shell $(SEMVER) -i major '$(VERSION)')

release-patch release-minor release-major:
ifneq ($(shell git rev-parse --abbrev-ref HEAD),master)
	$(error Releases must be published from the master branch)
endif
	@printf 'Current version is $(VERSION). This will publish version $(NEXT_VERSION). Press [enter] to continue.' >&2
	@read
	node -e '\
		var o = require("./package.json"); o.version = "$(NEXT_VERSION)"; \
		require("fs").writeFileSync("./package.json", JSON.stringify(o, null, 2) + "\n")'
	git commit --message '$(NEXT_VERSION)' -- package.json
	git tag --annotate '$(NEXT_VERSION)' --message '$(NEXT_VERSION)'
	git push origin refs/heads/master 'refs/tags/$(NEXT_VERSION)'
	npm publish


.PHONY: setup
setup:
	npm install


.PHONY: test
test:
	$(ISTANBUL) cover node_modules/.bin/_mocha -- --compilers coffee:coffee-script/register
