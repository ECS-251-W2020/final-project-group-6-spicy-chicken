all: install-service

install-service:
	sudo cp ./noip2.service /etc/systemd/system/noip2.service
	sudo systemctl daemon-reload
	sudo systemctl start  noip2
	sudo systemctl status  noip2

