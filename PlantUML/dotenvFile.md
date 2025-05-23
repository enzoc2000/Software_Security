# #######################################################
# .env della cartella Besu:
# -- crearlo se non lo si ha --


MYSQL_ROOT_PASSWORD=<root_password>
MYSQL_DATABASE=<db_name>
MYSQL_USER=<appuser>
MYSQL_PASSWORD=<appuser_password>
 
DB_HOST=127.0.0.1
DB_PORT=3306
HOST_PORT=3307 
## oppure 3306 a seconda della porta locale che si utilizza
DB_NAME=<db_name>
DB_USER=<appuser>
DB_PASSWORD=<appuser_password>

# #########################################################
# .env nella cartella server
# -- crearlo se non lo si ha --

DB_HOST=127.0.0.1
DB_PORT=3307
## oppure 3306 a seconda della porta locale che si utilizza
DB_PORT=3306
DB_NAME=<db_name>
DB_USER=<appuser>
DB_PASSWORD=<appuser_password>

SERVER_PORT=3010
JWT_SECRET=your_jwt_secret

# #########################################################
# .env nella cartella client
# -- crearlo se non lo si ha --

VITE_SERVER_PORT=3010
