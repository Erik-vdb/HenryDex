//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Load types to the database on initialization of server (recursive function)
const fetchTypes = async () => { 
  axios.get("https://henry-dex-bghw.onrender.com/types")
  .then(({data}) => {
    if (!data){
      return fetchTypes()
    }
    else {
      console.log(data)
      return data
    } 
  })
  .catch(({message}) => {
    console.log(message)
  })
 }

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen (process.env.PORT || 5432, () => {
    console.log (`Listening at Port ${process.env.PORT || 5432}`); // eslint-disable-line no-console
  });
}).then(fetchTypes)

