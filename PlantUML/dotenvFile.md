# #######################################################
# .env della cartella Besu:
# -- crearlo se non lo si ha --

MYSQL_ROOT_PASSWORD=software_security
MYSQL_DATABASE=food_supply_chain
MYSQL_USER=appuser
MYSQL_PASSWORD=apppassword
DB_HOST=127.0.0.1
DB_PORT=3306
HOST_PORT=3307 
## oppure 3306 a seconda della porta locale che si utilizza
DB_NAME=food_supply_chain
DB_USER=appuser
DB_PASSWORD=apppassword

# #########################################################
# .env nella cartella server
# -- crearlo se non lo si ha --

DB_HOST=127.0.0.1
DB_PORT=3307
DB_NAME=food_supply_chain
DB_USER=appuser
DB_PASSWORD=apppassword

SERVER_PORT=3010
JWT_SECRET=your_jwt_secret

# #########################################################
# .env nella cartella client
# -- crearlo se non lo si ha --

VITE_SERVER_PORT=3010
