# csci3308_cc
all project code/components
# FileBox Source Code

## Changelog
0.0 initial front-end framework  
0.1 initial back-end framework  
0.2 run as node.js app, no back-end link  
0.3 functional single file upload  
0.4 temporary file download (initialized on server start)  
0.5 functional file download  
0.6 account creation enabled  
0.7 single and multiple file download  

## Purpose
open source, low functionality dropbox clone.

## Authors
| Name | Github |
| ----- | ----- |
| Will Abrams| wabrams |
| Artem Nekrasov | artem690 |
| Ford Mulligan | fpmull |
| Jessie Ryce | jessieryce |
| Isabell Deak | Isabelldeak |

## Repo Organization/Structure
- All frontend files are in the web folder (html,css,js)  
- All files uploaded from FileBox are contained in the fb/public folder  
- All imaged used in the application are in the img folder  

## How to build/run/test our code
- Use MySQL database
	- Download npms (mysql, http, formidable, fs, request)
	- To use this, run the file
- NOTE: app.js is what is currently hosted, upload does not currently work because it requires a file server add-on, all options for which are pay-walled. To see proper functionality, run app_local.js with a locally run MySQL server.
- To initialize the MySQL database, run the MySQL-ddl/filebox_ddl.sql script and set connection password to your localhost password