if(prompt('Введите первую строку',0).toLowerCase().split('').sort().toString() == prompt('Введите вторую строку',1).toLowerCase().split('').sort().toString()) {alert('Строки являются анаграммами');} else {alert('Строки не являются анаграммами');}