sudo sed -i 's@^\(#\?\)\(.*CtrlAltDelBurstAction\).*$@CtrlAltDelBurstAction=none@' /etc/systemd/system.conf

sudo systemctl disable --now ctrl-alt-del.target
sudo systemctl mask --now ctrl-alt-del.target

echo "-----------------------------------"
