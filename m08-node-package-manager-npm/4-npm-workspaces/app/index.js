import DateUtil from '@yvesguilherme/date-util';

console.log(DateUtil.formatDate(new Date('2023/05/04'), 'dd/mm/yyyy')); // ~=> 04/05/2023
console.log(DateUtil.formatString('2023-06-04', 'yyyy-mm-dd', 'dd-mm-yyyy')); // ~=> 04-06-2023