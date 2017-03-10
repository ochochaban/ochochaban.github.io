if(prompt('Введите первую строку',0).toLowerCase().split('').sort().join() == prompt('Введите вторую строку',1).toLowerCase().split('').sort().join()) {
  alert('Строки являются анаграммами');
} else {
  alert('Строки не являются анаграммами');
}
