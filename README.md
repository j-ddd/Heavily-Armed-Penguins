(Note: This was a private repo that I have cloned and made public for posterity sake.)

#### Schedule:


#### Configuration to be Accessed
Linux Security Features
Get the initial configuration of the system for admin to inspect and compare


Port Whitelist
Admin, Service, User passwords get flagged if insecure, 15 character minimum, investigate /etc/shadow
Enable Services
Disable/Remove Services
SELinux interaction
save lists of current processes, listening ports, services, device drivers, user accounts, and all files ("dir /s /b" or "ls —lARt"), use a checksum to compare
Linux operating system must be configured so that the SSH daemon does not allow authentication using an empty password.
Account password cannot be blank
Package Installed/Uninstalled
SNMP Community strings changed from default
Cryptographic hash of system commands, compare to vendor values
Only allow SSHv2
Get file permissions, ownership, group values and make sure matches vendor values
Get account permissions, configure so root only has access
CTRL-ALT-DLT graphically/CLI disabled capability
Require authentication to boot in maintenance mode
Prevent software not digitally signed from being installed
Get file names, delete files


All these must be options to an admin:
https://www.stigviewer.com/stig/red_hat_enterprise_linux_7/

