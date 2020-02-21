all: app

app:
	solcjs --abi ./*sol && solcjs --bin ./*sol
clean:
	-rm *.bin
	-rm *.abi
