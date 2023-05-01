// import data from './../database/data.json' assert {type: "json"};
import data from '../../myapp/database/data.js';
import FluentSQLBuilder from './fluentSQL.js'


const result = FluentSQLBuilder.for(data)
  // ou inicia com 2020 ou inicia com 2019
  .where({ registered: /^(2020|2019)/ })

  // ^ -> fala que é no inicio
  // $ -> fala que é no fim
  // | -> OU

  .where({ category: /^(security|developer|quality assurance)$/ })
  // parenteses literais precisam de scape () => \(\)
  // e ai o grupo (o qeu precisamos procurar fica dentro do outro parente) ( numero1 | numero2 )
  .where({ phone: /\((852|890|810)\)/ })
  .select(['name', 'company', 'phone', 'category', 'registered'])
  .orderBy('category')
  .limit(2)
  .build()

console.table(result)
