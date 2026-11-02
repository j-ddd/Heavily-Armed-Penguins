/*
 * Validate format of and read file config/config
 * Interact with template file
 * Change comments to better reflect what is being done
 */

#include  <iostream>
#include   <fstream>
#include    <cstdio>
#include    <string>
#include   <sstream>
#include  <unistd.h>
#include  <dirent.h>
#include  <sys/types.h>
#include  <sys/stat.h>
#include  <stdlib.h>
#include  <cstring>

using namespace std;


//Defining global variables
#define config_file "config/config"
#define json_conf "config/conf.json"
#define ssh_script "ssh/script.sh"
#define pwd "/home/user/HeavilyArmedPenguins/client"


void serviceHandler(string line, string& cmd)
{
  string word, service_name, status;
  istringstream ss(line);
  //we have to verify correct number of arguments by counting spaces in line
  ss >> word >> service_name >> status;

  printf("%s %s %s\n", word.c_str(), service_name.c_str(), status.c_str());

  //output to append
  string output = "systemctl ";

  printf("Out: %s\n", output.c_str());

  //if service is being turned on and enabled
  if(status == "UP")
  {
    output += "start " + service_name + "\n";
    output += "systemctl enable " + service_name + "\n";
  }
  //if service is being turned off
  else if(status == "DOWN")
  {
    output += "stop "+ service_name + "\n";
  }
  else
  {
    fprintf(stderr, "Invalid status.\n");
    exit(1);
  }


  
  //append output to file
  ofstream f("ssh/script.sh", std::ios_base::app);

  //this filename needs to be defined in a config file
  f << output;


    
}


void connectionHandler(string line, string& cmd)
{
  string word, type, action, output;
  istringstream ss(line);
  ss >> word >> type >> action;
  cout << "Word/Type/Action: " << word << " " << type << " " << action << endl;



  if(type == "SSH" || type == "SSHD")
  {
    string output;

    if(action == "noEmptyPass")
    {
      output += "emptyPass=false\n";
      //check if password is currently empty
      output += "if [[ $(sudo grep -i PermitEmptyPasswords /etc/ssh/sshd_config) == *#* ]]; then\n";
      output += "  emptyPass=true\n";
      output += "fi\n";

      output += "if [[ $(sudo grep -i PermitEmptyPasswords /etc/ssh/sshd_config) == *no* ]]; then\n";
      output += "  emptyPass=true\n";
      output += "fi\n";

      //if so, use ed to replace line
      output += "if [ \"$emptyPass\" = true ]; then\n";
      output += "  sudo sed -i 's/^\\(#\\?\\)\\(.*PermitEmptyPasswords\\).*$/\\2 no/' /etc/ssh/sshd_config\n";
      output += "  sudo systemctl restart sshd.service\n";
      output += "fi\n";

    }
    else if(action == "EnablePAM")
    {
      //create script here for that, add following lines to output
      output += "enabledPAM=false\n";
      output += "if [[ $(sudo grep -i usepam /etc/ssh/sshd_config) == \"UsePAM yes\" ]]; then\n";
      output += "  enabledPAM=true\n";
      output += "fi\n";

      output += "if [ \"$enabledPAM\" = false ]; then\n";
      output += "  sudo sed -i 's/^\\(\\s*#\\?\\)\\(\\s*UsePAM\\).*$/\\2 yes/' /etc/ssh/sshd_config\n";
      output += "sudo systemctl restart sshd.service\n";
      output += "fi\n";

    }
    else
    {
      cerr << "Not a recognized action for type SSH. Error." << endl;
    }

  }
  else if (type == "TLS")
  {
    if (action == "secureEncrypt")
    {
      // Determine "if GnuTLS uses defined DOD-approved TLS Crypto Policy"
      output += "if [[ $(update-crypto-policies --show) != FIPS ]]\n";
      output += "then\n";
      output += "  sudo fips-mode-setup --enable\n";
      output += "fi\n\n";
      printf("%s", output.c_str());
    }
    else
    {
      cerr << "Not a recognized action for type TLS. Error." << endl;
    }
  }
  else if (type == "ICMP")
  {
    if (action == "UP")
    {
      cmd += " scripts/V-257966";
    }
    else
    {
      cerr << "Not a recognized action for type ICMP. Error." << endl;
    }
  }
  else
  {
    cerr << "Not a recognized connection type. Error." << endl;
  }


//  //write the output to script.sh
//  //append output to file
//  ofstream f("ssh/script.sh", std::ios_base::app);
//
//  //this filename needs to be defined in a config file
//  f << output;
}

//USB Guard Block
void USBHandler(string line)
{
  string word, type, action, output;
  istringstream ss(line);
  ss >> word >> type >> action;
  cout << "Word/Type/Action: " << word << " " << type << " " << action << endl;

  if(type == "Guard")
  {
    if(action == "Block")
    {
      output += "sudo dnf install usbguard\n";
      output += "sudo usbguard generate-policy -X -t block >/etc/usbguard/rules.conf\n";
      output += "sudo systemctl enable --now usbguard\n";
    }
    else if(action == "Reject")
    {
      output += "sudo dnf install usbguard\n";
      output += "sudo usbguard generate-policy -X -t block >/etc/usbguard/rules.conf\n";
      output += "sudo systemctl enable --now usbguard\n";
    }
    else
    {
      cerr << "Not a recognized connection type. Error." << endl;
    }
  }
  else
  {
    cerr << "Not a recognized connection type. Error." << endl;
  }
  //write the output to script.sh
  //append output to file
  ofstream f("ssh/script.sh", std::ios_base::app);

  //this filename needs to be defined in a config file
  f << output;
}


void kernelHandler(string line, string& cmd)
{
  string word, type, action;
  istringstream ss(line);
  ss >> word >> type >> action;
  cout << "Word/Type/Action: " << word << " " << type << " " << action << endl;

  if (type == "SELINUX")
  {
    if (action == "TARGETED")
    {
      cmd += " scripts/V-258079";
    }
    else
    {
      cerr << "Not a recognized action for type SELINUX" << endl;
    }
  }
  else if(type == "KEYBOARD")
  {
    if(action == "--disablectrlaltdel")
    {
      //copy contents of this ssh file to master ssh file that will be run remotely
      system("cat ssh/ctrl-alt-dis.sh >> script.sh");
    }
  }
  else if (type == "AUDIT")
  {
    if (action == "SUDOERS")
    {
      cmd += " scripts/V-258217";
    }
    else
    {
      cerr << "Not a recognized action for type AUDIT" << endl;
    }
  }
  else if (type == "COREDUMP")
  {
    if (action == "OFF")
    {
      cmd += " scripts/V-257813";
    }
    else
    {
      cerr << "Not a recognized action for type COREDUMP" << endl;
    }
  }
  else if (type == "MESG")
  {
    if (action == "NONPERM")
    {
      cmd += " scripts/V-257886";
    }
    else
    {
      cerr << "Not a recognized action for type MESG" << endl;
    }
  }
  else if (type == "USER")
  {
    if (action == "--oneroot")
    {
      cmd += "scripts/V-258059";
    }
    else
    {
      cerr << "Not a recognized action for type USER" << endl;
    }
  }
  else
  {
    cerr << "Not a recognized kernel type. Error." << endl;
  }

//  //append output to file
//  ofstream f("ssh/script.sh", std::ios_base::app);
//
//  //this filename needs to be defined in a config file
//  f << output;
}



int main()
{
  string   tag; // XML tag
  string   dir; // directory
  string   tmp; // template
  string   dec; // XML declaration
  string  path; // pathname of template file
  string   cmd; // cat command string
  string  line;
  bool invalid; // whether or not config file is correctly formatted
  ifstream fin;
  struct dirent *direct;
  struct stat buf;
  DIR       *d;
  int   exists;



  //set up the ssh file
  //first, remove it if it exists, iterate through ssh directory
  d = opendir("ssh");
  if (d == NULL) {
    fprintf(stderr, "Couldn't open \"ssh\"\n");
    exit(1);
  }

  printf("ssh\n");

  for(direct = readdir(d); direct != NULL; direct = readdir(d))
  {
    exists = stat(direct->d_name, &buf);
    if(exists != 0)
    {
      if(strcmp(direct->d_name, "script.sh") == 0)
      {
        system("rm ssh/script.sh");
      }
    }


  }

  system("touch ssh/script.sh");
  system("chmod +x ssh/script.sh");

  closedir(d);

  fin.open(config_file);
  if (!fin.is_open()) {
    perror(config_file);
    return EXIT_FAILURE;
  }

  // Assuming file is formatted as follows:
  //
  //   <?xml version="1.0" encoding="UTF-8"?>
  //   <configuration>
  //     <directory>
  //       directory-name
  //     </directory>
  //     <template>
  //       template-name
  //     </template>
  //   </configuration>
  //   EOF

  invalid = true; // assume invalid, prove otherwise
  if (getline(fin, dec)  &&
                    dec == "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" &&
      fin >> tag && tag == "<configuration>"  &&
      fin >> tag && tag ==   "<directory>"    &&
      fin >> dir &&
      fin >> tag && tag ==   "</directory>"   &&
      fin >> tag && tag ==   "<template>"     &&
      fin >> tmp &&
      fin >> tag && tag ==   "</template>"    &&
      fin >> tag && tag == "</configuration>") {
    invalid = false;
    path = dir + tmp;
  }

  fin.close();    // close config file
  if (invalid) {
    cerr << "config: Invalid format" << '\n';
    return EXIT_FAILURE;
  }

  fin.open(path);
  if (!fin.is_open()) {
    perror(path.c_str());
    return EXIT_FAILURE;
  }


  /* When we create script.sh, chmod 777 */

  cmd = "cat";

  while(getline(fin, line))
  {
    //get the first word of the line, compare it to translation functions
    istringstream iss(line);
    string first_word;
    iss >> first_word;

    printf("Word: %s\n", first_word.c_str());

    //we have to add sudo su to the top of the file

    if(first_word == "SERVICE")
    {
      serviceHandler(line, cmd);
    }
    else if(first_word == "CONNECTION")
    {
      connectionHandler(line, cmd);
    }
    else if (first_word == "KERNEL")
    {
      kernelHandler(line, cmd);
    }
    else if (first_word == "USB")
    {
      USBHandler(line);
    }

  }

  cmd += " >ssh/script.sh";
  if (system(cmd.c_str()) == -1) {
    perror("cat");
    return EXIT_FAILURE;
  }

  cout << "Deploying" << endl;
  

  if(system("./deploy") == -1)
  {
    perror("deploy");
    return EXIT_FAILURE;
  }
  
  fin.close();
  return EXIT_SUCCESS;
}
