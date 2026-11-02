//used to deploy a file to multiple machines
/*
**comment, file format will be IP address, username, password, flags taken in by deploy.cpp argv
*/


//TWO OPTIONS, EITHER PASSWORD IS PROVIDED OR ASK-PASS
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <map>
#define LIBSSH_STATIC 1
#include <libssh/libssh.h>


using namespace std;

struct credentials
{
  string username;
  string password;
  string method; //path to key file
};


//define a map to store each structure in
map<string, credentials *> m;


//pull these from the configena
string directory = "/home/jacdodd/HeavilyArmedPenguins/client";
string ssh = "ssh/script.sh";


void run_ssh(string ip_address, credentials *creds)
{

  cout << "Running on: " << ip_address << endl;
  cout << "------------------------" << endl;

  //we need to be able to use private keys
  string ipaddress = ip_address.c_str();

  string path = creds->method;

  if(creds->method == "ask")
  {
    //this is a key file
    cout << "Running SSH on: " << ip_address << endl;
    string local_script_path = directory + "/" + ssh;
    string run = "ssh " + creds->username + "@" + ip_address + " bash -s < " + local_script_path;
    system(run.c_str());
  }
  else if(creds->method == "pass")
  {
    cout << "Running SSH on: " << ip_address << " " << creds->username << " " << creds->password << endl;
    string username = creds->username.c_str();
    string password = creds->password.c_str();
    //calls our script which allows ssh connection without asking for a password. We should still keep this as an option if the user does not want to store a root user password
    //string run = "ssh -p " + password + " " + username + "@" + ipaddress + " " + "$(< ssh/script.sh)";
    string run = "expect pass.exp " + password + " " + ipaddress + " " + directory + "/" + ssh + " " + username;

    system(run.c_str());
  }
}



int main(int argc, char **argv)
{
  cout << "Deploy is called." << endl;
  //first, read the deploy file and create a map of machines we will traverse
  ifstream fin;
  string line = "";
  string filename = "";

  //no deploy-list manually specified
  if(argc < 2)
  {
    filename = "config/deploy-list.txt";
  }
  else
  {
    filename = argv[1];
  }

  cout << filename << endl;
    

  fin.open(filename);

  if (!fin.is_open()) { perror(filename.c_str()); return EXIT_FAILURE; }

  while(getline(fin, line))
  {
    cout << "Machine called." << endl;
    //get the first word of the line, break it up into ip, username, and password
    istringstream iss(line);
    credentials *creds = new credentials;
    //we need to store the method as well. 

    string ip, method;
    iss >> ip >> method;

    cout << ip << endl;
    cout << method << endl;
    if(method == "--ask-pass")
    {
      cout << "ask" << endl;
      string username;
      iss >> username;
      creds->username = username;
      creds->method = "ask";
      run_ssh(ip, creds);
    }
    else if(method == "creds")
    {
      printf("Creds\n");
      string username, pass;
      iss >> username >> pass;
      //now that we have that, store it in a struct, then store that in a map keyed on IP address
      creds->password = pass;
      creds->username = username;
      creds->method = "pass";

      run_ssh(ip, creds);

      //m.insert(pair<string, credentials *>(ip, creds));
    }

  }
  fin.close();


  //now that we have read the file and stored the data in a map, we are going to run
  //the bash script stored at the configured directory on each machine sequentially
  std::map<string, credentials *>::iterator it;
  /*for (it=m.begin(); it!=m.end(); ++it)
  {
    //std::cout << it->first << " => " << it->second->username << " => " << it->second->password << '\n';
    //we are going to run the bash script on this machine using these credentials
    printf("IP: %s\n", it->first.c_str());
    //run_ssh(it->first, it->second);

  }*/

  return EXIT_SUCCESS;

}
