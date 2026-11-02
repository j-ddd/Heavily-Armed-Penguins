//run this once
#include <iostream>
#include <unistd.h>
#include <fstream>
#include <iomanip>

using namespace std;

#define json_conf "config/conf.json"

int main()
{
    //get path to current directory, store it in the config file
    char cwd[1024];
    if (getcwd(cwd, sizeof(cwd)) != NULL)
    {
        cout << "Current working directory: " << cwd << endl;
        //cwd now contains root directory of the project. store this in env.json
        string cd(cwd);
        string filepath = json_conf;
        ofstream out(filepath);

        //write directory to config file
        out << "{" << std::endl;
        out << "  \"project_directory\": \"" << cd << "\"," << std::endl;
        //write ssh script default directory to config file
        out << "  \"ssh_default_locale\": \"" << "ssh/script.sh" << "\"" << std::endl;
        out << "}" << std::endl;
    }
}