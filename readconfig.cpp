/*
 * Validate format of and read file config/config
 * Interact with template file
 * Change comments to better reflect what is being done
 */

#include  <iostream>
#include   <fstream>
#include    <cstdio>
#include    <string>
using namespace std;

int main()
{
  string   tag; // XML tag
  string   dir; // directory
  string   tmp; // template
  string   dec; // XML declaration
  string  path; // pathname of template file
  bool invalid; // whether or not config file is correctly formatted
  ifstream fin;

  fin.open("config/config");
  if (!fin.is_open()) { perror("config/config"); return EXIT_FAILURE; }

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
  if (invalid) { cerr << "config: Invalid format\n"; return EXIT_FAILURE; }
  fin.open(path); // open template file
  if (!fin.is_open()) { perror(path.c_str()); return EXIT_FAILURE; }

  printf("Ready to interact with template file\n");

  fin.close();
  return EXIT_SUCCESS;
}
