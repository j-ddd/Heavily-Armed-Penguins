The following capabilties are required for the development of the orchestration system and orchestration template language (OTL).

1. The system must be able to be run sequentially on a list of nodes.
2. The OTL must be able to Enable or Disable a port.
3. The OTL must be able to Enable or Disable a service.
4. The system must be able to read a user password.
5. The system must be able to inform the administrator in the case of a misconfigured password.
6. The system must be able to read in information about AppArmor/SELinux.
7. The OTL must be able to make configuration changes to AppArmor and SELinux.
8. The system must be able to read current device drivers.
9. The OTL must have the capability to change SNMP Community Strings.
10. The system must be able to take a cryptographic hash of user commands on a system.
11. The OTL must be able to change the configuration settings for the SSH daemon. E.g version, accepting null passwords etc.
12. The system should have the capability to gather a list of installed packages and report their status' to the admin.
13. The OTL must have the capability to install, uninstall, or update a package.
14. The system must have the capability to get user, group, and file permissions/ownership.
15. The OTL must have the capability to modify user accounts and their permissions.
16. The OTL must have the capability to modify/disable keyboard shortcuts.
17. The OTL must have the capability to modify boot settings.
18. The OTL must have the capability to read and delete files.
19. The OTL must have the capability to remotely run a bash script or user-defined command.


As an Administrative user, the ability to do all of this graphically, or through an abstraction such as "HIGH", "MEDIUM", and "MINIMUM" levels of security would be a nice have.
Having the system come with a STIG template would be a nice have.
