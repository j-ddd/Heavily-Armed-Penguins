## Client-Server Software Solution for Monitoring, Securing, and Managing a Networked Cluster of Unix Nodes
#### HeavilyArmedPenguins

#### Introduction 
The project is built around an administrative portal through which a system administrator can remotely update the security configuration of their network through a connection with a software agent configured locally on each client machine. These features will be performed without user input and orchestrated by an administrator.
	There are several stages of a network security breach. An attacker must first perform reconnaissance of their target to evaluate the target’s technological vulnerabilities. After finding a soft spot, an intrusion will occur. An attacker will seek to exploit a flaw in the system configuration to elevate their own privileges, move laterally across the network, and finally exfiltrate or set up command and control architecture, depending on their objectives [1].
	Our solution is primarily focused on helping an administrator dynamically harden their networks against each stage of this cyber kill chain process. We intend to focus on Linux systems as clients. Although Linux makes up little more than 2% of the overall computer OS market share, roughly 95% of the most frequently used websites are hosted on Linux boxes. Over 85% of all phones use a Unix operating system to function [2]. A web server can often be an initial intrusion into a corporate network and is a major attack surface for network intruders. Mobile phones often never leave our sides and are used to connect to corporate and government networks alike due to their convenience. Securing these types of devices on the network is essential.
	The idea itself is not novel. Several orchestration tools exist and are used by the industry. Our implementation, motivations, and features that we plan to offer; however, are not offered by the current market, but could be very useful to workers in IT and organizations as they try to secure networks in the midst of a rapidly evolving cyber battlefield.
	Several technologies have tried to tackle this issue from a variety of perspectives. Ansible, a remote orchestration scripting language, offers similar capabilities but not as intuitively or natively as it could be offered. Chef is very similar to Ansible in its offerings as well. None of these offer the kind of remote organization and orchestration capabilities that HAP would offer.
	Our team comes from a variety of backgrounds. Samuel LaVey, a junior at the University of Tennessee Knoxville pursuing his bachelor’s in computer science, has worked as an intern for years at several public and private organizations. There he has worked on projects involving web development, network administration, cyber security, digital forensics, and general DevOps. Jackson Dodd, also a junior at the University of Tennessee Knoxville, is planning on getting a bachelor’s degree in computer science. He is looking to receive a minor in data science and cybersecurity. Additionally, he has experience from a co-op with the Siemens Medical Solutions PET Scanner ER&D team where he worked mainly with C#, documenting official software write-ups using SAP, as well as probing and soldering electrical lines on PCB. Jamin Hanna. Each of our unique skillsets translates to a unique part of the project; whether in web development for the server-side, C++/C software development on the client side, or overall security principles and system orchestration.


#### Customer Value
  Our primary customers would be System Administrators, Project Leads, and CTOs (Chief Technology Officers). These individuals want several things our project offers. First, a dynamic hardening capability for their networks, allowing them to be quickly administered when changes are needed. And second, efficient and secure deployment of new machines.
	There are several underlying problems that these types of technologies try to solve or mitigate. Cybercrime, whether in the form of theft, ransom, or terrorism, is on the rise [3]. 
 ![alt text](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fterranovasecurity.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fcybercrime-expectation-statista.jpg&f=1&nofb=1&ipt=e37967a9c597b68b5a7e63f93f1e5e9d88aed97954b1d32d19ba8ab522c4e3d3&ipo=images)
 Being able to react dynamically to this ever-changing environment quickly is crucial. These threats can lead to extortion of private individuals or organizations, data loss, downtime, and a lot of lost money for organizations. For governments, the cost incurred can be much higher. Data stolen could result in extreme harm to national security. In addition to this, when trying to implement cybersecurity principles into current architectures it can be a long and tedious process for each system. When temporary systems such as Virtual Machines (VMs) are created, or new machines are brought onto the network, implementing these principles can also be a time-consuming challenge.
	Our solution offers several capabilities to help tackle these challenges. We will deliver faster uptime for secure systems through security-conscious remote administration and orchestration. We will provide administrators with a bird's eye view of their networks and help them react dynamically to a network breach. Through this, we can actively harden and adjust the network to react to outside threats, network breaches, and prevent lateral movements or initial intrusions.
	In the end, less man-hours will be expended on tedious network administration tasks and development setup, which means more man hours can be put towards production. System downtime will be reduced and malignant data loss is less likely to occur.
	Our system offers these capabilities in novel ways. First, unlike some of our competitors, we offer an administrator a birds-eye view of a network cluster, as well as the capability to peer into specific system details. ARP tables can be used to show who is reachable and how the network is segmented in an organization, and translated into a visible graph. Nodes can be interacted with individually to see alerts, usage details, or deploy/update a security template. Also unlike our competitors, our orchestration protocol is natively built with security configuration in mind. Administrators can intuitively set up and deploy a template to hundreds of nodes with a single script, rather than having to update each nodes security individually or at the time of deployment. 
	The success of this software can be measured in time saved during machine deployment and re-configuration, and breaches thwarted through the dynamic hardening capability we offer.


#### Technolgy 
  From a technological perspective, our software must have several general capabilities that can be expanded later in this thesis. First, our software must have the capability to communicate with the server and register itself as a member of the cluster, as well as encrypt its traffic through a public key exchange. This node will be represented graphically on the system administrator web portal. And second, our server must have the capability to orchestrate configuration updates from the server side through a configuration template, which will be a scripted software-defined template. This template must be able to change port status, update software, define security groups, create new users or redefine user permissions, enable/disable services, and update credentials. 
	The system consists of several main components which allow this to happen. First, the server. The server will be either a MEAN/MERN stack application, which stands for Mongo, Express, Angular/React, and Node.js. These technologies provide a database and backend scripting capabilities, as well as a reactive and clean front end for administrator interaction with the data being collected. On the client side, a linux daemon written in C++/C will be set up to provide the above listed client capabilities. The orchestration software will be set up server side to interact with each client through their given credentials, and will be written in C++. The orchestration templates will have their own interpreted language using the .otl file ending.

![alt_text](https://i.imgur.com/KcHa5D3.png)


As a minimal requirement, this software must provide the user with the capability to update ports, services, and user permissions on a remote server. Customers would value enhanced security features, live incident reporting, and a more complete remote orchestration capability.


#### Testing
 Our system will be tested through several mechanisms. Basic functionality (web reactivity, client-server communication) can be tested through customized testing scripts, the Postman API tool, and an SSH client. More advanced functionality, such as our planned robust security features, can be tested by loading our software onto boxes with known vulnerabilities and seeing if an attack can be prevented through orchestrated hardening.

#### Team
  Samuel LaVey. Samuel has built multiple web applications through internships and personal projects. He has also built C++ client-side applications with SMS functionality. He will be primarily responsible for implementing the server-client security orchestration and implementing/advising the development of other security features.
  Jackson Dodd. A junior at the University of Tennessee Knoxville, is planning on getting a bachelor’s degree in computer science. He is looking to receive a minor in data science and cybersecurity. Additionally, he has experience from a co-op with the Siemens Medical Solutions PET Scanner ER&D team where he worked mainly with C#, documenting official software write-ups using SAP, as well as probing and soldering electrical lines on PCB.
  Jamin Hanna. Jamin’s basic familiarity with C++, Linux, and JSON should make building a daemon  that gathers, formats, and sends off data coming from various parts of the Linux file system a workable task.

  Each member of the team is familiar with a number of technologies that will be used to build this system. 

#### Project Management
  Completion is feasible with adherence to the milestone deadlines and sprint goals. We will be meeting twice a week, face to face, with an option for more meetings as needed. We seem to face no legal or regulatory constraints. Our only real constraint is that data must be protected and all communication on the network must be encrypted through a public key exchange. We will have access to the data through root credentials provided by an administrator during configuration.

The following is a tentative schedule for team development:

Sprint 1: Testing infrastructure, basic functionality, roadmap
Sprint 2: Implementing more advanced functionality, abstraction, graphical capabilties
Sprint 3: Pentesting, vulnerability testing, "real-world" application implementation




Bibliography
[1]https://www.exabeam.com/explainers/information-security/cyber-kill-chain-understanding-and-mitigating-advanced-threats/ 

[2]https://www.enterpriseappstoday.com/stats/linux-statistics.html 

[3]https://www.beyondidentity.com/blog/rise-cybercrime-study 


How do we prevent a server attack?
User passwords encrypted, binary only distributed, good code practices - handle all routes, pentest our own server, admin never sees a password





