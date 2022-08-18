RELEASE ?= dev

.PHONY: build

run:
	@sudo docker build -t localhost:32000/notiboy:$(RELEASE) -f build/Dockerfile .
	@echo "Built image localhost:32000/notiboy:$(RELEASE)"
	@sudo docker push localhost:32000/notiboy:$(RELEASE)
	@echo "Pushed image localhost:32000/notiboy:$(RELEASE)"
